import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({
  Products,
  SelectedCategoryProducts,
  AllProducts,
  layout,
  currency_symbol,
  SearchInputValue
}) => {
  // console.log("ShopProducts 3 ==>", Products);
  // console.log("SelectedCategoryProducts ==>", SelectedCategoryProducts);

  return (
    <div className="shop-bottom-area">
      <div className={`row ${layout ? layout : ""}`}>
        <ProductgridList
          Products={Products}
          SearchInputValue={SearchInputValue}
          AllProducts={AllProducts}
          SelectedCategoryProducts={SelectedCategoryProducts}
          spaceBottomClass="mb-25"
          currency_symbol={currency_symbol}
        />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
