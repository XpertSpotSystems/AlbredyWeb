import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { FaCube } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";

const VOUCHER_ARRAY = [
  {
    id: 1,
    welcome_text: "Welcome",
    owner_name: "Owner Name",
    expiry_date: "05 Sept, 2022",
    order_quantity: 1,
    currency: "AED",
    price: "576",
  },
  {
    id: 2,
    welcome_text: "Welcome",
    owner_name: "Owner Name",
    expiry_date: "05 Sept, 2022",
    order_quantity: 1,
    currency: "AED",
    price: "576",
  },
  {
    id: 3,
    welcome_text: "Welcome",
    owner_name: "Owner Name",
    expiry_date: "05 Sept, 2022",
    order_quantity: 1,
    currency: "AED",
    price: "576",
  },
];

// Styling
const CustomStyle = makeStyles({
  ReOrderButton: {
    background: "#398E8B",
    color: "#fff",
    // padding: "4px 20px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

const Vouchers = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Vouchers</title>
        <meta
          name="description"
          content="Vouchers of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Vouchers
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="container  VouchersSpce">
          {VOUCHER_ARRAY && VOUCHER_ARRAY.length >= 1 ? (
            <>
              <div className="row">
                {VOUCHER_ARRAY &&
                  VOUCHER_ARRAY.map((item, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <Card
                        className="border-0 shadow_lg p-3 w-100 mt-2"
                        style={{ background: "#398E8B" }}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-12 LineHeight">
                            <h4 className="text-light mb-0">
                              {item.welcome_text + "!"}
                            </h4>
                            <h3 className="text-light">{item.owner_name}</h3>
                          </div>
                        </div>

                        <hr />
                        
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <h4 className="text-light">Order Quantity:</h4>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <h5 className="text-light text-right">
                              {item.order_quantity} Piece minimum
                            </h5>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8 col-sm-12">
                            <h4 className="text-light">Item Price:</h4>
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <h5 className="text-light text-right">
                              {item.currency + " " + item.price}
                            </h5>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8 col-sm-12">
                            <h4 className="text-light">Expires On:</h4>
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <h5 className="text-light text-right">
                              {item.expiry_date}
                            </h5>
                          </div>
                        </div>

                        <hr />
                      </Card>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center CheckoutEmptyColor">
                  <div className="item-empty-area__icon mb-30">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/img/voucher.png"}
                      height={100}
                    />
                    <h3 className="text-muted mt-1">No Voucher Yet</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* EMAIL LATER */}
        {/* <div className="EmailSubscribe">
          <div className="container">
            <Row>
              <Col md={7} sm={12}>
                <FaCube className="mr-2 Emailicon float-left" />
                <h2 className="EmailHeading">Be the first to know</h2>
                <h5 className="ml-5">
                  Get all the latest information on Events, Sales and Offers.
                </h5>
              </Col>
              <Col className="col-md-5">
                <div className="d-inline-flex justify-content-end">
                  <Form.Control
                    placeholder="Enter Your Email Address"
                    className="EmailInput"
                  />
                  <Button variant="outline-secondary" className="Button">
                    Subscribe
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
      </LayoutOne>
    </Fragment>
  );
};

Vouchers.propTypes = {
  location: PropTypes.object,
};

export default Vouchers;
