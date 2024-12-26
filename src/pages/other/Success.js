import React, { Fragment, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";

const Success = () => {
  // Path
  const Location = useLocation();

  // let reference_no = "";
  // if(Location.state === true) {
  //   reference_no = Location.state.reference_no
  // } else {
  //   reference_no = "";
  // }

  useEffect(() => {
    localStorage.removeItem("redux_localstorage_simple");
  }, [])
  
  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Success</title>
        <meta
          name="description"
          content="Success page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne headerTop="visible">
        <div>
          <div className="container-fluid">
            <div className="container my-5 bg-light shadow-lg py-5 px-3 rounded">
              <div className="row justify-content-center my-3">
                <BsFillCheckCircleFill
                  className="fa-3x"
                  style={{ color: "#398E8B" }}
                />
              </div>

              <div className="row my-3 justify-content-center">
                <h3 className="text-capitalize" style={{ color: "#000" }}>
                  Thank You!
                </h3>
              </div>
              <div className="row mb-2 justify-content-center">
                <h3 className="text-secondary">
                  Your order has been placed successfully.
                </h3>
              </div>
              <div className="row mb-2 justify-content-center">
                <h3 className="text-dark">
                  Your Order No: <span style={{ color: "#398E8B" }}>{Location.state.reference_no}</span>
                </h3>
              </div>
              <div className="row justify-content-center mt-5">
                <Link
                  to={process.env.PUBLIC_URL + "/"}
                  className="error-btn text-capitalize"
                  style={{ borderRadius: "5px" }}
                >
                  Back to home page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Success;
