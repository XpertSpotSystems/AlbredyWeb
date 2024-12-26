import React, { useEffect, useState } from "react";
import * as MyConstants from "../../AdminPanel/Constant/Config";

const ShopCategories = ({ setSelectedCategoryProducts }) => {
  // States
  const [CategoryProducts, setCategoryProducts] = useState([]);
  const [Categories, setCategories] = useState([]);

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

  // GetCategoryProductsData
  const GetCategoryProductsData = (id) => {
    let data = {
      category_id: id,
    };

    fetch(MyConstants.categoryProducts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setCategoryProducts(response.category_products);
          setSelectedCategoryProducts(response.category_products);
        }
      });
    });
  };

  console.log("CategoryProducts ::", CategoryProducts);

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {Categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button>
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {Categories.map((item, key) => {
              const category = item.name;
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button onClick={() => GetCategoryProductsData(item.id)}>
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
  );
};

export default ShopCategories;
