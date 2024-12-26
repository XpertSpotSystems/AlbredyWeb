import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { GrFormClose } from "react-icons/gr";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart,
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Button, Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CustomStyle = makeStyles({
  ProceedButton: {
    display: "block",
    border: "none",
    width: "100%",
    boxShadow: "none",
    "&:focus": {
      background: "#333",
      color: "#fff",
    },
    "&:visible": {
      background: "#333",
      color: "#fff",
    },
  },
  SignInButton: {
    background: "#398E8B",
    color: "#fff",
    width: "100%",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  SignUpButton: {
    background: "#398E8B",
    color: "#fff",
    width: "100%",
    padding: "6px 30px",
    marginTop: "5px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  CloseButton: {
    color: "#398E8B",
    fontSize: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: "#fff",
      background: "#398E8B",
      padding: "0",
      borderRadius: "30px",
    },
  },

  ClearButton: {
    background: "#CC012C",
    color: "#fff",
    width: "50%",
    padding: "6px 30px",
    marginTop: "5px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  CancelButton: {
    background: "#398E8B",
    color: "#fff",
    width: "50%",
    padding: "6px 30px",
    marginTop: "5px",
    marginLeft: "5px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

const Cart = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
}) => {
  console.log("cartItems ...", cartItems);

  const StylingClasses = CustomStyle();

  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  let CartSubTotalPrice = 0;
  let Tax = 0;
  let DeliveryCharges = 0;
  let Coupon = 100;
  let SubTotal = 0;
  let TotalAmount = 0;

  // GetCurrencySymbol
  const GetCurrencySymbol = JSON.parse(localStorage.getItem("general_set"));

  const currency_symbol = GetCurrencySymbol.currency_symbol;

  const Navigate = useHistory();
  const NavigateToCheckoutPage = () => Navigate.push("/checkout");
  const NavigateToLoginPage = () => Navigate.push("/login");

  const NavigateToProductDetailPage = (id) => {
    Navigate.push({
      pathname: "/product-detail",

      state: {
        product_id: id,
        currency_symbol: currency_symbol,
      },
    });
  };

  // ClearCart Modal
  const [ClearCartModalShow, setClearCartModalShow] = useState(false);

  const ClearCartModalClose = () => setClearCartModalShow(false);
  const ClearCartModalOpen = () => setClearCartModalShow(true);

  // ClearCartModal
  const ClearCartModal = (e) => {
    return setClearCartModalShow(true);
  };

  // ClearCartData
  const ClearCartData = () => {
    ClearCartModalClose();
    deleteAllFromCart();
  };

  // ProceedToCheckOut Modal
  const [ProceedToCheckOutModalShow, setProceedToCheckOutModalShow] =
    useState(false);

  const ProceedToCheckOutModalClose = () =>
    setProceedToCheckOutModalShow(false);
  const ProceedToCheckOutModalOpen = () => setProceedToCheckOutModalShow(true);

  const LoginUserData = JSON.parse(localStorage.getItem("LOGIN_USER"));

  // Checkout
  const Checkout = () => {
    if (LoginUserData) {
      NavigateToCheckoutPage();
    } else {
      return setProceedToCheckOutModalShow(true);
    }
  };

  // RemoveCartItem Modal
  const [RemoveCartItemModalShow, setRemoveCartItemModalShow] = useState(false);
  const [CartItemData, setCartItemData] = useState([]);

  const RemoveCartItemModalClose = () => setRemoveCartItemModalShow(false);
  const RemoveCartItemModalOpen = () => setRemoveCartItemModalShow(true);

  const RemoveItem = (cartItem) => {
    console.log("CartItemModal ::", cartItem);
    setCartItemData(cartItem);
    return setRemoveCartItemModalShow(true);
  };

  // RemoveCartItemData
  const RemoveCartItemData = () => {
    console.log("CartItemData ::", CartItemData);
    RemoveCartItemModalClose();
    deleteFromCart(CartItemData, addToast);
  };

  cartItems.map((cartItem) => {
    SubTotal +=
      cartItem.quantity *
      (cartItem.price - cartItem.price * (cartItem.discount / 100));
  });

  // for (let index = 0; index < cartItems.length; index++) {

  //   if(cartItems[index]['discount'] > 0) {

  //     console.log('cart_item_discount_price ::',  cartItems[index]['quantity'] *
  //     (cartItems[index]['price'] -
  //       cartItems[index]['price'] *
  //         (cartItems[index]['discount'] / 100)))
  //   } else {
  //   console.log('cart_item_price ::', cartItems[index]['price'])
  //   }
  //   // if(cart_item_price >= 1000) {
  //   //   Tax += 0;
  //   // } else {
  //   //   Tax += 100
  //   // }
  // }

  // Calculation
  SubTotal >= 1000 ? (DeliveryCharges += 0) : (DeliveryCharges += 100);

  return (
    <>
      <Fragment>
        <MetaTags>
          <title>Albredy || Cart</title>
          <meta
            name="description"
            content="Cart page of flone react minimalist eCommerce template."
          />
        </MetaTags>

        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
          Home
        </BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Cart
        </BreadcrumbsItem>

        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="cart-main-area pt-90 pb-100">
            <div className="container">
              {cartItems && cartItems.length >= 1 ? (
                <Fragment>
                  <h2 className="cart-page-title">Your Cart Items</h2>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-content table-responsive cart-table-content">
                        <table>
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Product Detail</th>
                              <th>Unit Price</th>
                              <th>Qty</th>
                              <th>Total Price</th>
                              <th>action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.map((cartItem, key) => {
                              // Tax
                              cartItem.price > 0
                                ? (Tax += (10 / 100) * cartItem.price)
                                : (Tax += 0);

                              TotalAmount = SubTotal + Tax + DeliveryCharges;

                              return (
                                <tr key={key}>
                                  <td className="product-thumbnail">
                                    <img
                                      className="img-fluid"
                                      src={
                                        MyConstants.ImageUrl + cartItem.image
                                      }
                                      alt=""
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        NavigateToProductDetailPage(cartItem.id)
                                      }
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
                                    {cartItem.discount > 0 ? (
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
                                        onClick={() =>
                                          decreaseQuantity(cartItem)
                                        }
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
                                          addToCart(cartItem, quantityCount)
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
                                    {cartItem.discount > 0
                                      ? currency_symbol +
                                        cartItem.quantity *
                                          (cartItem.price -
                                            cartItem.price *
                                              (cartItem.discount / 100))
                                      : currency_symbol +
                                        cartItem.price * cartItem.quantity}
                                  </td>

                                  <td className="product-remove">
                                    <button
                                      onClick={() => RemoveItem(cartItem)}
                                    >
                                      <GrFormClose />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="cart-shiping-update-wrapper">
                        <div className="cart-shiping-update">
                          <Link to={process.env.PUBLIC_URL + "/shop"}>
                            Continue Shopping
                          </Link>
                        </div>
                        <div className="cart-clear">
                          <button onClick={ClearCartModal}>
                            Clear Shopping Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="cart-tax">
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gray CartBottomCardsHeading">
                            Estimate Shipping And Tax
                          </h4>
                        </div>
                        <div className="tax-wrapper">
                          <p>
                            Enter your destination to get a shipping estimate.
                          </p>
                          <div className="tax-select-wrapper">
                            <div className="tax-select">
                              <label>* Country</label>
                              <select className="email s-email s-wid">
                                <option>Pakistan</option>
                                <option>Albania</option>
                                <option>Åland Islands</option>
                                <option>Afghanistan</option>
                                <option>Belgium</option>
                              </select>
                            </div>
                            <div className="tax-select">
                              <label>* Region / State</label>
                              <select className="email s-email s-wid">
                                <option>Punjab</option>
                                <option>Sindh</option>
                              </select>
                            </div>
                            <div className="tax-select">
                              <label>* Zip/Postal Code</label>
                              <input type="text" />
                            </div>
                            <button className="cart-btn-2" type="submit">
                              Get A Quote
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="discount-code-wrapper">
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gray CartBottomCardsHeading">
                            Use Coupon Code
                          </h4>
                        </div>
                        <div className="discount-code">
                          <p>Enter your coupon code if you have one.</p>
                          <form>
                            <input type="text" required name="name" />
                            <button className="cart-btn-2" type="submit">
                              Apply Coupon
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                      <div className="grand-totall">
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gary-cart CartBottomCardsHeading">
                            Cart Total
                          </h4>
                        </div>
                        <h5>
                          Sub Total
                          <span>{currency_symbol + SubTotal}</span>
                        </h5>
                        <h5>
                          Tax
                          <span>{currency_symbol + Tax}</span>
                        </h5>
                        <h5>
                          Delivery Charges
                          <span>{currency_symbol + DeliveryCharges}</span>
                          {/* <span>{ CartSubTotalPrice <= "1000" ? "AED 00" : "AED 100" }</span> */}
                        </h5>
                        {/* <h5>
                        Coupon
                        <span>{"- AED " + Coupon}</span>
                      </h5> */}
                        <h5>
                          Total
                          <span>{currency_symbol + parseInt(TotalAmount).toFixed()}</span>
                        </h5>
                        {/* <Button className="EemoveCoupon mb-2 border-0 w-100">
                        Remove Coupon
                      </Button> */}
                        <Button
                          className={StylingClasses.ProceedButton}
                          onClick={Checkout}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="item-empty-area text-center CartEmptyColor">
                      <div className="item-empty-area__icon mb-30">
                        <i className="pe-7s-cart"></i>
                      </div>
                      <div className="item-empty-area__text">
                        Your cart is empty. You didn’t add any products to the
                        cart yet. <br />{" "}
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

      {/* RemoveCartItemModal */}
      {RemoveCartItemModalShow === true ? (
        <Modal
          className="fade zoom clear_cart_modal"
          show={RemoveCartItemModalOpen}
          onHide={RemoveCartItemModalClose}
          backdrop="static"
          centered
        >
          <Modal.Header className="border-0 m-0 p-0 pt-3 pr-3 justify-content-end">
            <AiOutlineCloseCircle
              onClick={RemoveCartItemModalClose}
              className={StylingClasses.CloseButton}
            />
          </Modal.Header>
          <Modal.Body className="text-center p-5">
            <p className="RemoveCartItemModalHeading">
              Are you sure you want to remove product?
            </p>
            <div className="mx-auto align-center mt-4">
              <Button
                variant="contained"
                onClick={RemoveCartItemData}
                className={StylingClasses.ClearButton}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                className={StylingClasses.CancelButton}
                onClick={RemoveCartItemModalClose}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* ClearCartModal */}
      {ClearCartModalShow === true ? (
        <Modal
          className="fade zoom clear_cart_modal"
          show={ClearCartModalOpen}
          onHide={ClearCartModalClose}
          backdrop="static"
          centered
        >
          <Modal.Body className="text-center p-5">
            <p className="ClearCartModalHeading">
              Are you sure you want to clear cart?
            </p>
            <div className="mx-auto align-center mt-4">
              <Button
                variant="contained"
                onClick={ClearCartData}
                className={StylingClasses.ClearButton}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                className={StylingClasses.CancelButton}
                onClick={ClearCartModalClose}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* ProceedToCheckOutModal */}
      {ProceedToCheckOutModalShow === true ? (
        <Modal
          className="fade zoom proceed_to_check_out_modal"
          show={ProceedToCheckOutModalOpen}
          onHide={ProceedToCheckOutModalClose}
          backdrop="static"
          centered
        >
          <Modal.Header className="border-0 m-0 p-0 pt-3 pr-3 justify-content-end">
            <AiOutlineCloseCircle
              onClick={ProceedToCheckOutModalClose}
              className={StylingClasses.CloseButton}
            />
          </Modal.Header>
          <Modal.Body className="text-center p-5">
            <p className="ProceedToCheckOutModalHeading">Please login first!</p>
            <div className="d-flex flex-column mx-auto align-center mt-4">
              <Link to="/login">
                {" "}
                <Button
                  variant="contained"
                  className={StylingClasses.SignInButton}
                >
                  Already have account? Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="contained"
                  className={StylingClasses.SignUpButton}
                  onClick={ClearCartModalClose}
                >
                  Register yourself? Sign up
                </Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

Cart.propTypes = {
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
    currency: state.currencyData,
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
