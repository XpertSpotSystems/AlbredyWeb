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

export default function OrdersDetail() {
  const Location = useLocation();

  const OrderID = Location.state.order_id;

  console.log("order_id ::", OrderID);

  let SubTotal = 0;

  // Edit
  const History = useHistory();
  const NavigateTo = () => History.push("/list-orders");

  const [userOrderDetail, setUserOrderDetail] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [ListOrders, setListOrders] = useState([]);
  const [RidersList, setRidersList] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;
  const setting = JSON.parse(localStorage.getItem("general_set"));

  const currency_symbol = setting.currency_symbol;

  const GetDetailsData = () => {
    let data = {
      id: OrderID,
      email: Email,
      token: Token,
    };

    setOpen(true);

    // EditProducts
    fetch(MyConstants.showOrderDetail, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setUserOrderDetail(response.user_order_detail[0]);
          setRidersList(response.riders);
          setOrderProducts(response.ordered_products);
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
  console.log("userOrderDetail", userOrderDetail);
  console.log("orderProducts", orderProducts);

  const GetListData = () => {
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.listOrders, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListOrders(response.orders);
        }
      });
    });
  };

  // UpdateOrderStatus
  const UpdateOrderStatus = (e) => {
    let data = {
      email: Email,
      token: Token,
      order_id: OrderID,
      order_status: e,
    };

    console.log("order_status_data ::", data);

    fetch(MyConstants.updateOrderStatus, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((response) => {
          console.warn(response);
          if (response.status == true) {
            // NavigateTo();
            GetDetailsData();
            swal({
              title: "Success!",
              text: "Order Status has been updated successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        });
      })
      .catch((error) => {
        console.log("Error :::", error);
      });
  };

  // UpdatePaymentStatus
  const UpdatePaymentStatus = (e) => {
    let data = {
      email: Email,
      token: Token,
      order_id: OrderID,
      payment_status: e,
    };

    console.log("payment_status_data ::", data);

    fetch(MyConstants.updatePaymentStatus, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((response) => {
          console.warn(response);
          if (response.status == true) {
            // NavigateTo();
            GetDetailsData();
            swal({
              title: "Success!",
              text: "Payment Status has been updated successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        });
      })
      .catch((error) => {
        console.log("Error :::", error);
      });
  };

  // ViewDetail
  const [ViewDetailModalShow, setViewDetailModalShow] = useState(false);
  const [ViewDetailsModalData, setViewDetailsModalData] = useState([]);

  const ViewDetailsModalClose = () => setViewDetailModalShow(false);
  const ViewDetailsModalShow = () => setViewDetailModalShow(true);

  const ViewDetail = (id, detail) => {
    let ViewDetailsModalData = [id, detail];
    setViewDetailsModalData([...ViewDetailsModalData]);
    return setViewDetailModalShow(true);
  };

  // AsignRiderOrder
  const AsignRiderOrder = (e) => {
    let data = {
      email: Email,
      token: Token,
      order_id: OrderID,
      rider_id: e,
    };

    console.log("assign_order ::", data);

    fetch(MyConstants.asignOrder, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          NavigateTo();
          GetDetailsData();
          swal({
            title: "Success!",
            text: "Order has been assigned successfully!",
            icon: "success",
            button: "Ok",
          });
        } else {
          console.log("Error :::", response.message);
        }
      });
    });
  };

  orderProducts.map((item) => {
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
                              Order Details
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
                              <span>Orders List</span>
                            </Button>
                          </div>
                          {/* .nk-block-head-content */}
                        </div>
                        {/* .nk-block-between */}
                      </div>
                      {/* .nk-block-head */}
                      <div className="nk-block nk-block-lg mt-5 ml-0">
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
                                  Order Details
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="row mt-4">
                                  <div className="col-6">
                                    <h4>Name</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>
                                      {userOrderDetail.first_name +
                                        userOrderDetail.last_name}
                                    </h5>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Email</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>{userOrderDetail.email}</h5>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Phone</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>{userOrderDetail.phone}</h5>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>City</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>{userOrderDetail.city}</h5>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Delivery Address</h4>
                                  </div>
                                  <div className="col-6">
                                    <h5>{userOrderDetail.delivery_address}</h5>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Order Status</h4>
                                  </div>
                                  <div className="col-6">
                                    <select
                                      className="form-control custom-select w-75"
                                      name="order_status"
                                      onChange={(e) =>
                                        UpdateOrderStatus(e.target.value)
                                      }
                                    >
                                      <option
                                        value="in progress"
                                        selected={
                                          userOrderDetail.order_status ===
                                          "in progress"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        In Progress
                                      </option>
                                      <option
                                        value="pick up"
                                        selected={
                                          userOrderDetail.order_status ===
                                          "pick up"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        Pick Up
                                      </option>
                                      <option
                                        value="on the way"
                                        selected={
                                          userOrderDetail.order_status ===
                                          "on the way"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        On the way
                                      </option>
                                      <option
                                        value="delivered"
                                        selected={
                                          userOrderDetail.order_status ===
                                          "delivered"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        Delivered
                                      </option>
                                      <option
                                        value="cancelled"
                                        selected={
                                          userOrderDetail.order_status ===
                                          "cancelled"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        Cancelled
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Payment Status</h4>
                                  </div>
                                  <div className="col-6">
                                    <select
                                      className="form-control custom-select w-75"
                                      name="payment_status"
                                      onChange={(e) =>
                                        UpdatePaymentStatus(e.target.value)
                                      }
                                      disabled={
                                        userOrderDetail.order_status ===
                                          "cancelled" ||
                                        userOrderDetail.order_status ===
                                          "delivered"
                                          ? "disabled"
                                          : ""
                                      }
                                    >
                                      <option
                                        value="paid"
                                        selected={
                                          userOrderDetail.payment_status ===
                                          "paid"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        Paid
                                      </option>
                                      <option
                                        value="unpaid"
                                        selected={
                                          userOrderDetail.payment_status ===
                                          "unpaid"
                                            ? "selected"
                                            : ""
                                        }
                                      >
                                        Un Paid
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-6">
                                    <h4>Assign Order to Rider</h4>
                                  </div>
                                  <div className="col-6">
                                    <select
                                      className="form-control custom-select w-75"
                                      name="assign_order"
                                      onChange={(e) =>
                                        AsignRiderOrder(e.target.value)
                                      }
                                    >
                                      <option value="Select Rider">
                                        Select Rider
                                      </option>
                                      {RidersList.map((item) => (
                                        <option
                                          value={item.id}
                                          selected={
                                            item.id === userOrderDetail.rider_id
                                              ? "selected"
                                              : ""
                                          }
                                        >
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
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
                                  Products Ordered
                                </h4>
                              </div>
                              <div className="card-body">
                                <table className="table table-bordered table-hover table-striped table-responsive-lg">
                                  <thead>
                                    <tr>
                                      <th>Id#</th>
                                      <th>Image</th>
                                      <th>Name</th>
                                      <th>Price</th>
                                      <th>Discount</th>
                                      <th>Quantity</th>
                                      <th>Total Price</th>
                                      {/* <th>Detail</th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {orderProducts &&
                                      orderProducts.map((item) => {
                                        // {
                                        //   SubTotal +=
                                        //     item.quantity *
                                        //     (item.price -
                                        //       item.price *
                                        //         (item.discount / 100));
                                        // }
                                        return (
                                          <tr key={item.id}>
                                            <td>{item.product_id}</td>
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
                                                    {item.price}
                                                  </del>

                                                  {item.price -
                                                    item.price *
                                                      (item.discount / 100)}
                                                </span>
                                              ) : (
                                                item.price
                                              )}
                                            </td>
                                            <td>{item.discount}</td>
                                            <td>{item.order_product_qnty}</td>
                                            <td>{item.sub_total}</td>
                                            {/* <td>
                                          {ReactHtmlParser(item.detail)}
                                        </td> */}
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
                                        {userOrderDetail.currency + SubTotal}
                                      </span>
                                    </h4>
                                    <hr />
                                    <h4 className="ml-3">
                                      Delivery Fee
                                      <span className="font-weight-medium float-right mr-3">
                                        {userOrderDetail.currency +
                                          userOrderDetail.delivery_fee}
                                      </span>
                                    </h4>
                                    <hr />
                                    <h4 className="ml-3">
                                      Tax
                                      <span className="font-weight-medium float-right mr-3">
                                        {userOrderDetail.currency +
                                          userOrderDetail.tax}
                                      </span>
                                    </h4>
                                    <hr />
                                    <h4 className="ml-3">
                                      Total{" "}
                                      <span className="font-weight-medium float-right mr-3">
                                        {userOrderDetail.currency +
                                          userOrderDetail.order_total}
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

      {/* View Detail Modal */}
      {ViewDetailModalShow === true ? (
        <Modal
          className="fade zoom"
          show={ViewDetailsModalShow}
          onHide={ViewDetailsModalClose}
          backdrop="static"
          size="sm"
        >
          <Modal.Header>
            <Modal.Title>
              Ordered Product Detail Of ID # {ViewDetailsModalData[0]}
            </Modal.Title>
            <a href="#" className="close" onClick={ViewDetailsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col className="text-justify">
                {/* <div className="form-group">
                  <label className="form-label">Product Detail</label>
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                  <CKEditor
                    editor={ClassicEditor}
                    data={ViewDetailsModalData[1]}
                  />
                </div> */}

                {/* <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={8} defaultValue={ViewDetailsModalData[1]} disabled />
                </Form.Group> */}
                {ViewDetailsModalData[1]}
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
