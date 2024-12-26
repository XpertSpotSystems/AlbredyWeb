import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";

const RelatedProductSlider = ({ spaceBottomClass, ProductDetail }) => {
  const settings = {
    loop: true,
    slidesPerView: 4,
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    }
  };

  console.log("ProductDetail_Grid ===", ProductDetail)

  return (
    <div
      className={`related-product-area ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <SectionTitle
          titleText="Related Products"
          positionClass="text-center"
          spaceClass="mb-100"
        />
        {/* <div className="row"> */}
          <Swiper {...settings}>
            <ProductGrid
              ProductDetail={ProductDetail}
              limit={6}
              sliderClassName="swiper-slide"
            />
          </Swiper>
        {/* </div> */}
      </div>
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default RelatedProductSlider;
