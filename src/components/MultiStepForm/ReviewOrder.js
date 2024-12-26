import React, { useState, Fragment } from "react";
import { useToasts } from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { getDiscountPrice } from "../../helpers/product";
import { GrFormClose } from "react-icons/gr";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart,
} from "../../redux/actions/cartActions";
import { Spinner } from "react-bootstrap";

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

  BackButton: {
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

const ReviewOrder = ({
  ActiveStep,
  GetSteps,
  HandleNext,
  HandleBack,
  cartItems,
  decreaseQuantity,
  addToCart,
  location,
  deleteFromCart,
  deleteAllFromCart,
  HandleBillingAddress,
  currency_symbol,
  currency_id,
}) => {
  //   StylingClasses
  const StylingClasses = CustomStyle();
  const LastStepLength = GetSteps.length - 1;
  const BackStepLength = GetSteps.length > 1;

  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  let CartSubTotalPrice = 0;
  let Tax = 0;
  let DeliveryCharges = 0;
  let Coupon = 100;
  let SubTotal = 0;
  let TotalAmount = 0;

  // PreviousData
  const previous_data = JSON.parse(localStorage.getItem("multistep_form_data"));

  const DeliveryFeeAmount = previous_data.payment_method_data.delivery_fee;
  const PaymentMethod = previous_data.payment_method_data.online_payment;

  const [Loading, setLoading] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Token = LoginUser.token;

  const Navigate = useHistory();

  const GoToOrderSummaryPage = () => Navigate.push("/order_summary");

  const NavigateToProductDetailPage = (id) => {
    Navigate.push({
      pathname: "/product-detail",

      state: {
        product_id: id,
        currency_symbol: currency_symbol,
      },
    });
  };

  // CartArrayData
  const CartArrayData = [];
  const sub_total_cart_items = [];
  let finalProductPrice = 0;

  for (let index = 0; index < cartItems.length; index++) {
    const element = {
      id: cartItems[index]["id"],
      quantity: cartItems[index]["quantity"],
      sub_total:
        cartItems[index]["discount"] == 0
          ? cartItems[index]["quantity"] * cartItems[index]["price"]
          : cartItems[index]["quantity"] *
            (cartItems[index]["price"] -
              (cartItems[index]["price"] * cartItems[index]["discount"]) / 100),
    };
    CartArrayData.push(element);
  }

  // SUBMIT FORM
  const SubmitForm = () => {
    let user_id = LoginUser.id;

    let order_submit_data = {
      first_name: previous_data.first_name,
      last_name: previous_data.last_name,
      email_address: previous_data.email_address,
      contact_no: previous_data.contact_no,
      city: previous_data.city,
      delivery_address: previous_data.delivery_address,
      location: previous_data.location,

      cart_items: CartArrayData,

      tax: previous_data.payment_method_data.tax,
      delivery_fee: previous_data.payment_method_data.delivery_fee,
      sub_total: SubTotal,
      total: TotalAmount,

      currency_id: currency_id,

      user_id: user_id,

      email: Email,
      token: Token,
    };

    console.log("order_submit_data ::", order_submit_data);

    const API_URL = MyConstants.submitOrder;

    setLoading(true);

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
            setLoading(false);

            deleteAllFromCart(addToast);

            localStorage.removeItem("multistep_form_data");

            Navigate.push({
              pathname: "/success",

              state: {
                reference_no: jsonResponse.reference_no,
              },
            });
          } else if (jsonResponse.status === false) {
            addToast(jsonResponse.message, {
              appearance: "error",
              autoDismiss: true,
              transitionDuration: 440,
            });
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        console.log("ErrorJsonResponse ===", error);
      });
  };

  cartItems.map((cartItem) => {
    SubTotal +=
      cartItem.quantity *
      (cartItem.price - cartItem.price * (cartItem.discount / 100));
  });

  console.log("SubTotal ::", SubTotal);

  // SubTotal >= 1000 ? (Tax += 0) : (Tax += 100);
  // SubTotal >= 1000 ? (DeliveryCharges += 0) : (DeliveryCharges += 100);
  // TotalAmount = SubTotal + Tax + DeliveryCharges;

  const incItem = (cartItem, quantityCount) => {
    addToCart(cartItem, quantityCount);
  };

  const decItem = (cartItem) => {
    decreaseQuantity(cartItem);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row mt-3">
          <div className="col-12">
            <div className="table-content table-responsive cart-table-content">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Total Price</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length >= 1 ? (
                    cartItems.map((cartItem, key) => {
                      // Tax
                      cartItem.price > 0
                        ? (Tax += (10 / 100) * cartItem.price)
                        : (Tax += 0);

                      // Calculation
                      SubTotal >= 1000
                        ? (DeliveryCharges += 0)
                        : (DeliveryCharges += 100);
                      TotalAmount = SubTotal + Tax + DeliveryCharges;

                      return (
                        <tr key={key}>
                          <td className="product-thumbnail">
                            <img
                              className="img-fluid"
                              src={MyConstants.ImageUrl + cartItem.image}
                              alt=""
                              onClick={() =>
                                NavigateToProductDetailPage(cartItem.id)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </td>

                          <td
                            className="product-name"
                            onClick={() =>
                              NavigateToProductDetailPage(cartItem.id)
                            }
                          >
                            {cartItem.name}
                            {cartItem.selectedProductColor &&
                            cartItem.selectedProductSize ? (
                              <div className="cart-item-variation">
                                <span>
                                  Color: {cartItem.selectedProductColor}
                                </span>
                                <span>
                                  Size: {cartItem.selectedProductSize}
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>

                          <td className="product-price-cart">
                            {cartItem.discount != 0 ? (
                              <Fragment>
                                <span className="amount old">
                                  {currency_symbol + cartItem.price}
                                </span>
                                <span className="amount">
                                  {currency_symbol +
                                    (cartItem.price -
                                      cartItem.price *
                                        (cartItem.discount / 100))}
                                </span>
                              </Fragment>
                            ) : (
                              <span className="amount">
                                {currency_symbol + cartItem.price}
                              </span>
                            )}
                          </td>

                          <td className="product-quantity">
                            <div className="cart-plus-minus">
                              <button
                                className="dec qtybutton"
                                onClick={() => decItem(cartItem)}
                              >
                                -
                              </button>
                              <input
                                className="cart-plus-minus-box"
                                type="text"
                                value={cartItem.quantity}
                                readOnly
                              />
                              <button
                                className="inc qtybutton"
                                onClick={() => incItem(cartItem, quantityCount)}
                                disabled={
                                  cartItem !== undefined &&
                                  cartItem.quantity &&
                                  cartItem.quantity >=
                                    cartItemStock(
                                      cartItem,
                                      cartItem.selectedProductColor,
                                      cartItem.selectedProductSize
                                    )
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            {currency_symbol
                              ? cartItem.discount != 0
                                ? currency_symbol +
                                  cartItem.quantity *
                                    (cartItem.price -
                                      cartItem.price *
                                        (cartItem.discount / 100))
                                : currency_symbol +
                                  cartItem.price * cartItem.quantity
                              : ""}
                          </td>

                          <td className="product-remove">
                            <button
                              onClick={() => deleteFromCart(cartItem, addToast)}
                            >
                              <GrFormClose />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} align="center">
                        <h6>Data not found!</h6>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-6 mt-0 pt-0">
            <Form.Text className="DeliveryAddressTitle">
              Delivery Address
              <span className="text-secondary">
                {previous_data.delivery_address}
              </span>
            </Form.Text>
          </div>
          <div className="col-6 mt-0 pt-0">
            <FiEdit
              className="RightIcon mr-2 float-right"
              type="button"
              onClick={HandleBillingAddress}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <Form.Text className="MethodTitle">
              Payment Method:{" "}
              <span className="text-secondary">Cash on Delivery (COD)</span>
            </Form.Text>
          </div>
        </div>

        <hr />
        <div className="row mt-3">
          <div className="col-6"></div>
          <div className="col-6">
            <div className="row mt-2">
              <div className="col-6">
                <Form.Text className="SaveCardTitle mt-0">Sub Total</Form.Text>
              </div>
              <div className="col-6">
                <Form.Text className="StorPrice mt-0">
                  {currency_symbol + SubTotal}
                </Form.Text>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <Form.Text className="SaveCardTitle mt-0">Tax</Form.Text>
              </div>
              <div className="col-6">
                <Form.Text className="StorPrice mt-0">
                  {currency_symbol + Tax}
                </Form.Text>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <Form.Text className="SaveCardTitle mt-0">Delivery</Form.Text>
              </div>
              <div className="col-6">
                <Form.Text className="StorPrice mt-0">
                  {currency_symbol + DeliveryCharges}
                </Form.Text>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <Form.Text className="fw-500 text-dark mt-0">
                  <h4>Total</h4>
                </Form.Text>
              </div>
              <div className="col-6">
                <Form.Text className="StorPrice mt-0">
                  {currency_symbol + TotalAmount}
                </Form.Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        {console.log("Line 177 ::", BackStepLength)}
        {BackStepLength === true ? (
          <Button
            variant="contained"
            className={StylingClasses.BackButton}
            onClick={HandleBack}
          >
            Back
          </Button>
        ) : null}
        <Button
          variant="contained"
          className={StylingClasses.NextButton}
          onClick={SubmitForm}
        >
          {Loading ? (
            <>
              <Spinner
                animation="border"
                variant="light"
                size="sm"
                className="mr-2"
              />
              Loading...
            </>
          ) : (
            <>Place Order</>
          )}
        </Button>
      </div>
    </>
  );
};

ReviewOrder.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
