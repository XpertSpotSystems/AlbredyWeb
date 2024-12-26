import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button, Col, Spinner, Row, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
// import PhoneInput from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import FormSkeleton from "../Skeletons/formSkeleton";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const AddRider = () => {
  // States
  const [Name, setName] = useState("");
  const [RiderEmail, setRiderEmail] = useState("");
  const [RiderPhone, setRiderPhone] = useState("");
  const [RiderPassword, setRiderPassword] = useState("");
  const [RiderCountry, setRiderCountry] = useState("");
  const [RiderState, setRiderState] = useState("");
  const [RiderCity, setRiderCity] = useState("");
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [Address, setAddress] = useState("");
  const [Loading, setLoading] = useState(true);

  //Backdrop States
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  // Error States
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PhoneError, setPhoneError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [CountryError, setCountryError] = useState("");
  const [RiderStateError, setRiderStateError] = useState("");
  const [RiderCityError, setRiderCityError] = useState("");
  const [ImageError, setImageError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // ChangeImage
  const ChangeImage = (e) => {
    e.preventDefault();
    let Reader = new FileReader();
    let FileNameAtZeroIndex = e.target.files[0];

    Reader.onloadend = () => {
      setImage(FileNameAtZeroIndex);
      setSelectedImagePreview(Reader.result);
    };

    Reader.readAsDataURL(FileNameAtZeroIndex);
  };

  //LOADER  BACKDROP SIDE EFFECT
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 2000);
  }, []);

  //SIDE EFFECTS FOR API REQUESTS
  useEffect(() => {
    //TODO Setting Country for Test
    setRiderCountry("Pakistan");

    if (LoginUser.role !== "admin") {
      History.push("/");
    }

    let data = {
      email: Email,
      token: Token,
    };
  }, []);

  const History = useHistory();
  const Navigate = () => History.push("/list-riders");

  // isValidName
  const isValidName = /^[a-zA-Z_ ]+$/;

  // isValidEmail
  const isValidEmail =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  // isValidPassword
  const isValidPassword =
    // /((?=.*\d)(?=.*[A-Z]).{8,15})/
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,15}$/;

  // isPhoneValid
  const isPhoneValid = (e) => {
    const isNum = isPhoneValid(e);
    console.log("isNum ::", isNum);
    // if (isNum) {
    //     setPhoneError('Invalid Phone Number')
    // } else {
    //   setPhoneError("")
    // }
  };

  // AddData
  const SubmitForm = () => {
    setLoading(true);
    if (
      Name === "" ||
      RiderEmail === "" ||
      RiderPhone === "" ||
      RiderPassword === "" ||
      RiderCountry === "" ||
      !Name.match(isValidName) ||
      !RiderEmail.match(isValidEmail) ||
      !RiderPassword.match(isValidPassword)
    ) {
      setLoading(false);
      window.scrollTo(0, 0);
      setNameError([
        "Rider Name is required!",
        "Invalid rider name it containes minimum 3 characters!",
        "Invalid rider name it containes maximum 20 characters!",
        "Invalid rider name only letters are allowed!",
      ]);
      setEmailError([
        "Rider Email is required!",
        "Invalid rider email! Only letters (a-z), numbers (0-9) and period (.) are allowed!",
      ]);
      setPhoneError("Rider Phone is required!");
      setPasswordError([
        "Rider Password is required!",
        "Rider Password must contain at least one uppercase, lowercase, a number or a special character,  minimum 8 characters and maximum 15 charecters",
      ]);
      setCountryError("Rider Country is required!");
      setRiderStateError("Rider State is required!");
      setRiderCityError("Rider City is required!");
      setAddressError("Rider Address is required!");
      setImageError([
        "Rider Image is required!",
        "File is too Large, please select a file less than 10mb!",
        " File is too Small, please select a file greater than 2mb!",
        "Select valid image format as jpeg, jpg, jfif, png or webp!",
      ]);
    } else {
      console.log("Submit Data!!!");
      const formData = new FormData();
      formData.append("address", Address);
      formData.append("name", Name);
      formData.append("r_email", RiderEmail);
      formData.append("phone", RiderPhone);
      formData.append("password", RiderPassword);
      formData.append("country", RiderCountry);
      formData.append("state", RiderState);
      formData.append("image", Image);
      formData.append("city", RiderCity);
      formData.append("email", Email);
      formData.append("token", Token);

      axios.post(MyConstants.addRider, formData).then((result) => {
        if (result.data.status == true) {
          console.log(result.data.message);
          console.log(result.data);
          setLoading(false);
          History.push("/list-riders");
          swal({
            title: "Success!",
            text: "New rider has been added successfully!",
            icon: "success",
            button: "Ok",
          });
        } else {
          console.log("Error ::", result.data.message);
          setLoading(false);
          window.scrollTo(0, 0);
          setError(true);
          setErrorMessage(result.data.message);
        }
      });
    }
  };
  return (
    <div>
      <div>
        <div className="nk-app-root">
          {/* main @s */}
          <div className="nk-main ">
            {/* sidebar @s */}
            <div
              className="nk-sidebar nk-sidebar-fixed is-light "
              data-content="sidebarMenu"
            >
              <Sidebar />
            </div>
            {/* Sidebar @e */}
            {/* wrap @s */}
            <div className="nk-wrap ">
              {/* main header @s */}
              <div className="nk-header nk-header-fixed is-light">
                {/* Header */}
                <Header />
              </div>
              {/* main header @e */}

              {/* content @s */}
              {!open ? (
                <div className="nk-content ">
                  <div className="container-fluid">
                    <div className="nk-content-inner">
                      <div className="nk-content-body">
                        <div class="components-preview">
                          <div
                            className="nk-block-head nk-block-head-sm card p-4"
                            style={{
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                              outline: "none",
                              marginTop: "20px",
                            }}
                          >
                            <div className="nk-block-between">
                              <div className="nk-block-head-content">
                                <h3
                                  className="nk-block-title page-title"
                                  style={{ color: "#398E8B" }}
                                >
                                  Add Rider
                                </h3>
                              </div>
                              {/* .nk-block-head-content */}
                              <div className="nk-block-head-content">
                                <Button
                                  className="btn btn-primary btn-sm d-none d-md-inline-flex"
                                  style={{
                                    backgroundColor: "#398E8B",
                                    border: "#398E8B",
                                    outline: "none",
                                    boxShadow: "none",
                                  }}
                                  onClick={() => {
                                    Navigate();
                                  }}
                                >
                                  <em className="icon ni ni-list" />
                                  <span>Rider List</span>
                                </Button>
                              </div>
                              {/* .nk-block-head-content */}
                            </div>
                            {/* .nk-block-between */}
                          </div>
                          {/* .nk-block-head */}
                          <div className="nk-block nk-block-lg mt-5">
                            <div
                              className="card card-preview"
                              style={{
                                boxShadow:
                                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                outline: "none",
                                marginTop: "20px",
                              }}
                            >
                              <div className="card-inner">
                                {Error === true ? (
                                  <Row className="mt-3 mb-3 px-md-5 px-3">
                                    <Col>
                                      <Alert
                                        variant="danger"
                                        onClose={() => setError(false)}
                                        dismissible
                                        classname="border-0"
                                      >
                                        <p>
                                          <strong>Failed</strong>:{" "}
                                          {ErrorMessage}
                                        </p>
                                      </Alert>
                                    </Col>
                                  </Row>
                                ) : (
                                  ""
                                )}

                                <div className="row">
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Rider Name
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="name"
                                      placeholder="Enter Rider Name"
                                      onChange={(e) => setName(e.target.value)}
                                    />
                                    {Name === "" ? (
                                      <small className="text-danger">
                                        {NameError[0]}
                                      </small>
                                    ) : Name.length < 3 ? (
                                      <small className="text-danger">
                                        {NameError[1]}
                                      </small>
                                    ) : Name.length > 20 ? (
                                      <small className="text-danger">
                                        {NameError[2]}
                                      </small>
                                    ) : !Name.match(isValidName) ? (
                                      <small className="text-danger">
                                        {NameError[3]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Rider Email
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="r_email"
                                      placeholder="Enter Rider Email"
                                      onChange={(e) =>
                                        setRiderEmail(e.target.value)
                                      }
                                    />
                                    {RiderEmail === "" ? (
                                      <small className="text-danger">
                                        {EmailError[0]}
                                      </small>
                                    ) : !RiderEmail.match(isValidEmail) ? (
                                      <small className="text-danger">
                                        {EmailError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Rider Phone
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    {/* <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Enter Rider Number"
                                    onChange={(e) =>
                                      setRiderPhone(e.target.value)
                                    }
                                  /> */}
                                    <PhoneInput
                                      country={"eg"}
                                      enableSearch={true}
                                      className="ContactInput"
                                      style={{ marginBottom: "-30px" }}
                                      name="phone"
                                      // onChange={(e) => isPhoneValid(e)}
                                      onChange={(e) => setRiderPhone(e)}
                                      // isValid={isPhoneValid}
                                    />
                                    {RiderPhone === "" ? (
                                      <small className="text-danger">
                                        {PhoneError}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Rider Password
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="password"
                                      placeholder="Enter Rider Password"
                                      onChange={(e) =>
                                        setRiderPassword(e.target.value)
                                      }
                                    />
                                    {RiderPassword === "" ? (
                                      <small className="text-danger">
                                        {PasswordError[0]}
                                      </small>
                                    ) : !RiderPassword.match(
                                        isValidPassword
                                      ) ? (
                                      <small className="text-danger">
                                        {PasswordError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Rider Country
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="country"
                                      placeholder="Enter Rider Country"
                                      onChange={(e) =>
                                        setRiderCountry(e.target.value)
                                      }
                                    />
                                    {/* <select
                                    className="form-control custom-select"
                                    name="rider_country"
                                    onChange={(e) =>
                                      setRiderCountry(e.target.value)
                                    }
                                  >
                                    <option>Select Rider Country</option>

                                    RIDER COUNTRY OPTIONS 
                                    {RiderCountry.map((item) => (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select> */}
                                    {/* {RiderCountry === "" && (
                                    <small className="text-danger">
                                      {CountryError}
                                    </small>
                                  )} */}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Rider State
                                    </label>
                                    <small
                                      style={{
                                        color: "red",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (Optional)
                                    </small>

                                    <input
                                      type="text"
                                      className="form-control"
                                      name="state"
                                      placeholder="Enter Rider State"
                                      onChange={(e) =>
                                        setRiderState(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mt-3 row">
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Rider City
                                    </label>
                                    <small
                                      style={{
                                        color: "red",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (Optional)
                                    </small>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="city"
                                      placeholder="Enter Rider City"
                                      onChange={(e) =>
                                        setRiderCity(e.target.value)
                                      }
                                    />
                                    {/* <select
                                    className="form-control custom-select"
                                    name="rider_city"
                                    onChange={(e) =>
                                      setRiderCity(e.target.value)
                                    }
                                  >
                                    <option>Select City</option>
                                    {RiderCity.map((item) => (
                                      <option value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                  {RiderCity === "" && (
                                    <small className="text-danger">
                                      {RiderCityError}
                                    </small> 
                                  )} */}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <Col md="10" sm="12">
                                    <div className="form-group">
                                      <label
                                        className="form-label"
                                        htmlFor="name"
                                      >
                                        Rider Image
                                      </label>
                                      <small
                                        style={{
                                          color: "red",
                                          marginLeft: "4px",
                                        }}
                                      >
                                        (Optional)
                                      </small>

                                      <div className="custom-file">
                                        <input
                                          className="custom-file-input"
                                          type="file"
                                          accept="image/png, image/gif, image/jpeg"
                                          id="image"
                                          name="image"
                                          onChange={(e) => {
                                            ChangeImage(e);
                                          }}
                                        />
                                        <label
                                          className="custom-file-label"
                                          htmlFor="customFile"
                                        >
                                          {Image === ""
                                            ? "Choose Image..."
                                            : Image.name}
                                        </label>
                                      </div>
                                      {/* Image Validation  */}
                                      {/* {Image === "" ? (
                                      <small className="text-danger">
                                        {ImageError[0]}
                                      </small>
                                    ) : Image.size >= 10000 ? (
                                      <small className="text-danger">
                                        {ImageError[1]}
                                      </small>
                                    ) : Image.size <= 2000 ? (
                                      <small className="text-danger">
                                        {ImageError[2]}
                                      </small>
                                    ) : "image/jpeg" !== Image.type &&
                                      "image/jpg" !== Image.type &&
                                      "image/jfif" !== Image.type &&
                                      "image/webp" !== Image.type &&
                                      "image/png" !== Image.type ? (
                                      <small className="text-danger">
                                        {ImageError[3]}
                                      </small>
                                    ) : (
                                      ""
                                    )} */}
                                    </div>
                                  </Col>
                                  <Col md="2" sm="12" className="mt-3 mt-md-0">
                                    <img
                                      src={
                                        SelectedImagePreview !== ""
                                          ? SelectedImagePreview
                                          : "sample.jpg"
                                      }
                                      alt="Rider pfp"
                                      className="rounded-circle"
                                      height={80}
                                      width={80}
                                    />
                                  </Col>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-12">
                                    <label className="form-label" htmlFor="">
                                      Rider Address
                                    </label>
                                    <small
                                      style={{
                                        color: "red",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (Optional)
                                    </small>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      name="address"
                                      data={Address}
                                      onChange={(e, editor) => {
                                        setAddress(editor.getData());
                                      }}
                                    />
                                    {/* Address Validation  */}
                                    {/* {Address === "" && (
                                    <small className="text-danger">
                                      {AddressError}
                                    </small>
                                  )} */}
                                  </div>
                                </div>

                                <div className="modal-footer mt-3"></div>
                                <div className="form-group float-right">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger mr-2"
                                    // onClick={History.goBack(1)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn btn-sm btn-primary"
                                    style={{
                                      backgroundColor: "#398E8B",
                                      border: "#398E8B",
                                      outline: "none",
                                      boxShadow: "none",
                                    }}
                                    onClick={() => {
                                      SubmitForm();
                                    }}
                                  >
                                    {Loading ? (
                                      <>
                                        <Spinner
                                          animation="border"
                                          variant="light"
                                          size="sm"
                                          className="mr-2"
                                        />
                                        Loading...
                                      </>
                                    ) : (
                                      <>Add Rider</>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* .card-preview */}
                          </div>{" "}
                          {/* nk-block */}
                        </div>
                        {/* .components-preview */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <FormSkeleton />
              )}
              {/* content @e */}
              {/* Footer */}
              <div className="nk-footer">
                <Footer />
              </div>
              {/* footer @e */}
            </div>
            {/* wrap @e */}
          </div>
          {/* main @e */}
        </div>
        {/* nk-app-root */}
      </div>
    </div>
  );
};

export default AddRider;
