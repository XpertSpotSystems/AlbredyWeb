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
import { Link } from "react-router-dom";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import Rating from "../../components/product/sub-components/ProductRating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineCompareArrows } from "react-icons/md";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import ProductModal from "../../components/product/ProductModal";

const ProductGridOffers = ({
  addToCart,
  addToWishlist,
  addToCompare,
  sliderClassName,
  spaceBottomClass,
  Offers,
  product,
  colorClass,
  productGridStyleClass,
  cartItem,
  wishlistItem,
  compareItem,
}) => {
  const { addToast } = useToasts();

  // ProductModal
  const [modalShow, setModalShow] = useState(false);

  const discountedPrice = getDiscountPrice(
    Offers.price,
    Offers.discount
  );
  const finalProductPrice = +(Offers.price * Offers.currency).toFixed(
    2
  );
  const finalDiscountedPrice = +(discountedPrice * Offers.currency).toFixed(
    2
  );

  console.log("Offers ======>", Offers);
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
          >
            <div className="product-img">
              <Link to={"/product_detail/" + Offers.id}>
                <img
                  className="default-img  mx-auto d-block"
                  src={MyConstants.ImageUrl + Offers.image}
                  alt=""
                  height="200"
                />
                {Offers.image.length > 1 ? (
                  <img
                    className="hover-img"
                    src={MyConstants.ImageUrl + Offers.image}
                    alt=""
                    height="200"
                  />
                ) : (
                  ""
                )}
              </Link>
              {Offers.discount || Offers.new ? (
                <div className="product-img-badges">
                  {Offers.discount ? (
                    <span className="DiscountBadge">
                      -{Offers.discount}%
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="product-action-2">
                {Offers.quantity <= 2 ? (
                  <button
                    onClick={() => addToCart(Offers)}
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
                ) : (
                  <button disabled className="active" title="Out of stock">
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
                <h3>
                  <Link to={"/product_detail/" + Offers.id}>
                    {Offers.name}
                  </Link>
                </h3>
                <div className="product-rating">
                  <Rating ratingValue={Offers.discount} />
                </div>
                <div className="price-2">
                  {discountedPrice !== null ? (
                    <Fragment>
                      <span className="old">
                        {Offers.currency_symbol + " " + finalProductPrice}
                      </span>
                      <span>
                        {Offers.currency_symbol +
                          " " +
                          finalDiscountedPrice}
                      </span>{" "}
                    </Fragment>
                  ) : (
                    <span>
                      {Offers.currency_symbol + " " + finalProductPrice}{" "}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>

      <ProductModal
        Offers={Offers}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

ProductGridOffers.propTypes = {
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
)(ProductGridOffers);
