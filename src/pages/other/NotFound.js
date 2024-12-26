import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BsSearch } from "react-icons/bs";

const NotFound = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Not Found</title>
        <meta
          name="description"
          content="404 page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        404
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  {/* <h1>404</h1> */}
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/404.png"}
                    alt="Error 404"
                    height={500}
                  />
                  <h2>OPPS! PAGE NOT FOUND</h2>
                  <p className="SorryText">
                    We're Sorry, but the page you are looking for does not
                    exist, has been renamed or temporarily unavailable. 
                    {/* You might try a search below. */}
                  </p>
                  {/* <form className="searchform mb-50">
                    <input
                      type="text"
                      name="search"
                      id="error_search"
                      placeholder="Search..."
                      className="searchform__input"
                    />
                    <button type="button" className="searchform__submit">
                      <BsSearch />
                    </button>
                  </form> */}
                  <Link
                    to={process.env.PUBLIC_URL + "/"}
                    className="error-btn rounded"
                  >
                    Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
