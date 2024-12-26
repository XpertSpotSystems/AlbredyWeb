import PropTypes from "prop-types";
import React from "react";
import blogFeaturedData from "../../data/blog-featured/blog-featured.json";
import SectionTitle from "../../components/section-title/SectionTitle";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const BlogFeatured = ({ spaceTopClass, spaceBottomClass }) => {
  console.log("Line 10 ::", blogFeaturedData.slice(-3));

  return (
    <div
      className={`blog-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <SectionTitle
          titleText="OUR BLOGS"
          positionClass="text-center"
          spaceClass="mb-55"
        />
        <div className="row">
          {blogFeaturedData.slice(-3).map((singlePost) => {
            return (
              <div className="col-lg-4 col-sm-6">
                <Card className="BlogCard">
                  <div className="blog-wrap mb-30 scroll-zoom">
                    <div className="blog-img">
                      <Link to={process.env.PUBLIC_URL + singlePost.url}>
                        <img
                          src={process.env.PUBLIC_URL + singlePost.image}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="BlogDateBadge">
                      <span className="text-light">Aug 31 2022</span>
                    </div>
                    <div className="blog-content-wrap">
                      <div className="blog-content text-center BlogContent">
                        <h3>
                          <Link to={process.env.PUBLIC_URL + singlePost.url}>
                            {singlePost.title}
                          </Link>
                        </h3>
                        <span>
                          By
                          <Link
                            to={process.env.PUBLIC_URL + singlePost.authorUrl}
                          >
                            {" " + singlePost.author}
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

BlogFeatured.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BlogFeatured;
