import React from "react";
import Swiper from "react-id-swiper";
import heroSliderData from "../../data/hero-sliders/hero_slider_main.json";

const HeroSliderOne = () => {
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
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

  return (
    <div className="slider-area" style={{zIndex: "2", marginTop: "-4vh", }}>
      <div className="slider-active nav-style-1">
        {/* <Swiper {...params}> */}
          {heroSliderData &&
            heroSliderData.map((single, key) => {
              return (
                <div
                  className={`single-slider slider-height-1 bg-purple-1 ${
                    "swiper-slide" ? "swiper-slide" : ""
                  }`} key={single.id}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
                        <div className="slider-single-img">
                          <img
                            className="animated img-fluid"
                            src={process.env.PUBLIC_URL + single.left_image}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
                        <div className="slider-single-img">
                          <img
                            className="animated img-fluid"
                            src={process.env.PUBLIC_URL + single.right_image}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        {/* </Swiper> */}
      </div>
    </div>
  );
};

export default HeroSliderOne;
