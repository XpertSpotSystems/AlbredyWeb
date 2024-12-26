import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import { useHistory } from "react-router-dom";
import * as MyConstants from "../../Constant/Config";
import { Button } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import CategorySkeleton from "../Skeletons/categorySkeleton";

// Image
const Image = {
  height: "100px",
  width: "100px",
  borderRadius: "10px",
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

let supplierData = {};

export default function Reports() {
  // Get ListPurchase Data
  const [ListPayments, setListPayments] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
    };

    setOpen(true);
    fetch(MyConstants.paymentReport, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListPayments(response.payments);
          setOpen(false);
        }
      });
    });
  }, []);

  // Edit
  const History = useHistory();
  const NavigateTo = () => History.push("/list-purchase");

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
            {/* {!open ? ( */}
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
                                Payment Report
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
                                <span>List Purchases</span>
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
                                    <th>Paid From</th>
                                    <th>Paid To</th>
                                    <th>Type</th>
                                    <th>Paid Amount</th>
                                    <th>Remaining Amount</th>
                                    <th>Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ListPayments.length >= 1 ? (
                                    ListPayments.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{item.paid_from}</td>
                                          <td>{item.paid_to}</td>
                                          <td>{item.type}</td>
                                          <td>{item.paid_amount}</td>
                                          <td>{item.remaining}</td>
                                          <td>{item.date}</td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={6}
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
            {/* // ) : (
            //   <CategorySkeleton />
            // )} */}
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
  );
}
