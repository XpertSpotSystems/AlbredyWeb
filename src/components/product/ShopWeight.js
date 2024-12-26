import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopWeight = ({ weights, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Weight </h4>
      <div className="sidebar-widget-list mt-20">
        {weights ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("weight", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Weights{" "}
                </button>
              </div>
            </li>
            {weights.map((weight, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className="text-uppercase"
                      onClick={e => {
                        getSortParams("weight", weight);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" />
                      {weight}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No weights found"
        )}
      </div>
    </div>
  );
};

ShopWeight.propTypes = {
  getSortParams: PropTypes.func,
  weights: PropTypes.array
};

export default ShopWeight;
