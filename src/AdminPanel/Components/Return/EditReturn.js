import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function EditReturn() {
  // Path
  const url = window.location.pathname;
  const split = url.split("/");

  // Navigation
  const History = useHistory();
  const NavigateTo = () => History.push("/list-return");

  // States
  const [EditReturns, setEditReturns] = useState([]);

  // login User Data
  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));
  const Email = LoginUser.email;
  const Token = LoginUser.token;

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
      return_id: split[2],
    };

    // EditReturn
    fetch(MyConstants.editReturn, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          console.warn(response);
          setEditReturns(response.return);
        }
      });
    });
  }, []);
  const onInputEditValue = (e) => {
    console.log("value ::", e.target.value);
    setEditReturns({ ...EditReturns, [e.target.name]: e.target.value });
  };

  // UpdateData
  const UpdateData = () => {
    if (
      EditReturns.date === "" ||
      EditReturns.reference_no === "" ||
      EditReturns.customer_name === ""
    ) {
      console.log("Error :: Please fill all fields!");
    } else {
      let data = {
        return_id: split[2],
        date: EditReturns.date,
        reference_no: EditReturns.reference_no,
        customer_name: EditReturns.customer_name,
        email: Email,
        token: Token,
      };

      console.log("Data ::", data);

      fetch(MyConstants.updateReturn, {
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
              text: "Return has been updated successfully!",
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
                                Edit Return
                              </h3>
                            </div>
                            {/* .nk-block-head-content */}
                            <div className="nk-block-head-content">
                              <Link
                                to="/list-return"
                                className="btn btn-primary btn-sm d-none d-md-inline-flex"
                                style={{
                                  backgroundColor: "#398E8B",
                                  border: "#398E8B",
                                  outline: "none",
                                  boxShadow: "none",
                                }}
                              >
                                <em className="icon ni ni-plus" />
                                <span>Return List</span>
                              </Link>
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
                                    Date
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    placeholder="Enter Date"
                                    defaultValue={EditReturns.date}
                                    onChange={onInputEditValue}
                                  />
                                  {EditReturns.date === "" && (
                                    <small className="text-danger">
                                      Date is required!
                                    </small>
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Reference No
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="reference_no"
                                    placeholder="Enter Reference No"
                                    defaultValue={EditReturns.reference_no}
                                    onChange={onInputEditValue}
                                  />

                                  {EditReturns.reference_no === "" && (
                                    <small className="text-danger">
                                      Reference No is required!
                                    </small>
                                  )}
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Customer Name
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="customer_name"
                                    placeholder="Enter Customer Name"
                                    defaultValue={EditReturns.customer_name}
                                    onChange={onInputEditValue}
                                  />
                                  {EditReturns.customer_name === "" && (
                                    <small className="text-danger">
                                      Customer Name is required!
                                    </small>
                                  )}
                                </div>
                              </div>

                              <hr />
                              <div className="form-group float-right">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger mr-2"
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
                                  Update Return
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
