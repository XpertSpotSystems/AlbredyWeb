import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import Vector1 from "../../assets/img/Vector_1.png";
import { Col, Row } from "react-bootstrap";

const ProductGrid = ({
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
  Products,
  SelectedCategoryProducts,
  AllProducts,
  currency_symbol,
  SearchInputValue,
}) => {
  console.log("SearchInputValue ::", SearchInputValue);

  let FilteredData = [];

  if (SelectedCategoryProducts == 0) {
    // let afterFilteredData = [];
    // let bool = false;

    FilteredData = Products;
    // setFilteredData(afterFilteredData);

    const newProduct = Products.filter((value) =>
      value.name.toLowerCase().includes(SearchInputValue.toLowerCase())
    );

    FilteredData = newProduct;
  } else {
    // setFilteredData(SelectedCategoryProducts);
    Products.map((item) => {
      if (item.category == SelectedCategoryProducts) {
        FilteredData.push(item);
      }
    });
    console.log("FilteredData ::", FilteredData);
  }

  // const newProduct = Products.filter((value) =>
  //   value.name.toLowerCase().includes(SearchInputValue.toLowerCase())
  // );

  // FilteredData = newProduct;

  if (FilteredData.length > 0) {
    const newSeachProduct = FilteredData.filter((value) =>
      value.name.toLowerCase().includes(SearchInputValue.toLowerCase())
    );

    FilteredData = newSeachProduct;
  }

  return (
    <Fragment>
      {
        FilteredData.length >= 1
          ? FilteredData.map((product) => (
              <ProductGridListSingle
                key={product.id}
                sliderClassName={sliderClassName}
                spaceBottomClass={spaceBottomClass}
                Products={product}
                currency={currency}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                addToCompare={addToCompare}
                cartItem={
                  cartItems.filter((cartItem) => cartItem.id === Products.id)[0]
                }
                currency_symbol={currency_symbol}
              />
            ))
          : null
        // (
        //   <Col>
        //     <Row>
        //       <Col sm="12">
        //         <img
        //           src={Vector1}
        //           alt="Vector1Image"
        //           width={150}
        //           className="mx-auto d-block mt-5"
        //         />
        //         <h4 className="NotFoundText">No Products Found!</h4>
        //       </Col>
        //     </Row>
        //   </Col>
        // )
      }
    </Fragment>
  );
};

ProductGrid.propTypes = {
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

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
