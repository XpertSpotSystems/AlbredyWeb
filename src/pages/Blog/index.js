import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import blogFeaturedData from "../../data/blog-featured/blog-featured.json";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";

const Blog = ({ location }) => {
  const { pathname } = location;

  console.log("Line 15 ::", pathname);

  const [VisibleData, setVisibleData] = useState(4);

  const ShowMore = () => {
    setVisibleData(
      VisibleData + (blogFeaturedData.length - VisibleData),
      console.log("Line 21 ::", blogFeaturedData.length - VisibleData)
    );
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Blog</title>
        <meta
          name="description"
          content="Blog of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9">
                <div className="ml-20">
                  <div className="row">
                    {blogFeaturedData
                      .slice(0, VisibleData)
                      .map((singlePost) => {
                        return (
                          <>
                            {/* blog posts */}
                            <div className="col-lg-6 col-sm-6">
                              <div className="blog-wrap-2 mb-30">
                                <div className="blog-img-2">
                                  <Link
                                    to={process.env.PUBLIC_URL + singlePost.url}
                                  >
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        singlePost.image
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="BlogDateBadge_blog">
                                  <span className="text-light">
                                    Aug 31 2022
                                  </span>
                                </div>
                                <div className="blog-content-2 BlogContent">
                                  <h4>
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL + singlePost.url
                                      }
                                    >
                                      {singlePost.title}
                                    </Link>
                                  </h4>
                                  <p>{singlePost.description}</p>
                                  <div className="blog-share-comment">
                                    <div className="blog-btn-2">
                                      <Link
                                        to={
                                          process.env.PUBLIC_URL +
                                          singlePost.url
                                        }
                                      >
                                        read more
                                      </Link>
                                    </div>
                                    <div className="blog-share">
                                      <span>share :</span>
                                      <div className="share-social">
                                        <ul>
                                          <li>
                                            <a className="facebook" href="">
                                              <i className="fa fa-facebook" />
                                            </a>
                                          </li>
                                          <li>
                                            <a className="twitter" href="">
                                              <i className="fa fa-twitter" />
                                            </a>
                                          </li>
                                          <li>
                                            <a className="instagram" href="">
                                              <i className="fa fa-instagram" />
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>

                  {VisibleData < blogFeaturedData.length && (
                    <div className="d-flex justify-content-center">
                      <Button variant="outline-success" onClick={ShowMore} className="ShowMoreButton">
                        Show More
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Blog.propTypes = {
  location: PropTypes.object,
};

export default Blog;
