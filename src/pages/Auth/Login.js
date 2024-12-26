import React, { useState, useEffect } from "react";
import { Col, Form, InputGroup, Row, Alert, Spinner } from "react-bootstrap";
import { Link, Redirect, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { BiEnvelope } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

// Styling
const CustomStyle = makeStyles({
  LoginButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    width: "80%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  ModalCloseButton: {
    background: "red",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },

  CloseButton: {
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

  HomeButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    borderRadius: "30px",
    width: "60%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
  CheckoutButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    borderRadius: "30px",
    marginLeft: "3px",
    width: "70%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

const Login = ({ cartItems }) => {
  // console.log('length ::', cartItems.length)
  const isAuthenticated = sessionStorage.getItem("LOGIN_USER");

  const Location = useLocation();

  const PreviousRoute = "";

  if (Location === true) {
    PreviousRoute = Location.state.previous_route;
    console.log("PreviousRoute ::", PreviousRoute);
  }

  const cart_local_data = JSON.parse(
    localStorage.getItem("redux_localstorage_simple")
  );

  // console.log("cart_local_data ::", cart_local_data.cartData);

  //   NAVIGATE
  const NAVIGATE = useHistory();
  const NavigateToDashboard = () => NAVIGATE.push("/dashboard");
  const NavigateToWebsite = () => NAVIGATE.push("/");
  const NavigateToCheckout = () => NAVIGATE.push("/checkout");

  if (isAuthenticated) {
    if (isAuthenticated.role === "user") {
      NavigateToWebsite();
    } else {
      NavigateToDashboard();
    }
  }

  //   StylingClasses
  const StylingClasses = CustomStyle();

  // States
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [json_message, setJsonMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isOnline, setOnline] = useState(true);
  const [alertShow, setAlertShow] = useState(false);
  const [isError, setIsError] = useState("");

  // Error States
  const [password_error, setPasswordError] = useState("");
  const [email_address_error, setEmailAddressError] = useState("");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  // NoInterNetModal
  const [NoInternetModal, setNoInternetModal] = useState(false);

  const NoInternetModalClose = () => setNoInternetModal(false);
  const NoInternetModalShow = () => setNoInternetModal(true);

  //  Modal
  const [ModalShow, setModalShow] = useState(false);
  const [CartItemData, setCartItemData] = useState([]);

  const ModalClose = () => setModalShow(false);
  const ModalOpen = () => setModalShow(true);

  const LinkModal = () => {
    if (cartItems.length > 0) {
      return setModalShow(true);
    } else {
      NavigateToWebsite();
    }
  };

  // isValidEmail
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // SubmitForm
  const SubmitForm = () => {
    // LinkModal()
    setLoading(true);
    if (isOnline) {
      if (email_address === "" || password === "") {
        setLoading(false);
        setEmailAddressError([
          "Email address is required!",
          "Invalid email address!",
        ]);
        setPasswordError("Password is required!");
      } else {
        const Parameters = new FormData();
        Parameters.append("email", email_address);
        Parameters.append("password", password);

        const API_URL = MyConstants.LoginUser;

        Axios({
          method: "POST",
          url: API_URL,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          data: Parameters,
        }).then(function (JsonResponse) {
          if (JsonResponse.data.status == true) {
            setLoading(false);
            console.log("Message ::", JsonResponse.data.message);
            console.log("JsonResponse ::", JsonResponse.data);

            localStorage.setItem(
              "LOGIN_USER",
              JSON.stringify(JsonResponse.data.AccountInfo)
            );

            localStorage.setItem(
              "LOGIN_TOKEN",
              JSON.stringify(JsonResponse.data.token)
            );

            if (JsonResponse.data.AccountInfo.role === "admin") {
              NavigateToDashboard();
            } else {
              LinkModal();
            }
          } else {
            setLoading(false);
            console.log("JsonError ::", JsonResponse.data.message);
            setAlertShow(true);
            setJsonMessage(JsonResponse.data.message);
            setIsError(true);
          }
        });
      }
    } else {
      setLoading(false);
      console.log("Offline ::", isOnline);
      return setNoInternetModal(true);
    }
  };

  return (
    <div>
      <div className="container shadow-lg AuthBg">
        <div className="row">
        <div className="offset-lg-1 col-lg-6 col-sm-12">
            <h3 className="text-center fw-500 pt-5">Sign In</h3>

            {alertShow === true ? (
              <Row className="mt-4 mb-2 px-md-5 px-3">
                <Col>
                  <Alert
                    variant="danger"
                    onClose={() => setAlertShow(false)}
                    dismissible
                    classname="border-0"
                  >
                    <strong>Error</strong>! {json_message}
                  </Alert>
                </Col>
              </Row>
            ) : (
              ""
            )}

            <div className="px-md-5 px-3 py-md-3 py-3">
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Email"
                    className="InputField"
                    name="email"
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <InputGroup.Text className="InputFieldGroup">
                    <BiEnvelope />
                  </InputGroup.Text>
                </InputGroup>
                {email_address === "" ? (
                  <small className="text-danger">
                    {email_address_error[0]}
                  </small>
                ) : !email_address.match(isValidEmail) ? (
                  <small className="text-danger">
                    {email_address_error[1]}
                  </small>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group>
                <InputGroup>
                  <Form.Control
                    type={passwordType}
                    placeholder="Enter Your Password"
                    className="InputField"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroup.Text
                    className="InputFieldGroup"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </InputGroup.Text>
                </InputGroup>
                {password === "" ? (
                  <small className="text-danger">{password_error}</small>
                ) : (
                  ""
                )}
              </Form.Group>

              {/* <Link to="/forgot_password" className="ForgotPassword">
                Forgot Password?
              </Link> */}

              <div className="d-flex justify-content-center ButtonView">
                <Button
                  type="button"
                  variant="contained"
                  className={StylingClasses.LoginButton}
                  onClick={SubmitForm}
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
                    <>Sign In</>
                  )}
                </Button>
              </div>
              <h6 className="text-muted mt-4 text-center">
                Don't have an account?
                <Link to="/register" className="ml-1">
                  Create an account
                </Link>
              </h6>
            </div>
          </div>
          <div className="offset-lg-1 col-lg-4 col-sm-12 p-0 d-none d-lg-block">
            <Link to="/">
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/img/auth_right_image.png"
                }
                alt="RightImage"
                className="float-right"
                style={{ height: "400px" }}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {ModalShow === true ? (
        <Modal
          className="fade zoom login_modal"
          show={ModalOpen}
          onHide={ModalClose}
          backdrop="static"
          centered
        >
          <Modal.Header className="border-0 m-0 p-0 pt-3 pr-3 justify-content-end">
            <AiOutlineCloseCircle
              onClick={ModalClose}
              className={StylingClasses.CloseButton}
            />
          </Modal.Header>
          <Modal.Body className="text-center p-5">
            <p className="ModalHeading">Your items are added on cart</p>
            <div className="mx-auto align-center mt-4">
              <Button
                variant="contained"
                onClick={NavigateToWebsite}
                className={StylingClasses.HomeButton}
              >
                Go To Home
              </Button>
              <Button
                variant="contained"
                className={StylingClasses.CheckoutButton}
                onClick={NavigateToCheckout}
              >
                Go To Checkout
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* NoInternetModal */}
      {NoInternetModal === true ? (
        <Modal
          className="fade zoom NoInternetModal"
          show={NoInternetModalShow}
          onHide={NoInternetModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>No Internet Conection</Modal.Title>
            <a href="#" className="close" onClick={NoInternetModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body className="px-3 py-2">
            <div className="bg-dark p-2" style={{ borderRadius: "5px" }}>
              <h4 className="text-light">
                Please check your internet conection!
              </h4>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              onClick={NoInternetModalClose}
              className={StylingClasses.ModalCloseButton}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Login);
