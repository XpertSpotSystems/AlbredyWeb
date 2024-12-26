import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import axios from 'axios'
import swal from "sweetalert";

export default function EditSellers() {
  const url = window.location.pathname;
  const split = url.split("/");
  console.log(split[2]);

  const [Users, setUsers] = useState([]);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
      id: split[2],
    };

    // EditSellers
    fetch(MyConstants.editUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          console.log("UsersData ===", response.user[0]);
          setUsers(response.user[0]);
        }
      });
    });
  }, []);

  const History = useHistory();
  const NavigateTo = () => History.push("/list-sellers");
  const NavigateToBack = () => History.goBack();

  const onInputEditValue = (e) => {
    setUsers({ ...Users, [e.target.name]: e.target.value });
  };

  // console.log('Change Value ===',Users);

  // UpdateData
  const UpdateData = () => {
    let data = {
      id: split[2],
      email: Email,
      token: Token,
      name: Users.name,
      up_email: Users.email,
      phone: Users.phone,
      gender: Users.gender,
      date_of_birth: Users.date_of_birth,
      address: Users.address,
    };

    console.log("Data ::", data);

    fetch(MyConstants.updateUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result
        .json()
        .then((response) => {
          if (response.status == true) {
            NavigateTo();
            swal({
              title: "Success!",
              text: "Users has been updated successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        })
        .catch((error) => {
          console.log("Error ::", error);
        });
    });
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
                                Edit Seller
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
                                <em className="icon ni ni-plus" />
                                <span>Sellers List</span>
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
                                    defaultValue={Users.name}
                                    onChange={onInputEditValue}
                                    required
                                  />
                                </div>
                                <div className="col-6">
                                  <label className="form-label">
                                    Email Address
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
                                    defaultValue={Users.email}
                                    placeholder="Enter Email Address"
                                    onChange={onInputEditValue}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label">Address</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    defaultValue={Users.address}
                                    placeholder="Enter Address"
                                    onChange={onInputEditValue}
                                    required
                                  />
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Phone</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    defaultValue={Users.phone}
                                    placeholder="Enter Phone Number"
                                    onChange={onInputEditValue}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label">Gender</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <select
                                    className="form-control custom-select"
                                    name="gender"
                                    onChange={onInputEditValue}
                                  >
                                    <option
                                      value={Users.id}
                                      selected={
                                        Users.gender === "Male"
                                          ? "selected"
                                          : ""
                                      }
                                    >
                                      Male
                                    </option>
                                    <option
                                      value={Users.id}
                                      selected={
                                        Users.gender === "Female"
                                          ? "selected"
                                          : ""
                                      }
                                    >
                                      Female
                                    </option>
                                  </select>
                                </div>
                                <div className="col-6">
                                  <label className="form-label">
                                    Date of Birth
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="date_of_birth"
                                    defaultValue={Users.date_of_birth}
                                    placeholder="Enter Date of Birth"
                                    onChange={onInputEditValue}
                                    required
                                  />
                                </div>
                              </div>

                              <hr />
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
                                  Update Seller
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
