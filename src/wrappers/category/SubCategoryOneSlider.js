import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { Link, useHistory } from "react-router-dom";
import HomeCategories from "../../Skeletons/HomeCategories";
import SectionTitle from "../../components/section-title/SectionTitle";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function SubCategoryOneSlider({ Categories, Loading }) {
  const History = useHistory();
  const CategoryProducts = (id) =>
    History.push("/category_product/" + id);

  console.log(Categories);

  return (
    <div>
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <SectionTitle titleText="Sub Categories!" positionClass="text-center" />
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={5000}
          infinite={true}
          draggable={true}
        >
          {!Loading
            ? Categories.map((item) => (
                <div className="blog-wrap mb-30 scroll-zoom ml-3">
                  <div className="blog-img">
                    <img
                      src={MyConstants.ImageUrl + item.image}
                      alt=""
                      height={300}
                      style={{ cursor: "pointer" }}
                      onClick={() => CategoryProducts(item.id)}
                    />
                  </div>
                  <div className="blog-content-wrap">
                    <div className="blog-content text-center" style={{background: '#333'}}>
                      <h3>
                        <Link
                          to={process.env.PUBLIC_URL + item.id}
                          className="text-light"
                        >
                          {item.name}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            : [1, 2, 3].map((item) => (
                <Carousel
                  responsive={responsive}
                  autoPlay={false}
                  infinite={true}
                  draggable={true}
                >
                  <HomeCategories key={item} />
                </Carousel>
              ))}
        </Carousel>
      </div>
    </div>
  );
}
