import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import moment from "moment";
import OrderListSkeleton from "../Skeletons/orderListSkeleton";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function ListOrders() {
  // OrderDeliveryDateSearch
  const [SearchInput, setSearchInput] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [FilteredResults, setFilteredResults] = useState([]);
  const [ListOrders, setListOrders] = useState([]);
  const [SearchByStatus, setSearchByStatus] = useState([]);
  // Get ListOrders Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const Naviagte = useHistory();

  const NavigateToOrdersDetailPage = (id) => {
    Naviagte.push({
      pathname: "/orders-detail",

      state: {
        order_id: id,
      },
    });
  };

  //USE EFFECTS

  // (async()=>{
  //   setOpen(true);
  //   await fetch(MyConstants.listOrders, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((result) => {
  //     result.json().then((response) => {
  //       if (response.status == true) {
  //         console.warn("JsonResponse ::", response);
  //         setListOrders(response.orders);
  //         setOpen(false);
  //       }
  //     });
  //   });
  // })();

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      Naviagte.push("/");
    }
    let data = {
      email: Email,
      token: Token,
    };

    setOpen(true);

    fetch(MyConstants.listOrders, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          console.warn("JsonResponse ::", response);
          setListOrders(response.orders);
          setOpen(false);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!order_status) {
      const FilteredData = ListOrders.filter((item) => {
        if (Object.values(item).includes(order_status)) {
          return item;
        }
        console.log("###########", FilteredData);
      });
      setSearchByStatus(order_status);
    } else {
      setFilteredResults(ListOrders);
    }
    console.log(order_status);
  }, [order_status]);

  useEffect(() => {
    if (SearchInput !== "") {
      const FilteredData = ListOrders.filter((item) => {
        if (Object.values(item).includes(SearchInput)) {
          return item;
        }
      });
      console.log("FilteredData ::", FilteredData);
      setFilteredResults(FilteredData);
    } else {
      setFilteredResults(ListOrders);
    }
  }, [SearchInput]);

  const Location = useLocation();
  let order_status;
  if (Location.state) {
    order_status = Location.state.order_status;
  }

  useEffect(() => {
    if (SearchByStatus !== "") {
      const FilteredData = ListOrders.filter((item) => {
        if (Object.values(item).includes(SearchByStatus)) {
          return item;
        }
      });
      setFilteredResults(FilteredData);
    } else {
      setFilteredResults(ListOrders);
    }
  }, [SearchByStatus]);

  useEffect(() => {
    if (SearchByStatus || SearchInput) {
      if (SearchByStatus && SearchInput) {
        const FilteredData = ListOrders.filter((item) => {
          if (
            Object.values(item).includes(SearchByStatus) ||
            Object.values(item).includes(SearchInput)
          ) {
            return item;
          }
          setFilteredResults(FilteredData);
        });
      } else {
        setFilteredResults(ListOrders);
      }
    }
  }, [SearchByStatus, SearchInput]);

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
                                className="nk-block-title page-title text-capitalize"
                                style={{ color: "#398E8B" }}
                              >
                                {order_status
                                  ? order_status + " orders list"
                                  : "Orders List"}
                              </h3>
                            </div>
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
                              <Row>
                                <Col sm="4">
                                  <Form.Group className="mb-3">
                                    <Form.Label className="mt-2">
                                      Search by date:
                                    </Form.Label>
                                    <Form.Control
                                      type="date"
                                      className="form-control-md SearchDate"
                                      placeholder="Search here..."
                                      defaultValue={SearchInput}
                                      max={
                                        new Date().toISOString().split("T")[0]
                                      }
                                      onChange={(e) =>
                                        setSearchInput(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                                <Col className="offset-4 col-sm-4">
                                  <Form.Group className="mb-3 float-right">
                                    <Form.Label className="mt-2">
                                      Search by order status:
                                    </Form.Label>
                                    <select
                                      className="form-control custom-select"
                                      name="order_status"
                                      onChange={(e) => {
                                        setSearchByStatus(e.target.value);
                                      }}
                                    >
                                      <option value="Select Order Status...">
                                        Select Order Status...
                                      </option>
                                      <option
                                        value="in progress"
                                        selected={
                                          order_status === "in progress"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        In Progress
                                      </option>
                                      <option
                                        value="pick up"
                                        selected={
                                          order_status === "pick up"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        Pick Up
                                      </option>
                                      <option
                                        value="on the way"
                                        selected={
                                          order_status === "on the way"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        On the way
                                      </option>
                                      <option
                                        value="delivered"
                                        selected={
                                          order_status === "delivered"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        Delivered
                                      </option>
                                      <option
                                        value="cancelled"
                                        selected={
                                          order_status === "cancelled"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        Cancelled
                                      </option>
                                    </select>
                                  </Form.Group>
                                </Col>
                              </Row>
                              <table className="table table-bordered table-hover table-striped table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>Sr#</th>
                                    <th>Order #</th>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>Rider Name</th>
                                    <th>Order Status</th>
                                    <th>Payment Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                {/* <tbody>
                                {SearchInput && SearchInput.length >= 1 ? (
                                  FilteredResults.map((item, index) => {
                                    return (
                                      <tr key={item.order_id}>
                                        <td style={{ maxWidth: "150px" }}>
                                          {item.order_id}
                                        </td>
                                        <td style={{ maxWidth: "100px" }}>
                                          {item.reference_no}
                                        </td>
                                        <td style={{ maxWidth: "180px" }}>
                                          {item.name}
                                        </td>
                                        <td style={{ maxWidth: "100px" }}>
                                          {item.email}
                                        </td>
                                        <td style={{ maxWidth: "180px" }}>
                                          {item.rider_name}
                                        </td>
                                        <td style={{ maxWidth: "150px" }}>
                                          <span
                                            className={
                                              item.order_status ===
                                              "in progress"
                                                ? "badge-dark text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "pick up"
                                                ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "delivered"
                                                ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "cancelled"
                                                ? "badge-danger text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "on the way"
                                                ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                                                : "badge text-capitalize px-3 py-1 border-0"
                                            }
                                          >
                                            {item.order_status}
                                          </span>
                                        </td>
                                        <td style={{ maxWidth: "150px" }}>
                                          <span
                                            className={
                                              item.payment_status === "paid"
                                                ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.payment_status ===
                                                  "unpaid"
                                                ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                : "badge text-capitalize px-3 py-1 border-0"
                                            }
                                          >
                                            {item.payment_status}
                                          </span>
                                        </td>
                                        <td>
                                          <Button
                                            onClick={() =>
                                              NavigateToOrdersDetailPage(
                                                item.order_id
                                              )
                                            }
                                            className="btn btn-dark  btn-sm"
                                            style={{
                                              outline: "none",
                                              boxShadow: "none",
                                            }}
                                          >
                                            <span>Show Order</span>
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : SearchByStatus &&
                                  SearchByStatus.length >= 1 ? (
                                  FilteredResults.map((item, index) => {
                                    return (
                                      <tr key={item.order_id}>
                                        <td style={{ maxWidth: "150px" }}>
                                          {item.order_id}
                                        </td>
                                        <td style={{ maxWidth: "100px" }}>
                                          {item.reference_no}
                                        </td>
                                        <td style={{ maxWidth: "180px" }}>
                                          {item.name}
                                        </td>
                                        <td style={{ maxWidth: "100px" }}>
                                          {item.email}
                                        </td>
                                        <td style={{ maxWidth: "180px" }}>
                                          {item.rider_name}
                                        </td>
                                        <td style={{ maxWidth: "150px" }}>
                                          <span
                                            className={
                                              item.order_status ===
                                              "in progress"
                                                ? "badge-dark text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "pick up"
                                                ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "delivered"
                                                ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "cancelled"
                                                ? "badge-danger text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "on the way"
                                                ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                                                : "badge text-capitalize px-3 py-1 border-0"
                                            }
                                          >
                                            {item.order_status}
                                          </span>
                                        </td>
                                        <td style={{ maxWidth: "150px" }}>
                                          <span
                                            className={
                                              item.payment_status === "paid"
                                                ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.payment_status ===
                                                  "unpaid"
                                                ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                : "badge text-capitalize px-3 py-1 border-0"
                                            }
                                          >
                                            {item.payment_status}
                                          </span>
                                        </td>
                                        <td>
                                          <Button
                                            onClick={() =>
                                              NavigateToOrdersDetailPage(
                                                item.order_id
                                              )
                                            }
                                            className="btn btn-dark  btn-sm"
                                            style={{
                                              outline: "none",
                                              boxShadow: "none",
                                            }}
                                          >
                                            <span>Show Order</span>
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : ListOrders.length >= 1 ? (
                                  ListOrders.map((item, index) => {
                                    return (
                                      <tr key={item.order_id}>
                                        <td style={{ maxWidth: "150px" }}>
                                          {item.order_id}
                                        </td>
                                        <td style={{ maxWidth: "100px" }}>
                                          {item.reference_no}
                                        </td>
                                        <td style={{ maxWidth: "120px" }}>
                                          {item.name}
                                        </td>
                                        <td style={{ maxWidth: "160px" }}>
                                          {item.email}
                                        </td>
                                        <td style={{ maxWidth: "180px" }}>
                                          {item.rider_name}
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              item.order_status ===
                                              "in progress"
                                                ? "badge-dark text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "pick up"
                                                ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "delivered"
                                                ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "cancelled"
                                                ? "badge-danger text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.order_status ===
                                                  "on the way"
                                                ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                                                : "badge text-capitalize px-3 py-1 border-0"
                                            }
                                          >
                                            {item.order_status}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={
                                              item.payment_status === "paid"
                                                ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                : item.payment_status ===
                                                  "unpaid"
                                                ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                : "badge text-capitalize px-3 py-1 border-0"
                                            }
                                          >
                                            {item.payment_status}
                                          </span>
                                        </td>
                                        <td>
                                          <Button
                                            onClick={() =>
                                              NavigateToOrdersDetailPage(
                                                item.order_id
                                              )
                                            }
                                            className="btn btn-dark  btn-sm"
                                            style={{
                                              outline: "none",
                                              boxShadow: "none",
                                            }}
                                          >
                                            <span>Show Order</span>
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={8}
                                      align="center"
                                      className="py-2"
                                    >
                                      <h6>Data not found!</h6>
                                    </td>
                                  </tr>
                                )}
                              </tbody> */}
                                <tbody>
                                  {SearchInput &&
                                  SearchInput.length >= 1 &&
                                  SearchByStatus &&
                                  SearchByStatus.length >= 1 ? (
                                    FilteredResults.map((item, index) => {
                                      return (
                                        <tr key={item.order_id}>
                                          <td style={{ maxWidth: "150px" }}>
                                            {item.order_id}
                                          </td>
                                          <td style={{ maxWidth: "100px" }}>
                                            {item.reference_no}
                                          </td>
                                          <td style={{ maxWidth: "180px" }}>
                                            {item.name}
                                          </td>
                                          <td style={{ maxWidth: "100px" }}>
                                            {item.email}
                                          </td>
                                          <td style={{ maxWidth: "180px" }}>
                                            {item.rider_name}
                                          </td>
                                          <td style={{ maxWidth: "150px" }}>
                                            <span
                                              className={
                                                item.order_status ===
                                                "in progress"
                                                  ? "badge-dark text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.order_status ===
                                                    "pick up"
                                                  ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.order_status ===
                                                    "delivered"
                                                  ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.order_status ===
                                                    "cancelled"
                                                  ? "badge-danger text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.order_status ===
                                                    "on the way"
                                                  ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                                                  : "badge text-capitalize px-3 py-1 border-0"
                                              }
                                            >
                                              {item.order_status}
                                            </span>
                                          </td>
                                          <td style={{ maxWidth: "150px" }}>
                                            <span
                                              className={
                                                item.payment_status === "paid"
                                                  ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.payment_status ===
                                                    "unpaid"
                                                  ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                  : "badge text-capitalize px-3 py-1 border-0"
                                              }
                                            >
                                              {item.payment_status}
                                            </span>
                                          </td>
                                          <td>
                                            <Button
                                              onClick={() =>
                                                NavigateToOrdersDetailPage(
                                                  item.order_id
                                                )
                                              }
                                              className="btn btn-dark  btn-sm"
                                              style={{
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                            >
                                              <span>Show Order</span>
                                            </Button>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : ListOrders.length >= 1 ? (
                                    ListOrders.map((item, index) => {
                                      return (
                                        <tr key={item.order_id}>
                                          <td style={{ maxWidth: "150px" }}>
                                            {item.order_id}
                                          </td>
                                          <td style={{ maxWidth: "100px" }}>
                                            {item.reference_no}
                                          </td>
                                          <td style={{ maxWidth: "120px" }}>
                                            {item.name}
                                          </td>
                                          <td style={{ maxWidth: "160px" }}>
                                            {item.email}
                                          </td>
                                          <td style={{ maxWidth: "180px" }}>
                                            {item.rider_name}
                                          </td>
                                          <td>
                                            <span
                                              className={
                                                item.order_status ===
                                                "in progress"
                                                  ? "badge-dark text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.order_status ===
                                                    "pick up"
                                                  ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.order_status ===
                                                    "delivered"
                                                  ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.order_status ===
                                                    "cancelled"
                                                  ? "badge-danger text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.order_status ===
                                                    "on the way"
                                                  ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                                                  : "badge text-capitalize px-3 py-1 border-0"
                                              }
                                            >
                                              {item.order_status}
                                            </span>
                                          </td>
                                          <td>
                                            <span
                                              className={
                                                item.payment_status === "paid"
                                                  ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                                  : item.payment_status ===
                                                    "unpaid"
                                                  ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                                  : "badge text-capitalize px-3 py-1 border-0"
                                              }
                                            >
                                              {item.payment_status}
                                            </span>
                                          </td>
                                          <td>
                                            <Button
                                              onClick={() =>
                                                NavigateToOrdersDetailPage(
                                                  item.order_id
                                                )
                                              }
                                              className="btn btn-dark  btn-sm"
                                              style={{
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                            >
                                              <span>Show Order</span>
                                            </Button>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={8}
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
              <OrderListSkeleton />
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
