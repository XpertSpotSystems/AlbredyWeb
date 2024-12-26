import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "./ProductImageDescription";
import SkeletonProductDetail from "../../Skeletons/SkeletonProductDetail";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { useLocation } from "react-router-dom";

const ProductDetail = ({ location, product }) => {
  const Location = useLocation();

  const ProductID = Location.state.product_id;
  const currency_symbol = Location.state.currency_symbol;

  const [ProductDetail, setProductDetail] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    // Skeleton Loading
    setLoading(true);
    fetch(MyConstants.FrontEndProductDetail + ProductID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((response) => {
        console.warn("JsonResponse ===", response);
        if (response.status == true) {
          setLoading(false);
          setProductDetail(response.product[0]);
          console.log("ProductID___", ProductID);
          console.log("currency_symbol___", currency_symbol);
        }
      });
    });
  }, []);
  // console.log("ProductDetail ===", ProductDetail);

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Shop Product Details</title>
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + ProductID}>
        Shop Product Details
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {!Loading ? (
          <ProductImageDescription
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            ProductDetail={ProductDetail}
            currency_symbol={currency_symbol}
          />
        ) : (
          <SkeletonProductDetail />
        )}

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          ProductDetail={ProductDetail}
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          ProductDetail={ProductDetail}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

ProductDetail.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      (single) => single.id === itemId
    )[0],
  };
};

export default connect(mapStateToProps)(ProductDetail);
