import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button, Col, Spinner } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import swal from "sweetalert";

export default function EditExpense() {
  const Location = useLocation();

  const ExpenseID = Location.state.expense_id;

  console.log("ExpenseID ::", ExpenseID);

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
  const [EditExpense, setEditExpense] = useState([]);
  const [Description, setDescription] = useState("");
  const [Loading, setLoading] = useState(false);

  // onInputEditValue
  const onInputEditValue = (e) => {
    setEditExpense({ ...EditExpense, [e.target.name]: e.target.value });
  };

  // GetEditExpenseData
  const GetEditExpenseData = () => {
    let data = {
      email: Email,
      token: Token,
      expense_id: ExpenseID,
    };

    fetch(MyConstants.editExpense, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((result) => {
        if (result.status == true) {
          setEditExpense(result.expense);
        }
      });
    });
  };

  useEffect(() => {
    GetEditExpenseData();
  }, []);

  const UpdateData = () => {
    setLoading(true)
    if (
      EditExpense.date === "" ||
      EditExpense.title === "" ||
      EditExpense.amount === "" ||
      EditExpense.amount < 0 ||
      Description === ""
    ) {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      const formData = new FormData();
      formData.append("expense_id", ExpenseID);
      formData.append("date", EditExpense.date);
      formData.append("title", EditExpense.title);
      formData.append("amount", EditExpense.amount);
      formData.append("description", Description);
      formData.append("email", Email);
      formData.append("token", Token);

      axios
        .post(MyConstants.updateExpense, formData)
        .then((result) => {
          if (result.data.status == true) {
            setLoading(false)
            NavigateTo();
            swal({
              title: "Success!",
              text: "Expense has been updated successfully!",
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
                                Edit Expense
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
                                    defaultValue={EditExpense.date}
                                    onChange={onInputEditValue}
                                  />
                                  {EditExpense.date === "" ? (
                                    <small className="text-danger">
                                      Date is required!
                                    </small>
                                  ) : (
                                    ""
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
                                    defaultValue={EditExpense.title}
                                    onChange={onInputEditValue}
                                  />
                                  {EditExpense.title === "" ? (
                                    <small className="text-danger">
                                      Title is required!
                                    </small>
                                  ) : (
                                    ""
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
                                    defaultValue={EditExpense.amount}
                                    onChange={onInputEditValue}
                                  />
                                  {EditExpense.amount === "" ? (
                                    <small className="text-danger">
                                      Amount is required!
                                    </small>
                                  ) : EditExpense.amount < 0 ? (
                                    <small className="text-danger">
                                      Amount is invalid! Only positive numbers
                                      are allowed
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-12">
                                  <label className="form-label">Note</label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <CKEditor
                                      editor={ClassicEditor}
                                      name="description"
                                      data={EditExpense.description}
                                      onChange={(e, editor) => {
                                        setDescription(editor.getData());
                                      }}
                                    />
                                  {Description === "" ? (
                                    <small className="text-danger">
                                      Description is required!
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
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
                                  type="button"
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
                                    <>Update Expense</>
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
