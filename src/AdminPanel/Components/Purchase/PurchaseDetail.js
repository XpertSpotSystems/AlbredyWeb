import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";
import ReactHtmlParser from "react-html-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";

// StatusStyle
const StatusStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
  width: "30%",
  borderRadius: "10px",
  backgroundColor: "#dff7fb",
  color: "#13c9f2",
  fontWeight: "600",
};

// Image
const Image = {
  height: "100px",
  width: "100px",
  borderRadius: "10px",
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

// StatusPending
const StatusPending = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "30px",
  width: "50%",
  margin: "12px 0 0 12px",
  borderRadius: "10px",
  backgroundColor: "#dff7fb",
  color: "#13c9f2",
  fontWeight: "600",
};

export default function PurchaseDetail() {
  const Location = useLocation();

  const PurchaseID = Location.state.purchase_id;

  console.log("purchase_id ::", PurchaseID);

  let SubTotal = 0;

  // Edit
  const History = useHistory();
  const NavigateTo = () => History.push("/list-purchase");

  const [PurchaseDetails, setPurchaseDetails] = useState([]);
  const [PurchaseItems, setPurchaseItems] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const setting = JSON.parse(localStorage.getItem("general_set"));

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;
  // const currency_ = setting.currency_;
  const currency_symbol = setting.currency_symbol;

  const GetDetailsData = () => {
    let data = {
      purchase_id: PurchaseID,
      email: Email,
      token: Token,
    };

    setOpen(true);

    // EditPurchase
    fetch(MyConstants.editPurchase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setPurchaseDetails(response.purchase_detail[0]);
          setPurchaseItems(response.purchase_items);
          setOpen(false);
        } else {
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      History.push("/");
    }
    GetDetailsData();
  }, [currency_symbol]);

  PurchaseItems.map((item) => {
    SubTotal += item.sub_total;
  });

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
                    <div className="components-preview">
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
                              Purchase Details
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
                              <span>Purchase List</span>
                            </Button>
                          </div>
                          {/* .nk-block-head-content */}
                        </div>
                        {/* .nk-block-between */}
                      </div>
                      {/* .nk-block-head */}
                      <div className="nk-block nk-block-lg mt-3 ml-0">
                        <div className="row">
                          <div className="col-lg-8 col-12">
                            <div
                              className="card card-preview"
                              style={{
                                boxShadow:
                                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                outline: "none",
                                marginTop: "20px",
                              }}
                            >
                              <div className="card-header">
                                <h4
                                  className="py-2 page-title"
                                  style={{ color: "#398E8B" }}
                                >
                                  Purchase Details
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="row mt-4">
                                  <div className="col-6">
                                    <h4>Supplier Name</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>{PurchaseDetails.name}</h5>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Date</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>{PurchaseDetails.date}</h5>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Invoice No</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>{PurchaseDetails.invoice_no}</h5>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Payment Status</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>
                                      <span
                                        className={
                                          PurchaseDetails.payment_status ===
                                          "paid"
                                            ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                            : PurchaseDetails.payment_status ===
                                              "unpaid"
                                            ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                            : PurchaseDetails.payment_status ===
                                              "partial"
                                            ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                                            : "badge text-capitalize px-3 py-1 border-0"
                                        }
                                      >
                                        {PurchaseDetails.payment_status}
                                      </span>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-12">
                            <div
                              className="card card-preview"
                              style={{
                                boxShadow:
                                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                outline: "none",
                                marginTop: "20px",
                              }}
                            >
                              <div className="card-header">
                                <h4
                                  className="py-2 page-title"
                                  style={{ color: "#398E8B" }}
                                >
                                  Purchase Products
                                </h4>
                              </div>
                              <div className="card-body">
                                <table className="table table-bordered table-hover table-striped table-responsive-lg">
                                  <thead>
                                    <tr>
                                      <th>Image</th>
                                      <th>Name</th>
                                      <th>Unit Price</th>
                                      {/* <th>Discount</th> */}
                                      <th>Quantity</th>
                                      <th>Total Price</th>
                                      {/* <th>Detail</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {PurchaseItems &&
                                      PurchaseItems.map((item) => {
                                        return (
                                          <tr key={item.id}>
                                            <td>
                                              <img
                                                src={
                                                  MyConstants.ImageUrl +
                                                  `${item.image}`
                                                }
                                                style={Image}
                                              />
                                            </td>
                                            <td style={{ maxWidth: "130px" }}>
                                              {item.name}
                                            </td>
                                            <td>
                                              {item.discount > 0 ? (
                                                <span>
                                                  <del className="mr-1">
                                                    {item.cost_price}
                                                  </del>

                                                  {item.cost_price -
                                                    item.cost_price *
                                                      (item.discount / 100)}
                                                </span>
                                              ) : (
                                                item.cost_price
                                              )}
                                            </td>
                                            {/* <td>{item.discount}</td> */}
                                            <td>{item.quantity}</td>
                                            <td>{item.sub_total}</td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </table>
                                <Row>
                                  <Col></Col>
                                  <Col className="mt-3">
                                    <h2>Total Due</h2>
                                    <hr />
                                    <h4 className="ml-3">
                                      Sub Total
                                      <span className="font-weight-medium float-right mr-3">
                                        {PurchaseDetails.currency + SubTotal}
                                      </span>
                                    </h4>
                                    <hr />
                                    <h4 className="ml-3">
                                      Delivery Fee
                                      <span className="font-weight-medium float-right mr-3">
                                        {PurchaseDetails.currency +
                                          PurchaseDetails.delivery_charges}
                                      </span>
                                    </h4>
                                    <hr />
                                    {/* <h4 className="ml-3">
                                      Tax
                                      <span className="font-weight-medium float-right mr-3">
                                        {PurchaseDetails.currency +
                                          PurchaseDetails.tax}
                                      </span>
                                    </h4>
                                    <hr /> */}
                                    <h4 className="ml-3">
                                      Total{" "}
                                      <span className="font-weight-medium float-right mr-3">
                                        {PurchaseDetails.currency + PurchaseDetails.total}
                                      </span>
                                    </h4>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                            {/* .card-preview */}
                          </div>
                        </div>
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
    </>
  );
}