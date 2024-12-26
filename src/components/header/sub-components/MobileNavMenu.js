import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import * as MyConstants from "../../../AdminPanel/Constant/Config"


const MobileNavMenu = ({ strings }) => {
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


  return (
    <nav className="offcanvas-navigation text-center" id="offcanvas-navigation">
      <ul>
        {/* Home */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Shop */}
        <li className="mt-4">
          <Link to="/shop">Shop</Link>
        </li>

        {/* Contact Us */}
        <li className="mt-4">
          <Link to="/contact_us">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
