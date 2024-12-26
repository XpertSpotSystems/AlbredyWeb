import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button, Spinner } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function EditSuppliers() {
  const History = useHistory();
  const NavigateTo = () => History.push("/list-suppliers");
  const NavigateToBack = () => History.goBack();

  const [EditSuppliers, setEditSuppliers] = useState([]);
  const [ContactNo, setContactNo] = useState(EditSuppliers.phone);
  const [Loading, setLoading] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const url = window.location.pathname;
  const split = url.split("/");

  const Location = useLocation();

  const SupplierID = Location.state.supplier_id;

  // isValidName
  const isValidName = /^[a-zA-Z_ ]+$/;

  // isValidEmail
  const isValidEmail =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
      supplier_id: SupplierID,
    };

    // EditProducts
    fetch(MyConstants.editSupplier, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setEditSuppliers(response.supplier);
        }
      });
    });
  }, []);

  const onInputEditValue = (e) => {
    console.log("value ::", e.target.value);
    setEditSuppliers({ ...EditSuppliers, [e.target.name]: e.target.value });
  };

  const onPhoneChange = (e) => {
    setEditSuppliers({ ...EditSuppliers, ["phone"]: e });
  };

  const UpdateData = () => {
    setLoading(true);
    if (
      EditSuppliers.name === "" ||
      EditSuppliers.company_name === "" ||
      EditSuppliers.email === "" ||
      EditSuppliers.phone === "" ||
      EditSuppliers.country === "" ||
      EditSuppliers.postal_code === "" ||
      !EditSuppliers.email.match(isValidEmail) ||
      !EditSuppliers.name.match(isValidName)
    ) {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      let data = {
        supplier_id: SupplierID,
        name: EditSuppliers.name,
        company_name: EditSuppliers.company_name,
        sup_email: EditSuppliers.email,
        phone: EditSuppliers.phone,
        country: EditSuppliers.country,
        postal_code: EditSuppliers.postal_code,
        email: Email,
        token: Token,
      };

      console.log("Data ::", data);

      fetch(MyConstants.updateSupplier, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            console.log("Response ::", response);
            NavigateTo();
            swal({
              title: "Success!",
              text: "Supplier has been updated successfully!",
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
                                Edit Suppliers
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
                                    defaultValue={EditSuppliers.name}
                                    onChange={onInputEditValue}
                                  />
                                  {EditSuppliers.name === "" ? (
                                    <small className="text-danger">
                                      Name is required!
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
                                    defaultValue={EditSuppliers.company_name}
                                    onChange={onInputEditValue}
                                  />
                                  {EditSuppliers.company_name === "" ? (
                                    <small className="text-danger">
                                      Company name is required!
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
                                    name="email"
                                    placeholder="Enter Email"
                                    defaultValue={EditSuppliers.email}
                                    onChange={onInputEditValue}
                                  />
                                  {EditSuppliers.email === "" ? (
                                    <small className="text-danger">
                                      Email is required!
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
                                  {/* <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    defaultValue={EditSuppliers.phone}
                                    onChange={onInputEditValue}
                                  /> */}
                                  <PhoneInput
                                    country={"eg"}
                                    enableSearch={true}
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    value={EditSuppliers.phone}
                                    onChange={(e) => onPhoneChange(e)}
                                  />
                                  {EditSuppliers.phone === "" ? (
                                    <small className="text-danger">
                                      Phone no is required!
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
                                    defaultValue={EditSuppliers.country}
                                    onChange={onInputEditValue}
                                  />
                                  {EditSuppliers.country === "" ? (
                                    <small className="text-danger">
                                      Country is required!
                                    </small>
                                  ) : (
                                    ""
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
                                    defaultValue={EditSuppliers.postal_code}
                                    onChange={onInputEditValue}
                                  />
                                  {EditSuppliers.postal_code === "" ? (
                                    <small className="text-danger">
                                      Postal code is required!
                                    </small>
                                  ) : (
                                    ""
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
                                    <>Update Supplier</>
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
