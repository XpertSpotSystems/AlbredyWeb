import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import swal from "sweetalert";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { Button, Spinner } from "react-bootstrap";

const ContactUs = ({ location }) => {
  const { pathname } = location;

  // States
  const [Name, setName] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  // ErrorStates
  const [NameError, setNameError] = useState("");
  const [ContactNoError, setContactNoError] = useState("");
  const [EmailAddressError, setEmailAddressError] = useState("");
  const [MessageError, setMessageError] = useState("");

  // isValidName
  const isValidName = /^[a-zA-Z_ ]+$/;

  // isValidEmail
  const isValidEmail =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;


  // RESET FORM DATA 
  const ResetFormData = () => {
    setName("");
    setContactNo("+20");
    setEmailAddress("");
    setMessage("");
    console.log(Name, ContactNo, EmailAddress, Message);
  }
  // AddData
  const SubmitForm = (event) => {
    setLoading(true);
    if (
      Name === "" ||
      ContactNo === "" ||
      EmailAddress === "" ||
      Message === "" ||
      !Name.match(isValidName) ||
      !EmailAddress.match(isValidEmail)
    ) {
      setLoading(false);
      setNameError([
        "Name is required!",
        "Invalid name it containes minimum 3 characters!",
        "Invalid name it containes maximum 20 characters!",
        "Invalid name only letters are allowed!",
      ]);
      setContactNoError(["Contact No is required!"]);
      setEmailAddressError([
        "Email Address is required!",
        "Invalid email address! Only letters (a-z), numbers (0-9) and period (.) are allowed!",
      ]);
      setMessageError("Message is required!");
    } else {
      let data = {
        name: Name,
        contact_no: ContactNo,
        email: EmailAddress,
        message: Message,
      };
      fetch(MyConstants.AddContactUs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            console.log("Response ===", response);
            setLoading(false);
            event.preventDefault(); // 👈️ prevent page refresh 
            swal({
              title: "Success!",
              text: "Thanks for contacting us. We will be in touch with you shortly.",
              icon: "success",
              button: "Ok",
            })
          }
        });
      }).finally(ResetFormData())    
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Contact Us</title>
        <meta
          name="description"
          content="Contact Us of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Contact Us
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="contact-form">
                  <div className="contact-title mb-30"></div>
                  <div className="contact-form-style">
                    <div className="row mt-3">
                      <div className="col-6">
                        <label>Name</label>
                        <input
                          name="name"
                          placeholder="Name"
                          className="mb-0"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={Name}
                        />
                        {Name === "" ? (
                          <small className="text-danger">{NameError[0]}</small>
                        ) : Name.length < 3 ? (
                          <small className="text-danger">{NameError[1]}</small>
                        ) : Name.length > 20 ? (
                          <small className="text-danger">{NameError[2]}</small>
                        ) : !Name.match(isValidName) ? (
                          <small className="text-danger">{NameError[3]}</small>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-lg-6">
                        <label>Contact Number</label>
                        <PhoneInput
                          country={"eg"}
                          enableSearch={true}
                          className="ContactInput"
                          style={{ marginBottom: "-30px" }}
                          name="contact_no"
                          onChange={(e) => setContactNo(e)}
                          value={ContactNo}
                        />
                        {console.log(ContactNo)}
                        {ContactNo === "" ? (
                          <small className="text-danger">
                            {ContactNoError[0]}
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 mt-3">
                        <label>Email Address</label>
                        <input
                          name="email"
                          placeholder="Email Address"
                          className="mb-0"
                          type="email"
                          onChange={(e) => setEmailAddress(e.target.value)}
                          value={EmailAddress}
                        />
                        {EmailAddress === "" ? (
                          <small className="text-danger">
                            {EmailAddressError[0]}
                          </small>
                        ) : !EmailAddress.match(isValidEmail) ? (
                          <small className="text-danger">
                            {EmailAddressError[1]}
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-lg-12 mt-3">
                        <>
                          <label>Message</label>
                          <textarea
                            name="message"
                            placeholder="Whats on your mind?"
                            className="mb-0"
                            style={{ resize: "none" }}
                            onChange={(e) => setMessage(e.target.value)}
                            value={Message}
                          />
                          {Message === "" ? (
                            <small className="text-danger">
                              {MessageError}
                            </small>
                          ) : (
                            ""
                          )}
                        </>
                        {/* <button
                          className="submit float-right"
                          type="submit"
                          onClick={SubmitForm}
                        > */}
                        <Button
                          type="submit"
                          variant="contained"
                          className="submit float-right"
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
                            <>Submit</>
                          )}
                        </Button>
                        {/* </button> */}
                      </div>
                    </div>
                  </div>
                  <p className="form-messege" />
                </div>
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
  );
};

ContactUs.propTypes = {
  location: PropTypes.object,
};

export default ContactUs;
