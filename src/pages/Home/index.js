import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import TabProduct from "../../wrappers/product/TabProduct";
// import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import { Row, Col, Button, Form } from "react-bootstrap";
import LeftImage from "../../assets/img/home_banner_left_image.png";
import { FaCube } from "react-icons/fa";
import CategoryOneSlider from "../../wrappers/category/CategoryOneSlider";
// import SubCategoryOneSlider from "../../wrappers/category/SubCategoryOneSlider";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Home = ({ location }) => {
  // URL
  const { pathname } = location;

  const [Categories, setCategories] = useState([]);
  const [GeneralSettings, setGeneralSettings] = useState([]);
  // let GeneralSettings = "";
  const [Loading, setLoading] = useState(false);
  const [BestSeller, setBestSeller] = useState([]);
  const [NewArrival, setNewArrival] = useState([]);
  const [Offers, setOffers] = useState([]);
  // const [general_settings, setGeneralSettings] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // GetCurrencySymbol
  // const GetCurrencySymbol = JSON.parse(localStorage.getItem('general_settings'))

  // const currency_symbol = GetCurrencySymbol.currency_symbol;

  // GetHomeData
  const GetHomeData = () => {
    setOpen(true);
    fetch(MyConstants.FrontEndHomeData, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((response) => {
        if (response.status === true) {
          // console.log('nnnn',response.front_data.general_setting);
          localStorage.setItem(
            "general_set",
            JSON.stringify(response.front_data.general_setting)
          );
          // GeneralSettings = response.front_data.general_settings;
          setCategories(response.front_data.categories);
          setGeneralSettings(response.front_data.general_setting);
          setBestSeller(response.front_data.popular_products);
          setNewArrival(response.front_data.featured_products);

          setOffers([]);
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    GetHomeData();
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Home</title>
        <meta
          name="description"
          content="Albredy react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
        // general_settings = {GeneralSettings}
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* categories */}
        <CategoryOneSlider
          spaceBottomClass="pb-50"
          spaceTopClass="pt-60"
          Categories={Categories}
          Loading={Loading}
          general={GeneralSettings}
        />

        {/* tab product */}
        <TabProduct
          spaceBottomClass="pb-60"
          spaceTopClass="pt-10"
          BestSeller={BestSeller}
          NewArrival={NewArrival}
          Offers={Offers}
          Loading={Loading}
          currency_symbol={
            GeneralSettings ? GeneralSettings.currency_symbol : ""
          }
        />

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}

        {/*Banner Section */}
        <div className="container">
          <div className="Banner">
            <Row>
              <Col md={6} sm={12}>
                <img src={LeftImage} alt="ImageNotFound" />
              </Col>
              <Col md={6} sm={12}>
                <div className="RightContent">
                  <h1>30% Discount</h1>
                  <p>Order any food from app & get the discount </p>
                  <Link to="/shop">
                    <Button variant="dark">Order Now</Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* EMAIL LATER */}
        {/* <div className="EmailSubscribe">
          <div className="container">
            <Row>
              <Col md={7} sm={12}>
                <FaCube className="mr-2 Emailicon float-left" />
                <h2 className="EmailHeading">Be the first to know</h2>
                <h5 className="ml-5">
                  Get all the latest information on Events, Sales and Offers.
                </h5>
              </Col>
              <Col className="col-md-5">
                <div className="d-inline-flex justify-content-end">
                  <Form.Control
                    placeholder="Enter Your Email Address"
                    className="EmailInput"
                  />
                  <Button variant="outline-secondary" className="Button">
                    Subscribe
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
