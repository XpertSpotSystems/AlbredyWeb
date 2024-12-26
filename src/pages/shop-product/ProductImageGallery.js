import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import * as MyConstants from "../../AdminPanel/Constant/Config";

const ProductImageGallery = ({ product, ProductDetail }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: false,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  // console.log("ProductDetaiImageGallery", ProductDetail);
  // const ProductImage = ProductDetail.image;

  // const Image = [];

  // for (var i = 1; i <= 6; i++) {
  //   Image.push({ image: `${ProductDetail.image}` });
  // }

  // console.log("ProductDetail", ProductDetail);

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {ProductDetail.discount || ProductDetail.new ? (
          <div className="product-img-badges">
            {ProductDetail.discount ? (
              <span className="DiscountBadge">-{ProductDetail.discount}%</span>
            ) : (
              ""
            )}
            {ProductDetail.new ? <span className="NewBadge">New</span> : ""}
          </div>
        ) : (
          ""
        )}
         {ProductDetail.quantity <= 2 ? (
                <div className="product-img-badges mt-4">
                  <span className="OutOfStockBadge">OUT OF STOCK</span>
                </div>
              ) : (
                ""
              )}
        {/* <LightgalleryProvider> */}
        {/* <Swiper {...gallerySwiperParams}> */}
        {/* {Image &&
              Image.map((item, key) => {
                return (
                  <div key={key}>
                    <LightgalleryItem
                      group="any"
                      src={MyConstants.ImageUrl + item.image}
                    >
                      <button>
                        <i className="pe-7s-expand1"></i>
                      </button>
                    </LightgalleryItem>
                    <div className="single-image">
                      <img
                        src={MyConstants.ImageUrl + item.image}
                        className="img-fluid mx-auto d-block"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })} */}
        <div className="single-image">
          <img
            src={MyConstants.ImageUrl + ProductDetail.image}
            className="img-fluid mx-auto d-block"
            alt=""
            style={{ height: "350px", width: '500px' }}
          />
        </div>

        {/* </Swiper> */}
        {/* </LightgalleryProvider> */}
      </div>
      {/* <div className="product-small-image-wrapper mt-15">
        <Swiper {...thumbnailSwiperParams}>
          {Image &&
            Image.map((single, key) => {
              return (
                <div key={key}>
                  <div className="single-image">
                    <img
                      src={MyConstants.ImageUrl + single.image}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div> */}
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object,
};

export default ProductImageGallery;
