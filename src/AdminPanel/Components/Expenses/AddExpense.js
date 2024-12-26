import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button, Col, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import swal from "sweetalert";

export default function AddExpense() {
  // Navigation
  const History = useHistory();
  const NavigateTo = () => History.push("/list-expense");
  const NavigateToBackPage = () => History.goBack();

  // LoginUserData
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // States
  const [current_date, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [Title, setTitle] = useState("");
  const [Amount, setAmount] = useState("");
  const [Description, setDescription] = useState("");
  const [Loading, setLoading] = useState(false);

  // ErrorState
  const [DateError, setDateError] = useState("");
  const [TitleError, setTitleError] = useState("");
  const [AmountError, setAmountError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");

  // SubmitForm
  const SubmitForm = () => {
    setLoading(true);
    if (
      current_date === "" ||
      Title === "" ||
      Amount === "" ||
      Description === "" ||
      Amount < 0
    ) {
      setLoading(false);
      setDateError("Date is required!");
      setTitleError("Title is required!");
      setAmountError([
        "Amount is required!",
        "Amount is invalid! Only positive numbers are allowed",
      ]);
      setDescriptionError("Description is required!");
    } else {
      const formData = new FormData();
      formData.append("date", current_date);
      formData.append("title", Title);
      formData.append("amount", Amount);
      formData.append("description", Description);
      formData.append("email", Email);
      formData.append("token", Token);

      axios
        .post(MyConstants.addExpense, formData)
        .then((result) => {
          if (result.data.status == true) {
            setLoading(false);
            NavigateTo();
            swal({
              title: "Success!",
              text: "New expense has been addedd successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        })
        .catch((error) => {
          console.log("Error ::", error);
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
                                Add Expense
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
                                <span>Expense List</span>
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
                                  <label className="form-label">Date</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    defaultValue={current_date}
                                    onChange={(e) => setCurrentDate(e.target.value)}
                                  />
                                  {current_date === "" && (
                                    <small className="text-danger">
                                      {DateError}
                                    </small>
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label">Title</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Enter Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
                                  {TitleError === "" && (
                                    <small className="text-danger">
                                      {TitleError}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label">Amount</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    placeholder="Enter Amount"
                                    onChange={(e) => setAmount(e.target.value)}
                                  />
                                  {Amount === "" ? (
                                    <small className="text-danger">
                                      {AmountError[0]}
                                    </small>
                                  ) : Amount < 0 ? (
                                    <small className="text-danger">
                                      {AmountError[1]}
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <Col>
                                  <label className="form-label" htmlFor="name">
                                    Description
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    name="description"
                                    data={Description}
                                    onChange={(e, editor) => {
                                      setDescription(editor.getData());
                                    }}
                                  />
                                  {Description === "" && (
                                    <small className="text-danger">
                                      {DescriptionError}
                                    </small>
                                  )}
                                </Col>
                              </div>
                              <hr />
                              <div className="form-group float-right">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger mr-2"
                                  onClick={NavigateToBackPage}
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
                                    <>Add Expense</>
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
