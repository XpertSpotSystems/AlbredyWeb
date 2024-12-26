import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "./ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  cartItems,
  ProductDetail,
  currency_symbol
}) => {

  const {addToast} = useToasts();

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            {/* product image gallery */}
            <ProductImageGallery ProductDetail={ProductDetail} />
          </div>
          <div className="col-lg-8 col-md-8">
            {/* product description info */}
            <ProductDescriptionInfo
              ProductDetail={ProductDetail}
              // discountedPrice={discountedPrice}
              // currency={currency}
              // finalDiscountedPrice={finalDiscountedPrice}
              // finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              // wishlistItem={wishlistItem}
              // compareItem={compareItem}
              addToast={addToast}
              currency_symbol={currency_symbol}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
