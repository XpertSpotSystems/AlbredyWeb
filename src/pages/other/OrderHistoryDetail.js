import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import LayoutOne from "../../layouts/LayoutOne";
import { MetaTags } from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { useState } from "react";
import { useEffect } from "react";
import {IoIosCloseCircle} from 'react-icons/io'
import {HiClock} from 'react-icons/hi'
import {AiFillCheckCircle} from 'react-icons/ai'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const OrderHistoryDetail = () => {
  const Location = useLocation();

  const OrderId = Location.state.order_id;

  const [userOrderDetail, setUserOrderDetail] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const setting = JSON.parse(localStorage.getItem("general_set"));

  const Email = LoginUser.email;
  const Token = LoginToken;
  const currency_symbol = setting.currency_symbol;

  const GetDetailsData = () => {
    let data = {
      id: OrderId,
      email: Email,
      token: Token,
    };

    setOpen(true);

    // EditProducts
    fetch(MyConstants.showOrderDetail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setUserOrderDetail(response.user_order_detail[0]);
          setOrderProducts(response.ordered_products);
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    GetDetailsData();
  }, []);

  console.log("orderProducts ::", orderProducts);

  let SubTotal = 0;
  orderProducts.map((item) => {
    SubTotal += item.sub_total;
  });

  return (
    <Fragment>
      <MetaTags>
        <title className="text-capitalize">
          Albredy || {userOrderDetail.order_status + " Orders"}
        </title>
        <meta
          name="description"
          content="OrderHistory of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "#"}>
        {"Orders Detail"}
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="container my-5 p-4 shadow-lg">
          <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="row">
            <div className="col-3 mt-0 pt-0">
              <Form.Text className="DeliveryAddressTitle font-weight-medium">
                Order By
              </Form.Text>
            </div>
            <div className="col-4 mt-0 pt-0">
              <Form.Text className="DeliveryAddressTitle font-weight-medium text-capitalize">
                {userOrderDetail.first_name + " " + userOrderDetail.last_name}
              </Form.Text>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3 mt-0 pt-0">
              <Form.Text className="DeliveryAddressTitle font-weight-medium">
                Order Number
              </Form.Text>
            </div>
            <div className="col-5 mt-0 pt-0">
              <Form.Text className="DeliveryAddressTitle font-weight-medium text-capitalize">
                {userOrderDetail.reference_no}
              </Form.Text>
            </div>
          </div>
          {/* <div className="row mt-3">
            <div className="col-3 mt-0 pt-0">
              <Form.Text className="DeliveryAddressTitle font-weight-medium">
                Tracking Number
              </Form.Text>
            </div>
            <div className="col-4 mt-0 pt-0">
              <Form.Text className="DeliveryAddressTitle font-weight-medium text-capitalize">
              {userOrderDetail.reference_no}
              </Form.Text>
            </div>
          </div> */}

          <div className="row mt-5">
            <div className="col-12">
              <div className="table-content table-responsive cart-table-content">
                <table className="px-5" style={{minWidth: "100%"}}>
                  <thead>
                    <tr>
                      <th >Image</th>
                      <th >Products Name</th>
                      <th >Unit Price</th>
                      <th >Qty</th>
                      <th >Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderProducts.length >= 1 ? (
                      orderProducts.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td className="product-thumbnail">
                              <img
                                className="img-fluid"
                                src={MyConstants.ImageUrl + item.image}
                                alt=""
                                onClick={() => {}}
                                style={{ cursor: "pointer" }}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td className="product-price-cart">
                              {item.discount != 0 ? (
                                <Fragment>
                                  <span className="amount old">
                                    {userOrderDetail.currency + item.price}
                                  </span>
                                  <span className="amount">
                                    {userOrderDetail.currency +
                                      (item.price -
                                        item.price * (item.discount / 100))}
                                  </span>
                                </Fragment>
                              ) : (
                                <span className="amount">
                                  {userOrderDetail.currency + item.price}
                                </span>
                              )}
                            </td>
                            <td>{item.order_product_qnty}</td>
                            <td>{item.sub_total}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} align="center">
                          <h6>Data not found!</h6>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

           <div className="px-5">          
          <div className="row mt-2">
            <div className="col-6">
              <Form.Text className="SaveCardTitle mt-2 orderHistoryFont">Sub Total</Form.Text>
            </div>
            <div className="col-6">
              <Form.Text className="StorPrice float-left px-2">
                {userOrderDetail.currency + SubTotal}
              </Form.Text>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <Form.Text className="SaveCardTitle mt-0 orderHistoryFont">Tax</Form.Text>
            </div>
            <div className="col-6">
              <Form.Text className="StorPrice float-left px-2">
                {userOrderDetail.currency + userOrderDetail.tax}
              </Form.Text>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6">
              <Form.Text className="SaveCardTitle mt-0 orderHistoryFont">
                Delivery Charges
              </Form.Text>
            </div>
            <div className="col-6">
              <Form.Text className="StorPrice float-left px-2">
                {userOrderDetail.currency + userOrderDetail.delivery_fee}
              </Form.Text>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6">
              <Form.Text className="SaveCardTitle mt-0 font-weight-bold text-dark orderHistoryFont">
                Total
              </Form.Text>
            </div>
            <div className="col-6">
              <Form.Text className="StorPrice float-left px-2">
                {userOrderDetail.currency + parseInt(userOrderDetail.order_total).toFixed()}
              </Form.Text>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6">
              <Form.Text className="SaveCardTitle mt-0 text-dark">
                Delivery Address
              </Form.Text>
              <Form.Text className="mt-0 text-secondary">
                {userOrderDetail.delivery_address}
              </Form.Text>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <Form.Text className="SaveCardTitle mt-0 text-dark">
                Payment Method (Cash on Delivery)
              </Form.Text>
              <Form.Text
                className={
                  userOrderDetail.order_status === "in progress"
                    ? "SaveCardTitle text-capitalize"
                    : userOrderDetail.order_status === "delivered"
                    ? "SaveCardTitle text-capitalize"
                    : userOrderDetail.order_status === "on the way"
                    ? "text-warning text-capitalize"
                    : userOrderDetail.order_status === "pick up"
                    ? "text-warning text-capitalize"
                    : userOrderDetail.order_status === "cancelled"
                    ? "text-danger text-capitalize"
                    : ""
                }
              > <span style={{display: "flex", flexDirection: "row", alignSelf: "center", gap: "5px", fontSize: "16px"}}>
                {userOrderDetail.order_status}
                  {
                    userOrderDetail.order_status === "in progress"
                    ? <AiFillCheckCircle style={{color: "#398e8b", alignSelf: "center"}}/>
                    : userOrderDetail.order_status === "delivered"
                    ? <AiFillCheckCircle style={{color: "#398e8b", alignSelf: "center"}}/>
                    : userOrderDetail.order_status === "on the way"
                    ? <HiClock style={{color: "#FFA910", alignSelf: "center"}}/>
                    : userOrderDetail.order_status === "cancelled"
                    ? <IoIosCloseCircle style={{color: "#db002f", alignSelf: "center"}}/>
                    : ""}  
              </span>    
              </Form.Text>
            </div>
          </div>
          </div>  
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderHistoryDetail;
