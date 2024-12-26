import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import CategorySkeleton from "../Skeletons/categorySkeleton";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function ListExpense() {
  // Get ListExpense Data
  const [ListExpense, setListExpense] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // GetExpenseData
  const GetExpenseData = () => {
    let data = {
      email: Email,
      token: Token,
    };

    setOpen(true);
    fetch(MyConstants.listExpense, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListExpense(response.expenses);
          setOpen(false);
        } else {
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    GetExpenseData();
  }, []);

  // Edit
  const History = useHistory();
  const NavigateTo = () => History.push("/add-expense");

  const NavigateToEditExpensePage = (id) => {
    History.push({
      pathname: "/edit-expense",

      state: {
        expense_id: id,
      },
    });
  };

  // Delete Data
  const DeleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      let data = {
        email: Email,
        token: Token,
        expense_id: id,
      };

      if (willDelete) {
        fetch(MyConstants.deleteExpense, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
            if (response.status == true) {
              swal("Your imaginary row has been deleted!", {
                icon: "success",
              });
              GetExpenseData();
            }
          });
        });
      } else {
        swal("Your imaginary row is safe!");
      }
    });
  };

  // Description
  const [DescriptionShow, setDescriptionShow] = useState(false);
  const [DescriptionModalData, setDescriptionModalData] = useState([]);

  const DescriptionModalClose = () => setDescriptionShow(false);
  const DescriptionModalShow = () => setDescriptionShow(true);

  const GetDescriptionData = (id, description) => {
    let DescriptionUsModalData = [id, description];
    console.log("DescriptionUsModalData ::", DescriptionUsModalData);
    setDescriptionModalData([...DescriptionUsModalData]);
    return setDescriptionShow(true);
  };

  return (
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
            {!open ? (
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
                                Expenses
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
                                <span>Add Expense</span>
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
                              <table className="table table-bordered table-hover table-striped table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>Sr#</th>
                                    <th>Date</th>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ListExpense.length >= 1 ? (
                                    ListExpense.map((item) => (
                                      <tr>
                                        <td>{item.id}</td>
                                        <td>{item.date}</td>
                                        <td>{item.title}</td>
                                        <td>{item.amount}</td>
                                        <td>
                                          <div className="d-inline-flex">
                                            <Button
                                              className="btn btn-info d-none  btn-sm d-md-inline-flex"
                                              style={{
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              onClick={() =>
                                                GetDescriptionData(
                                                  item.id,
                                                  item.description
                                                )
                                              }
                                            >
                                              <em className="icon ni ni-eye" />
                                              <span>View Description</span>
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                NavigateToEditExpensePage(
                                                  item.id
                                                )
                                              }
                                              className="btn btn-primary d-none ml-2 btn-sm d-md-inline-flex"
                                              style={{
                                                backgroundColor: "#398E8B",
                                                border: "#398E8B",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                            >
                                              <em className="icon ni ni-edit" />
                                              <span>Edit</span>
                                            </Button>
                                            <Button
                                              className="btn btn-danger btn-sm ml-2 d-md-inline-flex"
                                              onClick={() =>
                                                DeleteData(item.id)
                                              }
                                            >
                                              <em className="icon ni ni-trash" />
                                              <span>Delete</span>
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={5}
                                        align="center"
                                        className="py-2"
                                      >
                                        <h6>Data not found!</h6>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
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
            ) : (
              <CategorySkeleton />
            )}
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

      {/* DescriptionModal */}
      {DescriptionShow === true ? (
        <Modal
          className="fade zoom"
          show={DescriptionModalShow}
          onHide={DescriptionModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Expense Description</Modal.Title>
            <a href="#" className="close" onClick={DescriptionModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  disabled
                  className="text-justify"
                  as="textarea"
                  rows={10}
                >
                  {DescriptionModalData[1].replace(/<[^>]+>/g, "")}
                </Form.Control>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
