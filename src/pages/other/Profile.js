import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Col, Row, Form, Button, Card, Spinner } from "react-bootstrap";
import { FaCube } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { BiEdit } from "react-icons/bi";
import swal from "sweetalert";
import Login from "../Auth/Login";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
// import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CustomStyle = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
  SaveButton: {
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
  UpdateProfileCloseButton: {
    color: "#398E8B",
    fontSize: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: "#fff",
      background: "#398E8B",
      padding: "0",
      borderRadius: "30px",
    },
  },
}));

const Profile = ({ location }) => {
  const { pathname } = location;

  //   StylingClasses
  const StylingClasses = CustomStyle();

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const classes = CustomStyle();
  const [open, setOpen] = useState(false);

  const UserID = LoginUser.id;
  const token = LoginUser.token;

  // States
  const [EditUserProfile, setEditUserProfile] = useState([]);
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);
  // const [PhoneNumber, setPhoneNumber] = useState(EditUserProfile.phone);

  const onPhoneChange = (e) => {
    setEditUserProfile({ ...EditUserProfile, ["phone"]: e });
  };

  const GetUserProfileData = () => {
    let data = { id: UserID };
    setOpen(true);
    fetch(MyConstants.getUserProfile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          console.log("UsersData ===", response.user);
          setEditUserProfile(response.user);
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    GetUserProfileData();
  }, []);
  console.log("EditUserProfile ::", EditUserProfile);

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

  // onInputEditValue
  const onInputEditValue = (e) => {
    setEditUserProfile({ ...EditUserProfile, [e.target.name]: e.target.value });
  };

  // UpdateProfile Modal
  const [UpdateProfileModalShow, setUpdateProfileModalShow] = useState(false);

  const UpdateProfileModalClose = () => setUpdateProfileModalShow(false);
  const UpdateProfileModalOpen = () => setUpdateProfileModalShow(true);

  // Update Data
  const UpdateData = () => {
    setLoading(true);
    if (EditUserProfile.name === "" || EditUserProfile.phone === "") {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      const formData = new FormData();
      formData.append("id", EditUserProfile.id);
      formData.append("name", EditUserProfile.name);
      formData.append("phone", EditUserProfile.phone);
      formData.append("city", EditUserProfile.city);
      formData.append("country", EditUserProfile.country);
      formData.append("user_img", Image);
      axios
        .post(MyConstants.updateUserProfile, formData)
        .then((result) => {
          if (result.data.status === true) {
            setLoading(false);
            console.log("Response :::", result.data);
            console.log("UpdatedUser :::", result.data.updated_user);
            GetUserProfileData();

            UpdateProfileModalOpen();
            localStorage.setItem(
              "LOGIN_USER",
              JSON.stringify(result.data.updated_user)
            );
          }
        })
        .catch((error) => {
          console.log("Error ::", error);
        });
    }
  };

  return (
    <>
      <Fragment>
        <MetaTags>
          <title>Albredy || Profile</title>
          <meta
            name="description"
            content="Profile of flone react minimalist eCommerce template."
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
          Home
        </BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Profile
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="myaccount-area pb-80 pt-60">
            <div className="container">
              <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <div className="row">
                <div className="col">
                  <Card className="border-0 shadow-lg px-4 py-3">
                    {/* Image */}
                    <div className="row my-4">
                      <div className="col">
                        <div className="ImageWrapper">
                          <input
                            type="file"
                            className="ProfileImageSelection"
                            name="user_img"
                            onChange={ChangeImage}
                            accept="image/*"
                            capture
                          />
                          {EditUserProfile.image === null ? (
                            <img
                              src={
                                SelectedImagePreview !== ""
                                  ? SelectedImagePreview
                                  : process.env.PUBLIC_URL +
                                    "/assets/img/user_profile.png"
                                // "/assets/img/profile_avatar.png"
                              }
                              className="ProfileImage mx-auto d-block rounded-circle img-thumbnail p-1 BgGreen"
                              alt="Profile Image"
                            />
                          ) : (
                            <img
                              src={
                                SelectedImagePreview !== ""
                                  ? SelectedImagePreview
                                  : MyConstants.SecondImageUrl +
                                    `${EditUserProfile.image}`
                              }
                              className="ProfileImage mx-auto d-block rounded-circle img-thumbnail p-1 BgGreen"
                              alt="Profile Image"
                            />
                          )}
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/profile_image_camera.png"
                            }
                            className="ProfileImageCamera"
                            alt="Profile Image Camera"
                            height={30}
                          />
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="row mt-3">
                      {/* Email Address */}
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-20">
                          <label>Email Address</label>
                          <input
                            type="text"
                            className="BillingFormInput ReadOnly"
                            placeholder="Enter Your Email Address"
                            defaultValue={EditUserProfile.email}
                            readOnly
                          />
                        </div>
                      </div>
                      {/* Name */}
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-20">
                          <label>Name</label>
                          <input
                            type="text"
                            className="BillingFormInput"
                            placeholder="Enter Your Name"
                            name="name"
                            defaultValue={EditUserProfile.name}
                            onChange={onInputEditValue}
                          />
                          {EditUserProfile.name === "" ? (
                            <small className="text-danger">
                              Name is required!
                            </small>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      {/* Phone Number */}
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-20">
                          <label>Phone Number</label>
                          <PhoneInput
                            country={"eg"}
                            enableSearch={true}
                            className="BillingFormInput ProfileContact"
                            placeholder="Enter Your Phone Number"
                            value={EditUserProfile.phone}
                            onChange={(e) => onPhoneChange(e)}
                          />
                          {EditUserProfile.phone === "" ? (
                            <small className="text-danger">
                              Phone No is required!
                            </small>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {/* City */}
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-20">
                          <label>
                            City{" "}
                            <small className="ml-1 text-muted">
                              (Optional)
                            </small>
                          </label>
                          <input
                            type="text"
                            className="BillingFormInput"
                            placeholder="Enter Your City"
                            name="city"
                            defaultValue={EditUserProfile.city}
                            onChange={onInputEditValue}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      {/* Country */}
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-20">
                          <label>
                            Country{" "}
                            <small className="ml-1 text-muted">
                              (Optional)
                            </small>
                          </label>
                          <input
                            type="text"
                            className="BillingFormInput"
                            placeholder="Enter Your Country"
                            name="country"
                            defaultValue={EditUserProfile.country}
                            onChange={onInputEditValue}
                          />
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="contained"
                        className={StylingClasses.SaveButton}
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
                          <>Save Changes</>
                        )}
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* EMAIL LATER */}
          {/* <div className="EmailSubscribe">
          <div className="container">
            <Row>
              <Col md={7} sm={12}>
                <FaCube className="mr-2 Emailicon float-left" />
                <h2 className="EmailHeading">Be the first to know</h2>
                <h5 className="ml-5">
                  Get all the latest information on Events, Sales and Offers.
                </h5>
              </Col>
              <Col className="col-md-5">
                <div className="d-inline-flex justify-content-end">
                  <Form.Control
                    placeholder="Enter Your Email Address"
                    className="EmailInput"
                  />
                  <Button variant="outline-secondary" className="Button">
                    Subscribe
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
        </LayoutOne>
      </Fragment>
      {/* UpdateProfileModal */}
      {UpdateProfileModalShow === true ? (
        <Modal
          className="fade zoom update_profile_modal"
          show={UpdateProfileModalOpen}
          onHide={UpdateProfileModalClose}
          backdrop="static"
          centered
        >
          <Modal.Header className="border-0 m-0 p-0 pt-3 pr-3 justify-content-end">
            <AiOutlineCloseCircle
              onClick={UpdateProfileModalClose}
              className={StylingClasses.UpdateProfileCloseButton}
            />
          </Modal.Header>
          <Modal.Body className="text-center px-5 pb-5">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/check.png"}
              className="img-fluid UpdateProfileCheckImage"
            />
            <p className="UpdateProfileModalHeading">
              Profile Update Successfuly.
            </p>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

Profile.propTypes = {
  location: PropTypes.object,
};

export default Profile;
