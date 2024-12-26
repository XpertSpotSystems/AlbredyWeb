import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { HiOutlineMail } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { HiOutlinePhone } from "react-icons/hi";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { HiChevronDoubleUp } from "react-icons/hi";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import ReactHtmlParser from "react-html-parser";

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu,
  colorClass,
  // general_setting,
}) => {
  let general_setting = JSON.parse(localStorage.getItem("general_set"));
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);
  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  // console.log("general_settings_footer ::", general_setting);

  // States
  const [Categories, setCategories] = useState([]);

  // GetCategories
  const GetCategories = () => {
    fetch(MyConstants.FrontEndHomeData, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        result.json().then((response) => {
          if (response.status === true) {
            setCategories(response.front_data.categories);
          }
        });
      })
      .catch((error) => {
        console.log("Error ::", error);
      });
  };

  useEffect(() => {
    GetCategories();
  }, []);

  const History = useHistory();
  let currency_symbol;

  if(general_setting) {
    currency_symbol = general_setting.currency_symbol
  }

  const CategoryProducts = (id) => {
  console.log('80', id)
    History.push({
      pathname: "/category_product",

      state: {
        category_id: id,
        currency_symbol: currency_symbol
      },
    });
  }

  return (
    <>
      <footer
        className={`footer-area ${
          backgroundColorClass ? backgroundColorClass : ""
        } ${spaceTopClass ? spaceTopClass : ""} ${
          spaceBottomClass ? spaceBottomClass : ""
        } ${extraFooterClass ? extraFooterClass : ""} ${
          spaceLeftClass ? spaceLeftClass : ""
        } ${spaceRightClass ? spaceRightClass : ""}`}
      >
        <div className={`${containerClass ? containerClass : "container"}`}>
          <div className="row">
            {/* <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-6"
            }`}
          > */}
            <div className="col-md-4 col-sm-4">
              <div spaceBottomClass="mb-30">
                <div
                  className={`copyright ${
                    spaceBottomClass ? spaceBottomClass : ""
                  } ${colorClass ? colorClass : ""}`}
                >
                  <div className="footer-logo">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      <img
                        alt=""
                        src={
                          MyConstants.SecondImageUrl +
                          (general_setting ? general_setting.logo : "")
                        }
                        height={100}
                        width={100}
                      />
                    </Link>
                  </div>
                  {ReactHtmlParser(
                    general_setting ? general_setting.description : ""
                  )}
                </div>
              </div>
            </div>
            {/* <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-6"
            }`}
          > */}
            <div className="col-md-2 col-sm-4">
              <div className="footer-widget mb-30 ml-30">
                <div className="footer-title">
                  <h3>SHOP NOW</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    {Categories.map((item) => (
                      <li key={item.id}>
                        {/* <Link to={"/category_product/" + item.id} className="text-capitalize">{item.name}</Link> */}
                        <span className="text-capitalize" onClick={() => CategoryProducts(item.id)}>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-6"
            }`}
          > */}
            {/* <div className="col-md-2 col-sm-4">
            <div
              className={`${
                sideMenu
                  ? "footer-widget mb-30 ml-95"
                  : "footer-widget mb-30 ml-50"
              }`}
            >
              <div className="footer-title">
                <h3>USEFUL LINKS</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/contact_us"}>Contact Us</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/faq"}>FAQ's</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "#/"}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "#/"}>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/help_center"}>Help Center</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
            {/* <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-6"
            }`}
          > */}
            <div className="col-md-4 col-sm-4">
              <div
                className={`${
                  sideMenu
                    ? "footer-widget mb-30 ml-145"
                    : "footer-widget mb-30 ml-75"
                }`}
              >
                <div className="footer-title">
                  <h3>CONTACT INFORMATION</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <a
                        href={
                          "mailto:" +
                          (general_setting ? general_setting.email : "")
                        }
                        target="_blank"
                      >
                        <HiOutlineMail
                          className="mr-2"
                          style={{ fontSize: 18 }}
                        />
                        {general_setting ? general_setting.email : ""}
                      </a>
                    </li>
                    <li>
                      <a
                        href={
                          "tel:" +
                          (general_setting ? general_setting.phone : "")
                        }
                      >
                        <HiOutlinePhone
                          className="mr-2"
                          style={{ fontSize: 18 }}
                        />

                        {general_setting ? general_setting.phone : ""}
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <GoLocation className="mr-2" style={{ fontSize: 18 }} />

                        {general_setting ? general_setting.address : ""}
                      </a>
                    </li>
                  </ul>

                  <br />
                  <ul className="d-inline-flex">
                    <li className="mr-4">
                      <a
                        href={
                          general_setting ? general_setting.facebook_link : ""
                        }
                        className="IconWrap"
                      >
                        <GrFacebookOption />
                      </a>
                    </li>
                    <li className="mr-4">
                      <a
                        href={
                          general_setting ? general_setting.instagram_link : ""
                        }
                        className="IconWrap"
                      >
                        <BsTwitter />
                      </a>
                    </li>
                    <li className="mr-4">
                      <a
                        href={
                          general_setting ? general_setting.twitter_link : ""
                        }
                        className="IconWrap"
                      >
                        <AiFillInstagram />
                      </a>
                    </li>
                    {/* <li className="mr-4">
                    <Link to="#" className="IconWrap">
                      <BsTwitter />
                    </Link>
                  </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-6 col-12">
              <p>
                © 2022{" "}
                <a
                  href="https://xpertsgroup.net/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="FooterWebsiteLink"
                >
                  XpertSpot.
                </a>{" "}
                All Rights Reserved
              </p>
            </div>
            <div className="col-md-6 col-12">
              <div className="FooterLastButtonView">
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/apple_app_store.png"
                  }
                  alt="Apple App Store"
                  className="FooterLastButton"
                />
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/google_app_store.png"
                  }
                  alt="Google App Store"
                  className="FooterLastButton"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className={`scroll-top ${scroll > top ? "show" : ""}`}
          onClick={() => scrollToTop()}
        >
          {/* <i className="fa fa-angle-double-up"></i> */}
          <HiChevronDoubleUp />
        </button>
      </footer>
    </>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default FooterOne;
