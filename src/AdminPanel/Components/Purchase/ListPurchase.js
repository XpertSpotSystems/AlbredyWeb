import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { VscKebabVertical } from "react-icons/vsc";
import AddPaymentModal from "./AddPaymentModal";
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

export default function ListPurchase() {
  // Get ListPurchase Data
  const [ListPurchase, setListPurchase] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ModelOpen, setOpenModal] = useState(false);

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
    fetch(MyConstants.listPurchase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListPurchase(response.purchases);
          setOpen(false);
        } else {
          setOpen(false);
        }
      });
    });
  }, []);

  // Edit
  const History = useHistory();
  const NavigateTo = () => History.push("/add-purchase");

  const NavigateToPurchaseDetailPage = (id) => {
    History.push({
      pathname: "/purchase_detail",

      state: {
        purchase_id: id,
      },
    });
  };

  const OpenAddPurchaseModal = (supplier_id, date, total) => {};

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
                                Purchase
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
                                <span>Add Purchase</span>
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
                                    <th>Invoice No</th>
                                    <th>Supplier Name</th>
                                    <th>Payment Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ListPurchase.length >= 1 ? (
                                    ListPurchase.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{item.id}</td>
                                          <td>{item.date}</td>
                                          <td>{item.invoice_no}</td>
                                          <td>{item.name}</td>
                                          <td>
                                            <span
                                              className={
                                                item.payment_status === "paid"
                                                  ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.payment_status ===
                                                    "unpaid"
                                                  ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.payment_status ===
                                                    "partial"
                                                  ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                                                  : "badge text-capitalize px-3 py-1 border-0"
                                              }
                                            >
                                              {item.payment_status}
                                            </span>
                                          </td>
                                          <td>
                                            <div className="d-inline-flex">
                                              <OptionDropDownPurchase
                                                handleViewDetail={() => {
                                                  NavigateToPurchaseDetailPage(
                                                    item.id
                                                  );
                                                }}
                                                handleModalOpen={() => {
                                                  setOpenModal(true);
                                                }}
                                                purchase={item}
                                              />
                                            </div>
                                          </td>
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
    </div>
  );
}

export const OptionDropDownPurchase = (props) => {
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const [ModalOpen, setModalOpen] = useState(false);
  const [Accounts, setAccounts] = useState([]);

  let data = {
    email: LoginUser.email,
    token: LoginToken,
  };
  // const handleAddPaymentModal = () => {
  //   let data = {
  //     email: JSON.parse(localStorage.getItem("LOGIN_USER")).email,
  //     token: JSON.parse(localStorage.getItem("LOGIN_TOKEN")),
  //   };
  //   fetch(MyConstants.addPurchasePayment, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((result) => {
  //     result.json().then((response) => {
  //      console.log(response);
  //       if (response.status == true) {
  //         console.log("UsersData ===", response.user);
  //       }
  //     });
  //   });
  // };

  const handleModalOpen = () => {
    setModalOpen(true);
    fetch(MyConstants.ListAccounts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          setAccounts(response.accounts);
        } else {
          console.log(response);
        }
      });
    });
  };

  return (
    <>
      <AddPaymentModal
        open={ModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        data={props.purchase}
        accounts={Accounts}
      />
      <DropdownButton
        id="dropdown-item-button"
        title={
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <VscKebabVertical />
            <span>Options</span>
          </span>
        }
      >
        <Dropdown.Item
          id="dropdown-item"
          as="button"
          onClick={props.handleViewDetail}
        >
          View Detail
        </Dropdown.Item>
        <Dropdown.Item id="dropdown-item" as="button" onClick={handleModalOpen}>
          Add Payment
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};
