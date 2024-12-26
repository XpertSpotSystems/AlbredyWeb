import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";
import * as MyConstants from "../../../AdminPanel/Constant/Config";
import { GrFormClose } from "react-icons/gr";
import { Button } from "react-bootstrap";

const MenuCart = ({
  cartData,
  currency,
  deleteFromCart,
  // general_setting
}) => {
  let general_setting = JSON.parse(localStorage.getItem("general_set"));
  let cartTotalPrice = 0;
  const { addToast } = useToasts();

  // console.log("cartDataMenuCard ::", cartData);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));

  let user_id;

  if (LoginUser) {
    user_id = LoginUser.id;
  }

  const Navigate = useHistory();
  const NavigateToCheckoutPage = () => Navigate.push("/checkout");
  const NavigateToLoginPage = () => Navigate.push("/login");
  // NavigateToProductDetailPage
  const NavigateToProductDetailPage = (id) => {
    Navigate.push({
      pathname: "/product-detail",

      state: {
        product_id: id,
        currency_symbol: general_setting.currency_symbol,
      },
    });
  };

  // Checkout
  const Checkout = () => {
    if (LoginUser) {
      NavigateToCheckoutPage();
    } else {
      NavigateToLoginPage();
    }
  };

  let Total = 0;
  let cart_user_id = null;

  cartData.map((cartItem) => {
    Total +=
      cartItem.quantity *
      (cartItem.price - cartItem.price * (cartItem.discount / 100));

    cart_user_id = cartItem.cart_user_id;
  });

  return (
    <>
      {cartData && cartData.length > 0 ? (
        <div className="shopping-cart-content Menuitems">
          <Fragment>
            <ul>
              {cartData.map((single, key) => {
                return (
                  <li className="single-shopping-cart" key={key}>
                    <div className="shopping-cart-img">
                      <img
                        alt=""
                        src={MyConstants.ImageUrl + single.image}
                        className="img-fluid"
                        onClick={() => NavigateToProductDetailPage(single.id)}
                      />
                      {/* </Link> */}
                    </div>
                    <div className="shopping-cart-title">
                      <h4
                        onClick={() => NavigateToProductDetailPage(single.id)}
                      >
                        {" "}
                        {single.name}{" "}
                      </h4>
                      <h6>Qty: {single.quantity}</h6>
                      <span>
                        Sub-Total:{" "}
                        {general_setting.currency_symbol +
                          single.quantity *
                            (single.price -
                              single.price * (single.discount / 100))}
                      </span>
                    </div>
                    <div className="shopping-cart-delete">
                      <button onClick={() => deleteFromCart(single, addToast)}>
                        <GrFormClose />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="shopping-cart-total">
              <h4>
                Total :{" "}
                <span className="shop-total">
                  {general_setting.currency_symbol
                    ? general_setting.currency_symbol + Total
                    : general_setting.currency_symbol + Total}
                </span>
              </h4>
            </div>
            <div className="shopping-cart-btn btn-hover text-center">
              <Link
                className="default-btn"
                to={process.env.PUBLIC_URL + "/cart"}
              >
                view cart
              </Link>

              <a className="default-btn" onClick={Checkout}>
                Checkout
              </a>
            </div>
          </Fragment>
        </div>
      ) : (
        <div className="shopping-cart-content">
          <p className="text-center">No items added to cart</p>
        </div>
      )}
    </>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
};

export default MenuCart;
