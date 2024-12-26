import React, { Fragment, useState, useEffect } from "react";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { Button, Modal } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { addToCart } from "../../redux/actions/cartActions";

export default function ProductModal({
  BestSeller,
  NewArrival,
  show,
  onHide,
  addToast,
  spaceTopClass,
  spaceBottomClass,
  Products,
  currency_symbol,
}) {
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={onHide}
        className="product-quickview-modal-wrapper"
        size="xl"
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <h3 className="ProductModalHeading">Product Detail View</h3>
        </Modal.Header>

        <Modal.Body>
          {BestSeller ? (
            <div
              className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
              }`}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <div className="product-large-image-wrapper">
                      {BestSeller.discount || BestSeller.new ? (
                        <div className="product-img-badges">
                          {BestSeller.discount ? (
                            <span className="DiscountBadge">
                              -{BestSeller.discount}%
                            </span>
                          ) : (
                            ""
                          )}
                          {BestSeller.new ? (
                            <span className="NewBadge">New</span>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="single-image">
                        <img
                          src={MyConstants.ImageUrl + BestSeller.image}
                          className="img-fluid mx-auto d-block"
                          alt=""
                          style={{ height: "300px", width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <div className="product-details-content ml-70">
                      <h2>{BestSeller.name}</h2>
                      <div className="product-details-price">
                        {BestSeller.discount > 0 ? (
                          <>
                            <span>
                              {currency_symbol +
                                (BestSeller.price -
                                  BestSeller.price *
                                    (BestSeller.discount / 100))}
                            </span>
                            <span className="old ml-3">
                              <del>{currency_symbol + BestSeller.price}</del>
                            </span>
                          </>
                        ) : (
                          <>
                            <span>{currency_symbol + BestSeller.price}</span>
                          </>
                        )}
                      </div>
                      <div className="pro-details-list text-justify">
                        <p>{ReactHtmlParser(BestSeller.detail)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {NewArrival ? (
            <div
              className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
              }`}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="product-large-image-wrapper">
                      {NewArrival.discount || NewArrival.new ? (
                        <div className="product-img-badges">
                          {NewArrival.discount ? (
                            <span className="DiscountBadge">
                              -{NewArrival.discount}%
                            </span>
                          ) : (
                            ""
                          )}
                          {NewArrival.new ? (
                            <span className="NewBadge">New</span>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="single-image">
                        <img
                          src={MyConstants.ImageUrl + NewArrival.image}
                          className="img-fluid mx-auto d-block"
                          alt=""
                          style={{ height: "300px", width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="product-details-content ml-70">
                      <h2>{NewArrival.name}</h2>
                      <div className="product-details-price">
                        {NewArrival.discount > 0 ? (
                          <>
                            <span>
                              {currency_symbol +
                                (NewArrival.price -
                                  NewArrival.price *
                                    (NewArrival.discount / 100))}
                            </span>
                            <span className="old ml-3">
                              <del>{currency_symbol + NewArrival.price}</del>
                            </span>
                          </>
                        ) : (
                          <span>{currency_symbol + NewArrival.price}</span>
                        )}
                      </div>
                      <div className="pro-details-list text-justify">
                        <p>{ReactHtmlParser(NewArrival.detail)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {Products ? (
            <div
              className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
                spaceBottomClass ? spaceBottomClass : ""
              }`}
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="product-large-image-wrapper">
                      {Products.discount || Products.new ? (
                        <div className="product-img-badges">
                          {Products.discount ? (
                            <span className="DiscountBadge">
                              -{Products.discount}%
                            </span>
                          ) : (
                            ""
                          )}
                          {Products.new ? (
                            <span className="NewBadge">New</span>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="single-image">
                        <img
                          src={MyConstants.ImageUrl + Products.image}
                          className="img-fluid mx-auto d-block"
                          alt=""
                          style={{ height: "300px", width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="product-details-content ml-70">
                      <h2>{Products.name}</h2>
                      <div className="product-details-price">
                        {Products.discount > 0 ? (
                          <>
                            <span>
                              {currency_symbol +
                                (Products.price -
                                  Products.price * (Products.discount / 100))}
                            </span>
                            <span className="old ml-3">
                              <del>{currency_symbol + Products.price}</del>
                            </span>
                          </>
                        ) : (
                          <span>{currency_symbol + Products.price}</span>
                        )}
                      </div>
                      <div className="pro-details-list text-justify">
                        <p>{ReactHtmlParser(Products.detail)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
