import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { getDiscountPrice } from "../../helpers/product";
import { useToasts } from "react-toast-notifications";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
// import ProductGridSingleTen from "../../components/product/ProductGridSingleTen";
import { Link, useHistory } from "react-router-dom";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import Rating from "../../components/product/sub-components/ProductRating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineCompareArrows } from "react-icons/md";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import ProductModal from "../../components/product/ProductModal";

const ProductGridNewArrival = ({
  addToCart,
  addToWishlist,
  addToCompare,
  sliderClassName,
  spaceBottomClass,
  NewArrival,
  product,
  colorClass,
  productGridStyleClass,
  cartItems,
  cartItem,
  wishlistItem,
  compareItem,
  currency_symbol,
  currency,
}) => {
  const { addToast } = useToasts();

  // ProductModal
  const [modalShow, setModalShow] = useState(false);

  let CartItemsQuantity = 0;

  for (let index = 0; index < cartItems.length; index++) {
    const element = cartItems[index]["quantity"];
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
    <>
      <Fragment>
        <div
          className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
            sliderClassName ? sliderClassName : ""
          }`}
        >
          <div
            className={`product-wrap-10 mb-5 mt-1${
              spaceBottomClass ? spaceBottomClass : ""
            } ${colorClass ? colorClass : ""} ${
              productGridStyleClass ? productGridStyleClass : ""
            } `}
            style={{ height: "330px" }}
          >
            <div className="product-img">
              <img
                className="default-img  mx-auto d-block"
                src={MyConstants.ImageUrl + NewArrival.image}
                alt=""
                height="200"
              />
              {NewArrival.image.length > 1 ? (
                <img
                  className="hover-img"
                  src={MyConstants.ImageUrl + NewArrival.image}
                  alt=""
                  height="200"
                />
              ) : (
                ""
              )}

              {NewArrival.quantity <= 2 ? (
                <div className="product-img-badges right mt-4 ">
                  <span className="OutOfStockBadge right">OUT OF STOCK</span>
                </div>
              ) : (
                ""
              )}
              {NewArrival.discount || NewArrival.new ? (
                <div className="product-img-badges right">
                  {NewArrival.discount ? (
                    <span className="DiscountBadge right">
                      -{NewArrival.discount}%
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="product-action-2">
                {NewArrival.quantity <= 2 ||
                NewArrival.quantity === CartItemsQuantity ? (
                  <button disabled className="active" title="Out of stock">
                    <AiOutlineShoppingCart />
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(NewArrival)}
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

                <button onClick={() => setModalShow(true)} title="Quick View">
                  <AiOutlineEye />
                </button>
              </div>
            </div>
            <div className="product-content-2">
              <div className="title-price-wrap-2">
                <h3 onClick={() => NavigateToProductDetailPage(NewArrival.id)}>
                  {NewArrival.name}
                </h3>
                <div className="price-2">
                  {NewArrival.discount != 0 ? (
                    <Fragment>
                      <span className="amount old">
                        {currency_symbol + NewArrival.price}
                      </span>
                      <span className="amount">
                        {currency_symbol +
                          (NewArrival.price -
                            NewArrival.price * (NewArrival.discount / 100))}
                      </span>
                    </Fragment>
                  ) : (
                    <span className="amount">
                      {currency_symbol + NewArrival.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>

      <ProductModal
        NewArrival={NewArrival}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

ProductGridNewArrival.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(
      state.productData.products,
      ownProps.category,
      ownProps.type,
      ownProps.limit
    ),
    currency: state.currencyData,
    cartItems: state.cartData,
    cartItem: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
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
)(ProductGridNewArrival);
