import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import ReactHtmlParser from "react-html-parser";
import { useEffect } from "react";

const ProductDescriptionInfo = ({ addToCart, ProductDetail, cartItems, currency_symbol }) => {
  const [quantityCount, setQuantityCount] = useState(1);

  let CartItemsQuantity = 0;

  for (let index = 0; index < cartItems.length; index++) {
    const element = cartItems[index]["quantity"];
    CartItemsQuantity = element;
  }
  console.log("CartItemsQuantity ::", CartItemsQuantity);

  console.log('currency_symbol ::', currency_symbol)

  return (
    <div className="product-details-content ml-70">
      <h2>{ProductDetail.name}</h2>
      <div className="product-details-price">
        {ProductDetail.discount > 0 ? (
          <>
            <span>
              {currency_symbol +
                (ProductDetail.price -
                  ProductDetail.price * (ProductDetail.discount / 100))}
            </span>
            <span className="old ml-3">
              <del>
                {currency_symbol + ProductDetail.price}
              </del>
            </span>
          </>
        ) : (
          <span>
            {currency_symbol + ProductDetail.price}
          </span>
        )}
      </div>
      {/* <div className="pro-details-list text-justify">
        {ReactHtmlParser(ProductDetail.detail)}
      </div> */}
      {
        <Fragment>
          {/* <h5 className="mb-2">
            Availability:{" "}
            <span className="text-success ml-2">
              {ProductDetail.quantity + "  in stock"}
            </span>
          </h5> */}
          <div className="pro-details-quality mt-0 mb-0">
            <div className="cart-plus-minus">
              <button
                onClick={() =>
                  setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                }
                className="dec qtybutton"
              >
                -
              </button>
              <input
                className="cart-plus-minus-box"
                type="text"
                value={quantityCount}
                readOnly
              />
              <button
                // onClick={() =>
                //   setQuantityCount(
                //     quantityCount < ProductDetail.quantity
                //       ? quantityCount + 1
                //       : quantityCount
                //     // quantityCount
                //   )
                // }
                onClick={() => setQuantityCount(quantityCount + 1)}
                className="inc qtybutton"
              >
                +
              </button>
            </div>

            <div className="pro-details-cart btn-hover">
              {ProductDetail.quantity <= 2 ||
              quantityCount > ProductDetail.quantity ||
              ProductDetail.quantity === CartItemsQuantity ? (
                <button style={{ cursor: "not-allowed" }}>Out Of Stock</button>
              ) : (
                <button
                  onClick={() => addToCart(ProductDetail, quantityCount)}
                  title="add"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
          {/* {quantityCount > ProductDetail.quantity ? (
            <small className="text-danger">
              {"Value must be less than or equal to " + ProductDetail.quantity}
            </small>
          ) : (
            ""
          )} */}
        </Fragment>
      }
      <div className="pro-details-social">
        <ul>
          <li>
            <a href="#">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-whatsapp" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-github" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductWeight
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductWeight
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDescriptionInfo);
