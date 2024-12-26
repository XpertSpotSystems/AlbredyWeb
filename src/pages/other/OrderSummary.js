import PropTypes, { element } from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Form } from "react-bootstrap";
import { Button } from "@material-ui/core";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { useToasts } from "react-toast-notifications";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import Vector1 from "../../assets/img/Vector_1.png";

// Styling
const CustomStyle = makeStyles({
  NextButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  CancelButton: {
    background: "#DB002F",
    color: "#fff",
    marginRight: "3px",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

const OrderSummary = ({ location, cartItems, deleteAllFromCart }) => {

  // PreviousData
const previous_data = JSON.parse(sessionStorage.getItem("multistep_form_data"));




  const { pathname } = location;
  // let cartTotalPrice = 0;//   StylingClasses
  const StylingClasses = CustomStyle();

  const Navigation = useHistory();
  const { addToast } = useToasts();

  const [ReferenceNo, setReferenceNo] = useState("");
  const [OrderSubmitted, setOrderSubmitted] = useState(false);

  console.log("ReferenceNo ===", ReferenceNo);

  const GoToHomePage = () => Navigation.push('/');
  // const GoToSuccessPage = () => Navigation.push("/success",  { state : {ref_no: ReferenceNo} });

  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Token = LoginUser.token;

  // useEffect(() => {
    // localStorage.removeItem("redux_localstorage_simple");
  // }, [OrderSubmitted])

  // DeleteDataFromCart
  // const DeleteDataFromCart = () => {
  //   console.log("Data deleted from cart!!!");
  //   // return deleteAllFromCart(addToast);
  //   localStorage.removeItem("redux_localstorage_simple");
  //   // window.location.reload()
  // };

  // SubmitForm
  const SubmitForm = () => {
    if (!LoginUser) {
      console.log("User Not Login!");
    } else {
      let order_submit_data = {
        first_name: previous_data.first_name,
        last_name: previous_data.last_name,
        email_address: previous_data.email_address,
        contact_no: previous_data.contact_no,
        city: previous_data.city,
        // address: previous_data.address,
        delivery_address: previous_data.delivery_address,
        location: previous_data.location,

        // delivery_home: previous_data.shipping_method_data.delivery_home,
        // delivery_date: previous_data.shipping_method_data.delivery_date,

        // online_payment: previous_data.payment_method_data.online_payment,
        // card_number: previous_data.payment_method_data.card_number,
        // card_name: previous_data.payment_method_data.card_name,
        // card_expiry_date: previous_data.payment_method_data.card_expiry_date,
        // card_security_code: previous_data.payment_method_data.card_security_code,
        // save_card: previous_data.payment_method_data.save_card,

        cart_items: previous_data.payment_method_data.cart_items,

        tax: previous_data.payment_method_data.tax,
        delivery_fee: previous_data.payment_method_data.delivery_fee,
        sub_total: previous_data.payment_method_data.sub_total,
        total: previous_data.payment_method_data.total,

        user_id: previous_data.user_id,

        email: Email,
        token: Token,
      };

      console.log("email ::", order_submit_data.email);
      console.log("token ::", order_submit_data.token);

      const API_URL = MyConstants.submitOrder;

      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order_submit_data),
      })
        .then((result) => {
          result.json().then((jsonResponse) => {
            if (jsonResponse.status === true) {
              console.log("JsonResponse ===", jsonResponse);
              console.log("Message ===", jsonResponse.message);

              
    // localStorage.removeItem("redux_localstorage_simple");
              // setOrderSubmitted(true);

              deleteAllFromCart(addToast);

              sessionStorage.setItem("multistep_form_data",{});

              Navigation.push({
                pathname: "/success",

                state: {
                  reference_no: jsonResponse.reference_no,
                },
              });
            }else if(jsonResponse.status == false){
              addToast(jsonResponse.message, { appearance: "error", autoDismiss: true });
            }
          });
        })
        .catch((error) => {
          console.log("ErrorJsonResponse ===", error);
        });
    }
  };

  console.log(
    "order_cart_items ::",
    previous_data.payment_method_data.cart_items
  );

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Order Summary</title>
        <meta
          name="description"
          content="Order Summary page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Order Summary
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-50 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="d-flex justify-content-center">
                <Card className="border-0 shadow_lg py-3 px-5 w-50">
                  <div className="row">
                    <div className="col">
                      {/* <div className="row mt-2">
                        <div className="col-6">
                          <Form.Text className="SaveCardTitle fw-500 mt-0">
                            Order ID
                          </Form.Text>
                        </div>
                        <div className="col-6">
                          <Form.Text className="StorPrice mt-0">
                            456 566 233
                          </Form.Text>
                        </div>
                      </div> */}

                      <div className="row mt-3">
                        <div className="col-6">
                          <Form.Text className="SaveCardTitle fw-500 mt-0">
                            Order By
                          </Form.Text>
                        </div>
                        <div className="col-6">
                          <Form.Text className="StorPrice mt-0">
                            {previous_data.first_name +
                              " " +
                              previous_data.last_name}
                          </Form.Text>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <Form.Text className="SaveCardTitle fw-500 mt-0">
                            Order Destination
                          </Form.Text>
                        </div>
                        <div className="col-6">
                          <Form.Text className="StorPrice mt-0">
                            {previous_data.delivery_address}
                          </Form.Text>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <Form.Text className="SaveCardTitle fw-500 mt-0">
                            Quantity
                          </Form.Text>
                        </div>
                        <div className="col-6">
                          <Form.Text className="StorPrice mt-0">
                            {
                              previous_data.payment_method_data.cart_items
                                .length
                            }
                          </Form.Text>
                        </div>
                      </div>
                      {/* <div className="row mt-3">
                        <div className="col-6">
                          <Form.Text className="SaveCardTitle fw-500 mt-0">
                            Delivery Date
                          </Form.Text>
                        </div>
                        <div className="col-6">
                          <Form.Text className="StorPrice mt-0">
                            {previous_data.shipping_method_data.delivery_date}
                          </Form.Text>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <hr />
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="contained"
                      className={StylingClasses.CancelButton}
                      onClick={GoToHomePage}
                    >
                      Cancel
                    </Button>
                    {/* <Link to="/success"> */}
                    <Button
                      variant="contained"
                      className={StylingClasses.NextButton}
                      onClick={SubmitForm}
                    >
                      Place Order
                    </Button>
                    {/* </Link> */}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center CheckoutEmptyColor">
                    <div className="item-empty-area__icon mb-30">
                      {/* <i className="pe-7s-cash"></i> */}
                      <img
                        src={Vector1}
                        alt="Vector1Image"
                        width={150}
                        className="mx-auto d-block"
                      />
                    </div>
                    <div className="item-empty-area__text">
                      No items found to see order summary <br />{" "}
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

OrderSummary.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
