import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductGridBestSeller from "./ProductGridBestSeller";
import ProductGridNewArrival from "./ProductGridNewArrival";
import ProductGridOffers from "./ProductGridOffers";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/section-title/SectionTitle";
import HomeProducts from "../../Skeletons/HomeProducts";
import { Col, Row } from "react-bootstrap";
import Vector1 from "../../assets/img/Vector_1.png";
import Vector2 from "../../assets/img/Vector_2.png";

const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
  BestSeller,
  NewArrival,
  Offers,
  currency_symbol,
  Loading,
}) => {
  return (
    <div
      className={`product-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${bgColorClass ? bgColorClass : ""}`}
    >
      <SectionTitle titleText="SHOP" positionClass="text-center" />
      <div className="container">
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="newArrivals">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="bestSeller">
              <div className="row">
                {BestSeller.length >= 1 ? (
                  !Loading ? (
                    BestSeller.map((item) => (
                      <ProductGridBestSeller
                        limit={8}
                        spaceBottomClass="mb-25"
                        BestSeller={item}
                        key={item.id}
                        currency_symbol={currency_symbol}
                      />
                    ))
                  ) : (
                    [1, 2, 3, 4].map((item) => (
                      <div
                        className="col-xl-3 col-md-3 col-lg-3 col-sm-6"
                        key={item}
                      >
                        <HomeProducts />
                      </div>
                    ))
                  )
                ) : (
                  <Col>
                    <Row>
                      <Col sm="12">
                        <img
                          src={Vector1}
                          alt="Vector1Image"
                          width={100}
                          className="mx-auto d-block"
                        />
                        <h4 className="NotFoundText">No Best Sellers Found!</h4>
                      </Col>
                    </Row>
                  </Col>
                )}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="newArrivals">
              <div className="row">
                {NewArrival.length >= 1 ? (
                  !Loading ? (
                    NewArrival.map((item) => (
                      <ProductGridNewArrival
                        limit={8}
                        spaceBottomClass="mb-25"
                        NewArrival={item}
                        key={item.id}
                        currency_symbol={currency_symbol}
                      />
                    ))
                  ) : (
                    [1, 2, 3, 4].map((item) => (
                      <div
                        className="col-xl-3 col-md-3 col-lg-3 col-sm-6"
                        key={item}
                      >
                        <HomeProducts />
                      </div>
                    ))
                  )
                ) : (
                  <Col>
                    <Row>
                      <Col sm="12">
                        <img
                          src={Vector1}
                          alt="Vector1Image"
                          width={100}
                          className="mx-auto d-block"
                        />
                        <h4 className="NotFoundText">No New Arrivals Found!</h4>
                      </Col>
                    </Row>
                  </Col>
                )}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

TabProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProduct;
