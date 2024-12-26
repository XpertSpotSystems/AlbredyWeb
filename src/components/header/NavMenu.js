import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { CatsDropdownItem as CatsDropdownItemArray } from "../../data/CatsDropdownItem";
import { DogsDropdownItem as DogsDropdownItemArray } from "../../data/DogsDropdownItem";
import { EquestriansDropdownItem as EquestriansDropdownItemArray } from "../../data/EquestriansDropdownItem";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const NavMenu = ({ menuWhiteClass, sidebarMenu, location }) => {
  // Path
  const url = window.location.pathname;
  const split = url.split("/");

  // DogsDropdownItem
  let DogsDropdownItem = [];
  for (let index = 0; index < DogsDropdownItemArray.length; index++) {
    DogsDropdownItem.push(DogsDropdownItemArray[index]);
  }

  // CatsDropdownItem
  let CatsDropdownItem = [];
  for (let index = 0; index < CatsDropdownItemArray.length; index++) {
    CatsDropdownItem.push(CatsDropdownItemArray[index]);
  }

  // EquestriansDropdownItem
  let EquestriansDropdownItem = [];
  for (let index = 0; index < EquestriansDropdownItemArray.length; index++) {
    EquestriansDropdownItem.push(EquestriansDropdownItemArray[index]);
  }

  // States
  const [Categories, setCategories] = useState([]);
  const [CategoryProducts, setCategoryProducts] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // GetCategories
  const GetCategories = () => {
    // setLoading(true)
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
            // setLoading(false)
          }
        });
      })
      .catch((error) => {
        console.log("Error ::", error);
      });
  };

  const History = useHistory();

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategoryproduct = () => {};

  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <nav>
        <ul>
          {/* Home */}
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Shop */}
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop"}>Shop</Link>
          </li>

          {/* Categories */}
          {/* <li>
            <Link to="#">
              Categories
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              {Categories.map((item) => (
                <li key={item.id}>
                  <Link to={"/category_product/" + item.id}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact_us"}>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default multilanguage(NavMenu);
