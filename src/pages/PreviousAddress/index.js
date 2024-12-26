import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Card } from "react-bootstrap";
import { TbLocation } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const PreviousAddress = ({ location }) => {
  const { pathname } = location;

  const [PreviousAddressData, setPreviousAddressData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LOGIN_DATA = JSON.parse(localStorage.getItem("LOGIN_USER"));

  const Email = LOGIN_DATA.email;
  const Token = LOGIN_DATA.token;

  const GetPreviousAddressData = () => {
    let data = {
      user_id: LOGIN_DATA.id,
    };

    setOpen(true);
    fetch(MyConstants.listPrevAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setPreviousAddressData(response.prev_addresses);
          setOpen(false);
        } else {
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    GetPreviousAddressData();
  }, []);

  // console.log('PreviousAddressData ::', PreviousAddressData)

  // Delete Data
  const DeleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let data = {
          email: Email,
          token: Token,
          id: id,
        };

        fetch(MyConstants.deletePrevAddress, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
            if (response.status == true) {
              GetPreviousAddressData();
            }
          });
        });
      } else {
        swal("Your imaginary row is safe!");
      }
    });
  };

  const Navigate = useHistory();

  // GetPreviousAddress
  const GetPreviousAddress = (id) => {
    console.log("id ::", id);
    Navigate.push({
      pathname: "/checkout",

      state: {
        previous_address_id: id,
      },
    });
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Previous Address</title>
        <meta
          name="description"
          content="Previous Address page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Previous Address
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-50 pb-100">
          <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="container">
            {PreviousAddressData ? (
              PreviousAddressData.map((item, index) => (
                <Row key={index}>
                  <Col>
                    <Card className="border-0 shadow_lg p-3 w-100 mt-2">
                      <div className="row">
                        <div className="col-8">
                          <div className="AddressView">
                            <div className="IconView">
                              <TbLocation className="Icon" />
                            </div>
                            <div
                              className="Address"
                              style={{ cursor: "pointer" }}
                              onClick={() => GetPreviousAddress(item.id)}
                            >
                              <h4 className="mb-0">{item.city}</h4>
                              <h5 className="mb-0 text-muted">
                                {item.delivery_address}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-end">
                            {/* <Link to="#"> */}
                            <BsTrash
                              className="RightIcon mr-2"
                              onClick={() => DeleteData(item.id)}
                            />
                            {/* </Link> */}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              ))
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center CheckoutEmptyColor">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items are ordered to edit previous address <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

PreviousAddress.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(PreviousAddress);
