import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import * as MyConstants from "../../AdminPanel/Constant/Config";

// Styling
const CustomStyle = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
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
}));

const BillingAddressForm = ({ ActiveStep, GetSteps, HandleNext }) => {
  //   StylingClasses
  const StylingClasses = CustomStyle();
  const LastStepLength = GetSteps.length - 1;

  const FormData = JSON.parse(localStorage.getItem("multistep_form_data"));

  const [PreviousAddressData, setPreviousAddressData] = useState([]);
  const classes = CustomStyle();

  // FORM STATES
  const [FirstName, setFirstName] = useState(
    FormData !== null ? FormData.first_name : ""
  );
  const [LastName, setLastName] = useState(
    FormData !== null ? FormData.last_name : ""
  );
  const [EmailAddress, setEmailAddress] = useState(
    FormData !== null ? FormData.email_address : ""
  );
  const [ContactNo, setContactNo] = useState(
    FormData !== null ? FormData.contact_no : ""
  );
  const [City, setCity] = useState(FormData !== null ? FormData.city : "");
  const [DeliveryAddress, setDeliveryAddress] = useState(
    FormData !== null ? FormData.delivery_address : ""
  );
  // const [Location, setLocation] = useState(
  //   FormData !== null ? FormData.location : ""
  // );
  const [open, setOpen] = useState(false);

  // ErrorStates
  const [first_name_error, setFirstNameError] = useState("");
  const [last_name_error, setLastNameError] = useState("");
  const [email_address_error, setEmailAddressError] = useState("");
  const [contact_no_error, setContactNoError] = useState("");
  const [city_error, setCityError] = useState("");
  const [delivery_address_error, setDeliveryAddressError] = useState("");
  // const [location_error, setLocationError] = useState("");

  // isValidName
  const isValidName = /^[a-zA-Z_ ]+$/;

  // isValidEmail
  // const isValidEmail =  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const isValidEmail =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  // SUBMIT FORM
  const SubmitForm = () => {
    if (
      FirstName === "" ||
      LastName === "" ||
      EmailAddress === "" ||
      ContactNo === "" ||
      DeliveryAddress === "" ||
      City === "" ||
      // Location === "" ||
      !FirstName.match(isValidName) ||
      !LastName.match(isValidName) ||
      !EmailAddress.match(isValidEmail)
    ) {
      setFirstNameError([
        "First Name is required!",
        "Invalid first name it containes minimum 3 characters!",
        "Invalid first name it containes maximum 20 characters!",
        "Invalid first name only letters are allowed!",
      ]);
      setLastNameError([
        "Last Name is required!",
        "Invalid last name it containes minimum 3 characters!",
        "Invalid last name it containes maximum 20 characters!",
        "Invalid last name only letters are allowed!",
      ]);
      setEmailAddressError([
        "Email Address is required!",
        "Invalid email address! Only letters (a-z), numbers (0-9) and period (.) are allowed!",
      ]);
      setContactNoError(["Phone No is required!"]);
      setCityError("City is required!");
      setDeliveryAddressError("Delivery Address is required!");
      // setLocationError("Location is required!");
    } else {
      let billing_address_data = {
        first_name: FirstName,
        last_name: LastName,
        email_address: EmailAddress,
        contact_no: ContactNo,
        city: City,
        delivery_address: DeliveryAddress,
      };

      localStorage.setItem(
        "multistep_form_data",
        JSON.stringify(billing_address_data)
      );

      if (!EmailAddress.match(isValidEmail)) {
        setEmailAddressError([
          "Email Address is required!",
          "Invalid email address! Only letters (a-z), numbers (0-9) and period (.) are allowed!",
        ]);
      } else {
        HandleNext();
      }
    }
  };

  const Location = useLocation();

  let PreviousAddressID;
  if (Location.state) {
    PreviousAddressID = Location.state.previous_address_id;
  }

  console.log("PrevId ::", PreviousAddressID);

  const GetPreviousAddressDataById = () => {
    let data = {
      id: PreviousAddressID,
    };

    setOpen(true);
    fetch(MyConstants.getPrevAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          // setPreviousAddressData(response.prev_address[0]);
          setFirstName(response.prev_address[0].first_name);
          setLastName(response.prev_address[0].last_name);
          setEmailAddress(response.prev_address[0].email);
          setContactNo(response.prev_address[0].phone);
          setCity(response.prev_address[0].city);
          setDeliveryAddress(response.prev_address[0].delivery_address);
          setOpen(false);
        } else {
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    GetPreviousAddressDataById();
  }, []);

  console.log("PreviousAddressData ::", PreviousAddressData);
  return (
    <>
      <div className="container mt-5">
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="mb-20">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                className="BillingFormInput"
                placeholder="Enter Your First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={FirstName}
              />
              {FirstName === "" ? (
                <small className="text-danger">{first_name_error[0]}</small>
              ) : FirstName.length < 3 ? (
                <small className="text-danger">{first_name_error[1]}</small>
              ) : FirstName.length > 20 ? (
                <small className="text-danger">{first_name_error[2]}</small>
              ) : !FirstName.match(isValidName) ? (
                <small className="text-danger">{first_name_error[3]}</small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6  col-sm-12">
            <div className="mb-20">
              <label>Last Name</label>
              <input
                type="text"
                className="BillingFormInput"
                placeholder="Enter Your Last Name"
                name="last_name"
                onChange={(e) => setLastName(e.target.value)}
                value={LastName}
              />
              {LastName === "" ? (
                <small className="text-danger">{last_name_error[0]}</small>
              ) : LastName.length < 3 ? (
                <small className="text-danger">{last_name_error[1]}</small>
              ) : LastName.length > 20 ? (
                <small className="text-danger">{last_name_error[2]}</small>
              ) : !LastName.match(isValidName) ? (
                <small className="text-danger">{last_name_error[3]}</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="mb-20">
              <label>Email Address</label>
              <input
                type="email"
                className="BillingFormInput"
                placeholder="Enter Your Email Address"
                name="email_address"
                onChange={(e) => setEmailAddress(e.target.value)}
                value={EmailAddress}
              />
              {EmailAddress === "" ? (
                <small className="text-danger">{email_address_error[0]}</small>
              ) : !EmailAddress.match(isValidEmail) ? (
                <small className="text-danger">{email_address_error[1]}</small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6  col-sm-12">
            <div className="mb-20">
              <label>Phone Number</label>
              {/* <input
                type="number"
                className="BillingFormInput"
                id="ContactNo"
                placeholder="Enter Your Phone Number"
                name="contact_no"
                onChange={(e) => setContactNo(e.target.value)}
                value={ContactNo}
              /> */}
              <PhoneInput
                country={"eg"}
                enableSearch={true}
                className="BillingFormInput"
                placeholder="Enter Your Phone Number"
                name="contact_no"
                value={ContactNo}
                onChange={(e) => setContactNo(e)}
              />
              {ContactNo === "" ? (
                <small className="text-danger">{contact_no_error[0]}</small>
              ) : (
                ""
              )}
              {/* {ContactNo === "" ? (
                <small className="text-danger">{contact_no_error[0]}</small>
              ) : ContactNo.length > 11 ? (
                <small className="text-danger">{contact_no_error[1]}</small>
              ) : ContactNo.length < 11 ? (
                <small className="text-danger">{contact_no_error[2]}</small>
              ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="mb-20">
              <label>City</label>
              <input
                type="text"
                className="BillingFormInput"
                placeholder="Enter Your City"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                value={City}
              />
              {City === "" && (
                <small className="text-danger">{city_error}</small>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6  col-sm-12">
            <div className="mb-20">
              <label>Delivery Address</label>
              <input
                type="text"
                className="BillingFormInput"
                placeholder="Enter Your Delivery Address"
                name="address"
                onChange={(e) => setDeliveryAddress(e.target.value)}
                value={DeliveryAddress}
              />
              {DeliveryAddress === "" && (
                <small className="text-danger">{delivery_address_error}</small>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <Link to="/previous_address" className="PreviousAddressText ml-3">
            Previous Address
          </Link>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
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

export default BillingAddressForm;
