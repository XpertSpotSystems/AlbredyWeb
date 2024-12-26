import PropTypes from "prop-types";
import React, { Fragmen, Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Rating from "./sub-components/ProductRating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import ProductModal from "../../components/product/ProductModal";
import { connect } from "react-redux";

const ProductGridListSingle = ({
  addToCart,
  cartItem,
  sliderClassName,
  spaceBottomClass,
  productGridStyleClass,
  colorClass,
  Products,
  //currency_symbol
}) => {
  const general = JSON.parse(localStorage.getItem("general_set"));

  // LoginData
  const LoginData = JSON.parse(localStorage.getItem("LOGIN_USER"));

  var user_id = null;

  if (LoginData) {
    user_id = LoginData.id;
  }

  // console.log('user_id ::', user_id)

  const currency_symbol = general.currency_symbol;
  // ProductModal
  const [ModalShow, setModalShow] = useState(false);

  let CartItemsQuantity = 0;

  for (let index = 0; index < cartItem.length; index++) {
    const element = cartItem[index]["quantity"];
    CartItemsQuantity = element;
  }

  const History = useHistory();
  const NavigateToProductDetailPage = (id) => {
    History.push({
      pathname: "/product-detail",

      state: {
        product_id: id,
        currency_symbol: currency_symbol,
      },
    });
  };

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
        key={Products.id}
      >
        <div
          className={`product-wrap-10 mb-5 mt-1${
            spaceBottomClass ? spaceBottomClass : ""
          } ${colorClass ? colorClass : ""} ${
            productGridStyleClass ? productGridStyleClass : ""
          } `}
          style={{ height: "350px" }}
        >
          <div
            className="product-img"
            style={{ cursor: "pointer", zIndex: "9" }}
          >
            <img
              className="default-img  mx-auto d-block"
              src={MyConstants.ImageUrl + Products.image}
              alt=""
              height="200"
            />
            {Products.image.length > 1 ? (
              <img
                className="hover-img"
                src={MyConstants.ImageUrl + Products.image}
                alt=""
                height="200"
              />
            ) : (
              ""
            )}

            {Products.quantity <= 2 ? (
              <div className="product-img-badges right mt-4 ">
                <span className="OutOfStockBadge right">OUT OF STOCK</span>
              </div>
            ) : (
              ""
            )}

            {Products.discount || Products.new ? (
              <div className="product-img-badges right">
                {Products.discount ? (
                  <span className="DiscountBadge right">
                    -{Products.discount}%
                  </span>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <div className="product-action-2">
              {Products.quantity <= 2 ||
              Products.quantity === CartItemsQuantity ? (
                <button disabled className="active" title="Out of stock">
                  <AiOutlineShoppingCart />
                </button>
              ) : (
                <button
                  onClick={() => addToCart(Products)}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  <AiOutlineShoppingCart />
                </button>
              )}

              <button title="Quick View" onClick={() => setModalShow(true)}>
                <AiOutlineEye />
              </button>
            </div>
          </div>
          <div className="product-content-2">
            <div className="title-price-wrap-2">
              <h3 onClick={() => NavigateToProductDetailPage(Products.id)}>
                {Products.name}
              </h3>
              <div className="product-rating">
                <Rating ratingValue={Products.rating} />
              </div>
              <div className="price-2">
                {Products.discount != 0 ? (
                  <Fragment>
                    <span className="amount old">
                      {currency_symbol + Products.price}
                    </span>
                    <span className="amount">
                      {currency_symbol +
                        (Products.price -
                          Products.price * (Products.discount / 100))}
                    </span>
                  </Fragment>
                ) : (
                  <span className="amount">
                    {currency_symbol + Products.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        Products={Products}
        show={ModalShow}
        onHide={() => setModalShow(false)}
        currency_symbol={currency_symbol}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItem: state.cartData,
  };
};

export default connect(mapStateToProps)(ProductGridListSingle);
