import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function AddAccount() {
  // States
  const [Name, setName] = useState("");
  const [Type, setType] = useState("");
  const [OpeningBalance, setOpeningBalance] = useState("");
  const [Deefault, setDefaults] = useState("0");

  // Navigation
  const History = useHistory();
  const Navigate = () => History.push("/list-accounts");

  // checkedDefault
  const checkedDefault = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setDefaults("1");
    } else {
      setDefaults("0");
    }
  };

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // AddData
  const AddData = () => {

    if (Name === "" || Type === "" || OpeningBalance === "") {
      console.log("Error :: Please fill all fields!");
    } else {
      let data = {
        name: Name,
        type: Type,
        opening_balance: OpeningBalance,
        default: Deefault,
        email: Email,
        token: Token,
      };
      fetch(MyConstants.addAccount, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((result) => {
        result.json().then((response) => {
          console.warn(response);
          if (response.status == true) {
            console.log(response.status);
            History.push("/list-accounts");
            swal({
              title: "Success!",
              text: "New account has been addedd successfully!",
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
                                Add Account
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
                                onClick={Navigate}
                              >
                                <em className="icon ni ni-plus" />
                                <span>Accounts List</span>
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
                                    Name
                                  </label>
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
                                  {Name === "" && (
                                    <small className="text-danger">
                                      Name is required!
                                    </small>
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Type
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="type"
                                    placeholder="Enter Type"
                                    onChange={(e) => setType(e.target.value)}
                                  />
                                  {Type === "" && (
                                    <small className="text-danger">
                                      Type is required!
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Opening Balance
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="opening_balance"
                                    placeholder="Enter Opening Balance"
                                    onChange={(e) =>
                                      setOpeningBalance(e.target.value)
                                    }
                                  />
                                  {OpeningBalance === "" && (
                                    <small className="text-danger">
                                      Opening Balance is required!
                                    </small>
                                  )}
                                </div>
                                <div className="col-6">
                                  <div className="custom-control custom-checkbox mt-4">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="default"
                                      name="defaults"
                                      onChange={checkedDefault}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="default"
                                    >
                                      <h4>Default</h4>
                                    </label>
                                  </div>
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
                                  onClick={AddData}
                                >
                                  Add Account
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
