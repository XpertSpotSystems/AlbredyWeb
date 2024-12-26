import React, { useState, Fragment } from "react";
import { useToasts } from "react-toast-notifications";
import { Button, Switch } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import { BiEdit } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
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

const CustomSwitch = withStyles({
  colorSecondary: {
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#398E8B",
    },

    "&.Mui-checked": {
      color: "#398E8B",
    },
  },
})(Switch);

const PaymentMethodForm = ({
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
  currency_symbol,
}) => {
  console.log("cart_items_payment_method :::", cartItems);

  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  // let CartSubTotalPrice = 0;
  let SubTotalPrice = 0;
  let Tax = 0;
  let DeliveryCharges = 0;
  let TotalAmount = 0;
  let TotalCartAmount = 0;

  //   StylingClasses
  const StylingClasses = CustomStyle();
  const LastStepLength = GetSteps.length - 1;
  const BackStepLength = GetSteps.length > 1;

  // PreviousData
  const previous_data = JSON.parse(localStorage.getItem("multistep_form_data"));

  // FORM STATES
  const [CashDelivery, setCashDelivery] = useState("");
  const [OnlinePayment, setOnlinePayment] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [CardName, setCardName] = useState("");
  const [CardExpiryDate, setCardExpiryDate] = useState("");
  const [CardSecurityCode, setCardSecurityCode] = useState("");
  const [SaveCard, setSaveCard] = useState("");

  // checkedOnlinePayment
  const checkedOnlinePayment = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setOnlinePayment("yes");
      setCashDelivery("no");
    } else {
      setOnlinePayment("no");
      setCashDelivery("yes");
    }
  };

  // checkedCashDelivery
  const checkedCashDelivery = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setOnlinePayment("no");
      setCashDelivery("yes");
    } else {
      setOnlinePayment("yes");
      setCashDelivery("no");
    }
  };

  // checkedSaveCard
  const checkedSaveCard = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSaveCard("yes");
    } else {
      setSaveCard("no");
    }
  };

  // CartArrayData
  const CartArrayData = [];
  const sub_total_cart_items = [];
  let discountedPrice = 0;
  let finalProductPrice = 0;
  let finalDiscountedPrice = 0;

  for (let index = 0; index < cartItems.length; index++) {
    const cart_element = {
      price: cartItems[index]["price"],
      discount: cartItems[index]["discount"],
    };
    sub_total_cart_items.push(cart_element);

    finalProductPrice =
      cartItems[index]["price"] - cartItems[index]["discount"];

    cartItems[index]["discount"] != 0
      ? (SubTotalPrice +=
          cartItems[index]["quantity"] *
          (cartItems[index]["price"] -
            (cartItems[index]["price"] * cartItems[index]["discount"]) / 100))
      : (SubTotalPrice +=
          cartItems[index]["price"] * cartItems[index]["quantity"]);

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

  // Tax
  // SubTotalPrice >= 1000 ? (Tax += Number(0)) : (Tax += Number(100));

  // DeliveryCharges
  // SubTotalPrice >= 1000
  //   ? (DeliveryCharges += Number(0))

  // TotalCartAmount
  // TotalCartAmount +=
  //   Number(SubTotalPrice) + Number(Tax) + Number(DeliveryCharges);

  // SUBMIT FORM
  const SubmitForm = () => {
    let payment_method_data = {
      // online_payment: OnlinePayment,
      // card_number: CardNumber,
      // card_name: CardName,
      // card_expiry_date: CardExpiryDate,
      // card_security_code: CardSecurityCode,
      // save_card: SaveCard,
      cart_items: CartArrayData,
      tax: Tax,
      delivery_fee: DeliveryCharges,
      sub_total: SubTotalPrice,
      total: TotalCartAmount,
    };

    localStorage.setItem(
      "multistep_form_data",
      JSON.stringify({ ...previous_data, payment_method_data })
    );

    HandleNext();
  };

  const Navigate = useHistory();

  const NavigateToProductDetailPage = (id) => {
    Navigate.push({
      pathname: "/product-detail",

      state: {
        product_id: id,
        currency_symbol: currency_symbol,
      },
    });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="form-group mb-0">
              <div className="d-inline-flex">
                <div className="custom-radio-btn fw-500">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={CashDelivery === true ? "cash_delivery" : "payment"}
                    id="cash_payment"
                    onChange={checkedCashDelivery}
                    checked
                  />
                  <span className="checkmark"></span>
                </div>
                <label
                  className="form-check-label ml-2 fw-500"
                  htmlFor="cash_payment"
                >
                  Cash on Delivery (COD)
                </label>
              </div>
            </div>
          </div>
        </div>

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
                     SubTotalPrice >= 1000
                       ? (DeliveryCharges += 0)
                       : (DeliveryCharges += 100);
                     TotalCartAmount = SubTotalPrice + Tax + DeliveryCharges;

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
                                onClick={() => decreaseQuantity(cartItem)}
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
                                onClick={() =>
                                  addToCart(
                                    cartItem,
                                    quantityCount < cartItem.quantity
                                      ? quantityCount
                                      : 0
                                  )
                                }
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
                            {cartItem.discount !== 0
                              ? currency_symbol +
                                cartItem.quantity *
                                  (cartItem.price -
                                    cartItem.price * (cartItem.discount / 100))
                              : currency_symbol +
                                cartItem.price * cartItem.quantity}
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

        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            <div className="row mt-2">
              <div className="col-6">
                <Form.Text className="SaveCardTitle mt-0">Sub Total</Form.Text>
              </div>
              <div className="col-6">
                <Form.Text className="StorPrice mt-0">
                  {currency_symbol + SubTotalPrice}
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
                  {currency_symbol + TotalCartAmount}
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
          {ActiveStep === LastStepLength ? "Place Order" : "Next"}
        </Button>
      </div>
    </>
  );
};

// export default PaymentMethodForm;

PaymentMethodForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodForm);
