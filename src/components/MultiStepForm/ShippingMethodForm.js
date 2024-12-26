import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Form from "react-bootstrap/Form";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { connect } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart,
} from "../../redux/actions/cartActions";

// Styling
const CustomStyle = makeStyles({
  NextButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  BackButton: {
    background: "#DB002F",
    color: "#fff",
    marginRight: "3px",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

const ShippingMethodForm = ({
  ActiveStep,
  GetSteps,
  HandleNext,
  HandleBack,
  cartItems,
  decreaseQuantity,
  addToCart,
  location,
  deleteFromCart,
  deleteAllFromCart,
}) => {
  //   StylingClasses
  const StylingClasses = CustomStyle();
  const LastStepLength = GetSteps.length - 1;
  const BackStepLength = GetSteps.length > 1;

  // PreviousData
  const previous_data = JSON.parse(
    sessionStorage.getItem("multistep_form_data")
  );

  console.log("previous_data ===", previous_data);
  console.log("cartItems_cartItems_shipping_ ===", cartItems);

  const [Stores, setStores] = useState([]);

  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));
  let Token = "";
  let Email = "";

  if(LoginUser) {
    Token = LoginUser.token
    Email = LoginUser.email
  } else {
    console.log('User Not Login!!!')
  }

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
    };
    fetch(MyConstants.ListStores, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setStores(response.stores);
        }
      });
    });
  }, []);

  const current_date = new Date();
  let date = `${current_date.getDate()}/${
    current_date.getMonth() + 1
  }/${current_date.getFullYear()}`;

  console.log("date ===", date);

  // FORM STATES
  const [DeliveryHome, setDeliveryHome] = useState("");
  const [DeliveryDate, setDeliveryDate] = useState("");

  // checkedDeliveryHome
  const checkedDeliveryHome = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setDeliveryHome("yes");
    } else {
      setDeliveryHome("no");
    }
  };

  // SUBMIT FORM
  const SubmitForm = () => {
    if (DeliveryDate === "") {
      console.log("Error :: Please fill all fields!");
    } else {
      let shipping_method_data = {
        delivery_home: DeliveryHome,
        delivery_date: DeliveryDate,
      };

      console.log("shipping_method_data ===", shipping_method_data);

      console.log("shipping_method_data ===", shipping_method_data);

      sessionStorage.setItem(
        "multistep_form_data",
        JSON.stringify({ ...previous_data, shipping_method_data })
      );

      HandleNext();
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <Form.Text className="TitleShipping">Home Delivery</Form.Text>

            <div className="form-group mt-2">
              <div className="d-inline-flex">
                <div className="custom-radio-btn fw-500">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="delivery_home"
                    id="home_delivery"
                    onChange={checkedDeliveryHome}
                  />
                  <span className="checkmark"></span>
                </div>
                <label
                  className="form-check-label ml-2 fw-500"
                  htmlFor="home_delivery"
                >
                  Delivery to my address
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row mt-1">
          <div className="col">
            <Form.Text className="TitleShipping">Delivery Address</Form.Text>
            <Form.Group>
              <Form.Control
                type="text"
                name="delivery_address"
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              {DeliveryAddress === "" && (
                <small className="text-danger">
                  Delivery Address is required!
                </small>
              )}
            </Form.Group>
          </div>
        </div> */}

        <div className="row mt-1">
          <div className="col">
            <Form.Text className="TitleShipping ml-1 mb-1">
              Delivery Date
            </Form.Text>
            <Form.Group controlId="dob">
              <Form.Control
                type="date"
                className="DeliveryDate"
                name="delivery_date"
                min={date}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
              {DeliveryDate === "" && (
                <small className="text-danger">
                  Delivery Date is required!
                </small>
              )}
            </Form.Group>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        {console.log("Line 177 ::", BackStepLength)}
        {BackStepLength === true ? (
          <Button
            variant="contained"
            className={StylingClasses.BackButton}
            onClick={HandleBack}
          >
            Back
          </Button>
        ) : null}

        <Button
          variant="contained"
          className={StylingClasses.NextButton}
          onClick={SubmitForm}
        >
          {ActiveStep === LastStepLength ? "Place Order" : "Next"}
        </Button>
      </div>
    </>
  );
};

// export default ShippingMethodForm;

ShippingMethodForm.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMethodForm);
