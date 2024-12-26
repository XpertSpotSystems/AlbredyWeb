import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button, Col, Spinner } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import PhoneInput from "react-phone-input-2";
import SimpleFormSkeleton from "../Skeletons/simpleFormSkeleton";

import "react-phone-input-2/lib/bootstrap.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function EditRider() {
  const Location = useLocation();

  const RiderID = Location.state.rider_id;

  console.log("RiderID :;", RiderID);

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
  const [EditRider, setEditRider] = useState([]);
  const [CountryError, setCountryError] = useState("");
  const [RiderStateError, setRiderStateError] = useState("");
  const [RiderCityError, setRiderCityError] = useState("");
  const [ImageError, setImageError] = useState("");
  const [AddressError, setAddressError] = useState("");

  console.log("EDIT RIDER ::::" + EditRider);

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

  //ON INPUT EDIT VALUE
  const onInputEditValue = (e) => {
    setEditRider({
      ...EditRider,
      [e.target.name]: e.target.value,
    });
  };

  //LOADER  BACKDROP SIDE EFFECT
  useEffect(() => {
    setInterval(() => {
      setOpen(false);
      setLoading(false);
    }, 2000);
  }, []);

  //SIDE EFFECTS FOR API REQUESTS
  useEffect(() => {
    if (LoginUser.role !== "admin") {
      History.push("/");
    }

    let data = {
      email: Email,
      token: Token,
      rider_id: RiderID,
    };

    fetch(MyConstants.editRider, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          console.log(response.rider[0]);
          setEditRider(response.rider[0]);
        }
      });
    });
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

  const UpdateData = () => {
    setLoading(true);
    if (
      EditRider.name === "" ||
      EditRider.email === "" ||
      EditRider.phone === "" ||
      EditRider.password === "" ||
      EditRider.country === "" ||
      // RiderState === "" ||
      // Address === "" ||
      // Image === "" ||
      !EditRider.name.match(isValidName) ||
      !EditRider.email.match(isValidEmail)
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
      const formData = new FormData();
      formData.append("rider_id", RiderID);
      formData.append("address", Address);
      formData.append("name", EditRider.name);
      formData.append("r_email", EditRider.email);
      formData.append("phone", RiderPhone);
      // formData.append("password", EditRider.password);
      formData.append("country", EditRider.country);
      formData.append("state", EditRider.state);
      formData.append("image", Image);
      formData.append("city", EditRider.city);
      formData.append("email", Email);
      formData.append("token", Token);

      // API CALL

      axios.post(MyConstants.updateRider, formData).then((result) => {
        if (result.data.status == true) {
          console.log(result.data.message);
          console.log(result.data);
          setLoading(false);
          History.push("/list-riders");
          swal({
            title: "Success!",
            text: "Rider has been updated successfully!",
            icon: "success",
            button: "Ok",
          });
        } else {
          console.log("Error ::", result.data.message);
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
                                  Edit Rider
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
                                      defaultValue={EditRider.name}
                                      onChange={onInputEditValue}
                                    />
                                    {EditRider.name === "" ? (
                                      <small className="text-danger">
                                        {NameError[0]}
                                      </small>
                                    ) : EditRider.length < 3 ? (
                                      <small className="text-danger">
                                        {NameError[1]}
                                      </small>
                                    ) : EditRider.length > 20 ? (
                                      <small className="text-danger">
                                        {NameError[2]}
                                      </small>
                                    ) : !EditRider.name.match(isValidName) ? (
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
                                      name="email"
                                      placeholder="Enter Rider Email"
                                      defaultValue={EditRider.email}
                                      onChange={onInputEditValue}
                                      disabled={true}
                                    />
                                    {EditRider.email === "" ? (
                                      <small className="text-danger">
                                        Email is required!
                                      </small>
                                    ) : EditRider.email < 0 ? (
                                      <small className="text-danger">
                                        Rider Email is invalid
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
                                    <PhoneInput
                                      country={"eg"}
                                      enableSearch={true}
                                      className="ContactInput"
                                      style={{ marginBottom: "-30px" }}
                                      value={EditRider.phone}
                                      name="phone"
                                      disabled={true}
                                      onChange={(e) => {
                                        setRiderPhone(e);
                                        console.log(RiderPhone);
                                      }}
                                    />
                                    {EditRider.phone === "" && (
                                      <small className="text-danger">
                                        {PhoneError}
                                      </small>
                                    )}
                                  </div>
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
                                      defaultValue={EditRider.country}
                                      onChange={onInputEditValue}
                                    />
                                  </div>
                                </div>
                                <div className="row mt-3">
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
                                      defaultValue={EditRider.state}
                                      onChange={onInputEditValue}
                                    />
                                  </div>
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
                                      defaultValue={EditRider.city}
                                      onChange={onInputEditValue}
                                    />
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
                                          onChange={ChangeImage}
                                        />
                                        <label
                                          className="custom-file-label"
                                          htmlFor="customFile"
                                        >
                                          {Image === ""
                                            ? EditRider.image
                                            : Image.name}
                                        </label>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col md="2" sm="12" className="mt-3 mt-md-0">
                                    <img
                                      src={
                                        SelectedImagePreview !== ""
                                          ? SelectedImagePreview
                                          : EditRider.image === null
                                          ? "sample.jpg"
                                          : MyConstants.ImageUrl +
                                            `${EditRider.image}`
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
                                      data={
                                        EditRider.address === null
                                          ? ""
                                          : EditRider.address
                                      }
                                      onChange={(e, editor) => {
                                        setAddress(editor.getData());
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="modal-footer mt-3"></div>
                                <div className="form-group float-right">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger mr-2"
                                    // onClick={History.goBack()}
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
                                    onClick={UpdateData}
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
                                      <>Update Rider</>
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
                <SimpleFormSkeleton />
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
}
