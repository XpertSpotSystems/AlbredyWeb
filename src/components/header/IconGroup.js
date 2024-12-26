import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  FiShoppingCart,
  FiUserPlus,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineFileText } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import { IoMdNotificationsOutline } from "react-icons/io";
import swal from "sweetalert";
import { deleteAllFromCart } from "../../redux/actions/cartActions";

const CustomStyle = makeStyles({
  SignOutButton: {
    background: "#398E8B",
    marginTop: "15px",
    color: "#fff",
    width: "50%",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  CancelButton: {
    color: "#fff",
    marginTop: "5px",
    width: "50%",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

const IconGroup = ({
  currency,
  cartData,
  deleteFromCart,
  iconWhiteClass,
  wishlistData,
  deleteAllFromCart,
  // general_setting
}) => {
  let general_setting = JSON.parse(localStorage.getItem("general_set"));
  const StylingClasses = CustomStyle();

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  // handleCartClick
  const handleCartClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("CartActive");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const Navigate = useHistory();

  const GoToLoginPage = () => Navigate.push("/login");

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  let Name = "";
  let Email = "";
  let Image = "";
  let user_id;

  if (LoginUser) {
    if (LoginUser.response) {
      Name = LoginUser.response.name;
      Email = LoginUser.response.email;
      Image = LoginUser.response.image;
      user_id = LoginUser.response.id;
    } else {
      Name = LoginUser.name;
      Email = LoginUser.email;
      Image = LoginUser.image;
      user_id = LoginUser.id;
    }
  }

  // Logout Modal
  const [LogOutModalShow, setLogOutModalShow] = useState(false);

  const LogOutModalClose = () => setLogOutModalShow(false);
  const LogOutModalOpen = () => setLogOutModalShow(true);

  // LogoutModal
  const LogoutModal = (e) => {
    return setLogOutModalShow(true);
  };

  // LogoutAccount
  const LogoutAccount = () => {
    if (LoginUser) {
      localStorage.removeItem("LOGIN_USER");
      deleteAllFromCart();
      localStorage.removeItem("multistep_form_data");
      return GoToLoginPage();
    }
  };

  let cart_user_id = null;

  cartData.map((cartItem) => {
    cart_user_id = cartItem.cart_user_id;
  });

  return (
    <>
      <div
        className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
      >
        <div className="same-style account-setting">
          {Image ? (
            <img
              src={MyConstants.SecondImageUrl + `${Image}`}
              alt="UserImage"
              className="UserImage rounded-circle"
              onClick={(e) => handleClick(e)}
              style={{ height: "35px", width: "35px", cursor: "pointer" }}
            />
          ) : (
            // <button
            //   className="account-setting-active"
            //   onClick={(e) => handleClick(e)}
            // >
            //   <FaUserCircle className="HeaderIcons" />
            // </button>
            <img
              src={process.env.PUBLIC_URL + "/assets/img/user_profile.png"}
              alt="UserImage"
              className="UserImage rounded-circle"
              onClick={(e) => handleClick(e)}
              style={{ height: "35px", width: "35px", cursor: "pointer" }}
            />
          )}
          <div className="account-dropdown">
            {LoginUser ? (
              <>
                <div className="UserDropdownHeader">
                  <Row>
                    <Col className="col-3 p-0">
                      {Image ? (
                        <img
                          src={MyConstants.SecondImageUrl + `${Image}`}
                          alt="UserImage"
                          className=" rounded-circle"
                          style={{ height: "50px", width: "50px" }}
                        />
                      ) : (
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/img/user_profile.png"
                          }
                          alt="UserImage"
                          className="UserImage"
                        />
                      )}
                    </Col>
                    <Col className="col-9 p-0 pl-2">
                      <h6 className="text-light mb-0 mt-2">{Name}</h6>
                      <p className="UserEmail p-0">{Email}</p>
                    </Col>
                  </Row>
                </div>
                <ul>
                  <li>
                    <Link
                      className="Hover"
                      to={process.env.PUBLIC_URL + "/profile"}
                    >
                      <FiUserPlus className="UserDropdownListIcon" />
                      <span className="UserDropdownListText">Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="Hover"
                      to={process.env.PUBLIC_URL + "/order_history"}
                    >
                      <AiOutlineFileText className="UserDropdownListIcon" />
                      <span className="UserDropdownListText">
                        Order history
                      </span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="Hover"
                      to={process.env.PUBLIC_URL + "/vouchers"}
                    >
                      <BsBook className="UserDropdownListIcon" />
                      <span className="UserDropdownListText">Vouchers</span>
                    </Link>
                  </li> */}

                  {/* <li>
                    <Link
                      className="Hover"
                      to={process.env.PUBLIC_URL + "/notification"}
                    >
                      <IoMdNotificationsOutline className="UserDropdownListIcon" />
                      <span className="UserDropdownListText">
                        Notifications
                      </span>
                    </Link>
                  </li> */}

                  <hr />

                  {/* <li>
                    <Link
                      className="Hover"
                      to={process.env.PUBLIC_URL + "/setting"}
                    >
                      <FiSettings className="UserDropdownListIcon" />
                      <span className="UserDropdownListText">Settings</span>
                    </Link>
                  </li> */}
                  <li>
                    <div
                      className="Hover"
                      style={{ cursor: "pointer" }}
                      onClick={LogoutModal}
                    >
                      <FiLogOut className="UserDropdownListIcon" />
                      <span className="UserDropdownListText">Sign Out</span>
                    </div>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul>
                  <li>
                    <Link
                      className="Hover"
                      to={process.env.PUBLIC_URL + "/register"}
                    >
                      <FiUserPlus className="UserDropdownListIcon" />
                      <span className="UserDropdownListText">Register</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="Hover"
                      to={process.env.PUBLIC_URL + "/login"}
                    >
                      <FiUserPlus className="UserDropdownListIcon" />
                      <span className="UserDropdownListText">Login</span>
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>

        {/* <div className="same-style header-search d-none d-lg-block">
          <button className="search-active" onClick={(e) => handleClick(e)}>
            <BsSearch className="HeaderIcons" />
          </button>
          <div className="search-content">
            <form action="#">
              <input type="text" placeholder="Search entire store here" />
              <button className="button-search">
                <BsSearch className="HeaderIcons text-light" />
              </button>
            </form>
          </div>
        </div> */}

        {/* <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <AiOutlineHeart className="HeaderIcons" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div> */}
        <div className="same-style cart-wrap d-none d-lg-block">
          <button className="icon-cart" onClick={(e) => handleCartClick(e)}>
            <FiShoppingCart className="HeaderIcons" />
            <span className="count-style">
              {cartData.length ? cartData.length : 0}
            </span>
          </button>
          {/* menu cart */}
          <MenuCart
            cartData={cartData}
            currency={currency}
            general_setting={general_setting}
            deleteFromCart={deleteFromCart}
          />
        </div>
        <div className="same-style cart-wrap d-block d-lg-none">
          <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
            <FiShoppingCart className="HeaderIcons" />
            <span className="count-style">
              {cartData && cartData.length ? cartData.length : 0}
            </span>
          </Link>
        </div>
        <div className="same-style mobile-off-canvas d-block d-lg-none">
          <button
            className="mobile-aside-button"
            onClick={() => triggerMobileMenu()}
          >
            <i className="pe-7s-menu" />
          </button>
        </div>
      </div>
      {/* LogOutModal */}
      {LogOutModalShow === true ? (
        <Modal
          className="fade zoom signout_modal"
          show={LogOutModalOpen}
          onHide={LogOutModalClose}
          backdrop="static"
          centered
        >
          <Modal.Body className="text-center px-5 py-4">
            <p className="SignoutModalHeading">
              Are you sure you want to Sign out?
            </p>
            <div className="d-flex flex-column mx-auto align-center">
              <Button
                variant="contained"
                onClick={LogoutAccount}
                className={StylingClasses.SignOutButton}
              >
                Sign Out
              </Button>
              <Button
                variant="contained"
                className={StylingClasses.CancelButton}
                onClick={LogOutModalClose}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
