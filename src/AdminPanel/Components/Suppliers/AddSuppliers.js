import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button,Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import swal from "sweetalert";

export default function AddSuppliers() {
  const History = useHistory();
  const NavigateTo = () => History.push("/list-suppliers");
  const NavigateToBack = () => History.goBack();

  // states
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [Loading, setLoading] = useState(false);

  // ErrorStates
  const [name_error, setNameError] = useState("");
  const [company_error, setCompanyError] = useState("");
  const [email_error, setEmailError] = useState("");
  const [phone_error, setPhoneError] = useState("");
  const [country_error, setCountryError] = useState("");
  const [postal_code_error, setPostalCodeError] = useState("");

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // isValidName
  const isValidName = /^[a-zA-Z_ ]+$/;

  const isValidEmail =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  // AddSupplier
  const AddSupplier = (e) => {
    setLoading(true);
    if (
      name === "" ||
      company === "" ||
      email === "" ||
      phone === "" ||
      country === "" ||
      postal_code === "" ||
      !name.match(isValidName) ||
      !email.match(isValidEmail)
    ) {
      setLoading(false);
      setNameError([
        "Name is required!",
        "Invalid name it containes minimum 3 characters!",
        "Invalid name it containes maximum 20 characters!",
        "Invalid name only letters are allowed!",
      ]);
      setCompanyError("Supplier company is required!");
      setEmailError([
        "Email is required!",
        "Invalid email! Only letters (a-z), numbers (0-9) and period (.) are allowed!",
      ]);
      setPhoneError("Phone No is required!");
      setCountryError("Country is required!");
      setPostalCodeError("Postal code is required!");
    } else {
      let data = {
        name: name,
        company_name: company,
        sup_email: email,
        phone: phone,
        country: country,
        postal_code: postal_code,
        email: Email,
        token: Token,
      };

      console.log("data ::", data);

      fetch(MyConstants.addSupplier, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            History.push("/list-suppliers");
            swal({
              title: "Success!",
              text: "New supplier has been addedd successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        });
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
                                Add Suppliers
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
                                onClick={NavigateTo}
                              >
                                <em className="icon ni ni-list" />
                                <span>Suppliers List</span>
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
                                  <label className="form-label">Name</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Name"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                  {name === "" ? (
                                    <small className="text-danger">
                                      {name_error[0]}
                                    </small>
                                  ) : name.length < 3 ? (
                                    <small className="text-danger">
                                      {name_error[1]}
                                    </small>
                                  ) : name.length > 20 ? (
                                    <small className="text-danger">
                                      {name_error[2]}
                                    </small>
                                  ) : !name.match(isValidName) ? (
                                    <small className="text-danger">
                                      {name_error[3]}
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Company</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="company_name"
                                    placeholder="Enter  Company"
                                    onChange={(e) => setCompany(e.target.value)}
                                  />
                                  {company === "" ? (
                                    <small className="text-danger">
                                      {company_error}
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label">
                                    Email
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="sup_email"
                                    placeholder="Enter Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  {email === "" ? (
                                    <small className="text-danger">
                                      {email_error[0]}
                                    </small>
                                  ) : !email.match(isValidEmail) ? (
                                    <small className="text-danger">
                                      {email_error[1]}
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Phone</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <PhoneInput
                                    country={"eg"}
                                    enableSearch={true}
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    onChange={(e) => setPhone(e)}
                                  />
                                  {phone === "" ? (
                                    <small className="text-danger">
                                      {phone_error}
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label">Country</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    placeholder="Enter Country"
                                    onChange={(e) => setCountry(e.target.value)}
                                  />
                                  {country === "" && (
                                    <small className="text-danger">
                                      {country_error}
                                    </small>
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label">
                                    Postal Code
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="postal_code"
                                    placeholder="Enter Postal Code"
                                    onChange={(e) =>
                                      setPostalCode(e.target.value)
                                    }
                                  />
                                  {postal_code === "" && (
                                    <small className="text-danger">
                                      {postal_code_error}
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="modal-footer mt-3"></div>
                              <div className="form-group float-right">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger mr-2"
                                  onClick={NavigateToBack}
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
                                  onClick={AddSupplier}
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
                                    <>Add Supplier</>
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
