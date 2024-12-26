import React, { useState, useEffect } from "react";
import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { FaDollarSign, FaTruck } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
// import SpinnerLoading from "../../ReuseableComponents/SpinnerLoading";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import DashBoardSkeleton from "../Skeletons/dashBoardSkeleton";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function Dashview() {
  const Location = useLocation();
  const URL = Location.pathname;

  // States
  const [DashboardData, setDashboardData] = useState([]);
  const [ListAlertProducts, setListAlertProducts] = useState([]);
  // const [Loading, setLoading] = useState(false);

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const Naviagte = useHistory();

  // GetDashboardData
  const GetDashboardData = async () => {
    try {
      let data = {
        email: Email,
        token: Token,
      };

      setOpen(true);

      fetch(MyConstants.dashboardData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            console.log("JsonResponse ::", response);
            setDashboardData(response.data);
            setListAlertProducts(response.data.alert_quantity_products);
            setOpen(false);
          }
        });
      });
    } catch (error) {
      setOpen(false);
      console.error("Error ::".error);
    }
  };

  useEffect(() => {
    GetDashboardData();

    if (LoginUser.role !== "admin") {
      Naviagte.push("/");
    }
  }, []);

  console.log("ListAlertProducts ::", ListAlertProducts);

  // OrderStatus
  const OrderStatus = (order_status) => {
    Naviagte.push({
      pathname: "/list-orders",
      state: {
        order_status: order_status,
      },
    });
  };

  return (
    <div>
      <div className="nk-app-root">
        {/* main @s */}
        <div className="nk-main ">
          {/* sidebar @s */}
          <div
            className="nk-sidebar nk-sidebar-fixed is-light"
            data-content="sidebarMenu"
          >
            <Sidebar />
          </div>
          {/* Sidebar @e */}
          {/* wrap @s */}
          <div className="nk-wrap " style={{ background: "#eee" }}>
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
                              {LoginUser.role} Dashboard
                            </h3>
                          </div>
                          {/* .nk-block-head-content */}
                        </div>
                        {/* .nk-block-between */}
                      </div>
                      {/* .nk-block-head */}
                      {/* .nk-block-head */}

                      <div className="nk-block mt-4">
                        <Row>
                          <Col lg={6} md={6} sm={12}>
                            <div
                              onClick={() => OrderStatus("in progress")}
                              style={{ cursor: "pointer" }}
                            >
                              <Card
                                style={{ boxShadow: "none", border: "none" }}
                              >
                                <Card.Body>
                                  <Row>
                                    <Col md={6} sm={12}>
                                      <h5 className="font-weight-bold">
                                        Orders In Progress!
                                      </h5>
                                      <div
                                        className="my-3"
                                        style={{
                                          color: "#364a63",
                                          fontWeight: "bold",
                                          fontSize: "2rem",
                                        }}
                                      >
                                        {DashboardData.in_progress}
                                      </div>
                                    </Col>
                                    <Col
                                      md={6}
                                      sm={12}
                                      className="my-sm-3 my-md-0 d-md-flex align-items-center justify-content-end"
                                    >
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/assets/img/in_progress.png"
                                        }
                                        height={60}
                                      />
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </div>
                          </Col>
                          <Col lg={6} md={6} sm={12}>
                            <div
                              onClick={() => OrderStatus("cancelled")}
                              style={{ cursor: "pointer" }}
                            >
                              <Card
                                style={{ boxShadow: "none", border: "none" }}
                              >
                                <Card.Body>
                                  <Row>
                                    <Col md={6} sm={12}>
                                      <h5 className="font-weight-bold">
                                        Orders Cancelled!
                                      </h5>
                                      <div
                                        className="my-3"
                                        style={{
                                          color: "#364a63",
                                          fontWeight: "bold",
                                          fontSize: "2rem",
                                        }}
                                      >
                                        {DashboardData.cancelled}
                                      </div>
                                    </Col>
                                    <Col
                                      md={6}
                                      sm={12}
                                      className="my-sm-3 my-md-0 d-md-flex align-items-center justify-content-end"
                                    >
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/assets/img/cancelled.png"
                                        }
                                        height={60}
                                      />
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </div>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col lg={6} md={6} sm={12}>
                            <div
                              onClick={() => OrderStatus("on the way")}
                              style={{ cursor: "pointer" }}
                            >
                              <Card
                                style={{ boxShadow: "none", border: "none" }}
                              >
                                <Card.Body>
                                  <Row>
                                    <Col md={6} sm={12}>
                                      <h5 className="font-weight-bold">
                                        Orders On the way!
                                      </h5>
                                      <div
                                        className="my-3"
                                        style={{
                                          color: "#364a63",
                                          fontWeight: "bold",
                                          fontSize: "2rem",
                                        }}
                                      >
                                        {DashboardData.on_the_way}
                                      </div>
                                    </Col>
                                    <Col
                                      md={6}
                                      sm={12}
                                      className="my-sm-3 my-md-0 d-md-flex align-items-center justify-content-end"
                                    >
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/assets/img/completed.png"
                                        }
                                        height={60}
                                      />
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </div>
                          </Col>
                          <Col lg={6} md={6} sm={12}>
                            <div
                              onClick={() => OrderStatus("delivered")}
                              style={{ cursor: "pointer" }}
                            >
                              <Card
                                style={{ boxShadow: "none", border: "none" }}
                              >
                                <Card.Body>
                                  <Row>
                                    <Col md={6} sm={12}>
                                      <h5 className="font-weight-bold">
                                        Orders Delivered!
                                      </h5>
                                      <div
                                        className="my-3"
                                        style={{
                                          color: "#364a63",
                                          fontWeight: "bold",
                                          fontSize: "2rem",
                                        }}
                                      >
                                        {DashboardData.deliverd}
                                      </div>
                                    </Col>
                                    <Col
                                      md={6}
                                      sm={12}
                                      className="my-sm-3 my-md-0 d-md-flex align-items-center justify-content-end"
                                    >
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/assets/img/delivered.png"
                                        }
                                        height={60}
                                      />
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </div>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col lg={6} md={6} sm={12}>
                            <Link to="/list-products">
                              <Card
                                style={{ boxShadow: "none", border: "none" }}
                              >
                                <Card.Body>
                                  <Row>
                                    <Col md={6} sm={12}>
                                      <h5 className="font-weight-bold">
                                        Total Products!
                                      </h5>
                                      <div
                                        className="my-3"
                                        style={{
                                          color: "#364a63",
                                          fontWeight: "bold",
                                          fontSize: "2rem",
                                        }}
                                      >
                                        {DashboardData.total_products}
                                      </div>
                                    </Col>
                                    <Col
                                      md={6}
                                      sm={12}
                                      className="my-sm-3 my-md-0 d-md-flex align-items-center justify-content-end"
                                    >
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/assets/img/total_products.png"
                                        }
                                        height={60}
                                      />
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                          <Col lg={6} md={6} sm={12}>
                            <Card style={{ boxShadow: "none", border: "none" }}>
                              <Card.Body>
                                <Row>
                                  <Col md={6} sm={12}>
                                    <h5 className="font-weight-bold">
                                      Today's Orders!
                                    </h5>
                                    <div
                                      className="my-3"
                                      style={{
                                        color: "#364a63",
                                        fontWeight: "bold",
                                        fontSize: "2rem",
                                      }}
                                    >
                                      {DashboardData.today_orders}
                                    </div>
                                  </Col>
                                  <Col
                                    md={6}
                                    sm={12}
                                    className="my-sm-3 my-md-0 d-md-flex align-items-center justify-content-end"
                                  >
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/assets/img/today_orders.png"
                                      }
                                      height={60}
                                    />
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                      {/* .nk-block */}

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
                              Products Alert Quantity
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="nk-block mt-4">
                        {/* <div
                        className="card card-preview p-0"
                        style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          outline: "none",
                          marginTop: "20px",
                        }}
                      >
                        <div className="card-inner alert_table_card"> */}
                        <div className="alert_table_card">
                          <table className="table table-bordered table-hover table-striped table-responsive-sm">
                            <thead className="bg-dark text-light">
                              <tr>
                                <th>Sr#</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>QTY</th>
                                <th>Alert QTY</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ListAlertProducts &&
                              ListAlertProducts.length >= 1 ? (
                                ListAlertProducts.map((item) => (
                                  <tr>
                                    <td>{item.id}</td>
                                    <td style={{ maxWidth: "100px" }}>
                                      {item.code}
                                    </td>
                                    <td style={{ maxWidth: "150px" }}>
                                      {item.name}
                                    </td>
                                    <td>{item.ctgname}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.alert_quantity}</td>
                                    <td style={{ maxWidth: "100px" }}>
                                      <div className="d-inline-flex">
                                        <Button
                                          className="btn btn-primary d-none  btn-sm d-md-inline-flex"
                                          style={{
                                            backgroundColor: "#398E8B",
                                            border: "#398E8B",
                                            outline: "none",
                                            boxShadow: "none",
                                          }}
                                        >
                                          {/* <em className="icon ni ni-edit" /> */}
                                          <span>Pre Order</span>
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    colSpan={7}
                                    align="center"
                                    className="py-2"
                                  >
                                    <h6>No Data Available to Display</h6>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                      {/* .nk-block */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <DashBoardSkeleton />
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
