import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import * as MyConstants from "../../AdminPanel/Constant/Config";

const ShopSidebar = ({
  setAllProducts,
  setSelectedCategoryProducts,
  sideSpaceClass,
  setSearchInputValue,
  SelectedCategoryProducts,
  setProductTitle,
  Products,
}) => {
  // States
  const [Categories, setCategories] = useState([]);
  // const [CategoryId, setCategoryId] = useState("");
  const [CategoryProducts, setCategoryProducts] = useState([]);

  // let CategoryId;d

  // GetCategories
  const GetCategories = () => {
    fetch(MyConstants.FrontEndHomeData, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          setCategories(response.front_data.categories);
        }
      });
    });
  };

  // GetCategoryProducts
  const GetCategoryProducts = () => {
    fetch(MyConstants.listProductFront, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          setCategoryProducts(response.products);
        }
      });
    });
  };

  // GetProductsData
  const GetProductsData = () => {
    setSelectedCategoryProducts(0);
    setProductTitle('Shop');
  };

  useEffect(() => {
    GetCategories();
    GetCategoryProducts();
  }, []);

  const CategoryProductsData = (id) => {
    setSelectedCategoryProducts(id);
    for (let index = 0; index < CategoryProducts.length; index++) {
      if (id === CategoryProducts[index]["category"]) {
        const element = CategoryProducts[index]["ctgname"];
        setProductTitle(element  + " Food Products");
      }
    }
  };

  // console.log("CategoryName ::", CategoryName);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      <div className="sidebar-widget">
        {/* Search */}
        <h4 className="pro-sidebar-title">Search </h4>
        <div className="pro-sidebar-search mb-50 mt-25">
          <form className="pro-sidebar-search-form" action="#">
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <button type="button">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>

        {/* Categories */}
        <h4 className="pro-sidebar-title">Categories </h4>
        <div className="sidebar-widget-list mt-30">
          {Categories ? (
            <ul>
              <li>
                <div className="sidebar-widget-list-left">
                  <button
                    onClick={GetProductsData}
                    className={SelectedCategoryProducts === 0 ? "active" : ""}
                  >
                    <span className="checkmark" /> All Categories
                  </button>
                </div>
              </li>
              {Categories.map((item, key) => {
                const category = item.name;
                // setCategoryId(item.id);
                // CategoryId = item.id;
                return (
                  <li key={key}>
                    <div className="sidebar-widget-list-left">
                      <button
                        onClick={() => CategoryProductsData(item.id)}
                        className={
                          SelectedCategoryProducts == item.id ? "active" : ""
                        }
                      >
                        <span className="checkmark" /> {category}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            "No categories found"
          )}
        </div>
      </div>
    </div>
  );
};

ShopSidebar.propTypes = {
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
