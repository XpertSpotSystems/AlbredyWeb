import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { FaCube } from "react-icons/fa";
import * as MyConstants from "../../AdminPanel/Constant/Config";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";
import { connect } from "react-redux";

// Styling
const CustomStyle = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    justifyContent: "center",
    zIndex: theme.zIndex.drawer + 1,
  },
  Button: {
    background: "#398E8B",
    color: "#fff",
    // padding: "4px 20px",
    textTransform: "capitalize",
    // width: "50%",
    marginLeft: "10px",
    fontSize: "13px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
}));

const OrderHistory = ({ location, addToCart }) => {
  const { pathname } = location;
  //   StylingClasses
  const StylingClasses = CustomStyle();

  //HELPER FUNCTION TO ADD TAX AND DELIVERY CHARGES TO TOTAL and remove decimal point
  let total_total = (tax, delivery, totall) => {
    const total = tax + delivery + totall;
    return total.toFixed();
  }

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Token = LoginUser.token;

  const UserID = LoginUser.id;

  // States
  const [ListOrders, setListOrders] = useState([]);
  // const [ListOrderItems, setListOrderItems] = useState([]);
  const classes = CustomStyle();
  const [open, setOpen] = useState(false);

  //SEARCH ORDER STATES
  const [searchByStatus, setSearchByStatus] = useState([]);
  const [FilteredResults, setFilteredResults] = useState([]);

  // GetListOrderHistory
  const GetListOrderHistory = () => {
    let data = {
      user_id: UserID,
    };

    setOpen(true);
    fetch(MyConstants.listOrderHistory, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            // console.log("Jsonresponse ::", response);
            setListOrders(response.orders);
            setOpen(false);
          } else {
            setOpen(false);
          }
        });
      })
      .catch((Errorr) => {
        console.log("Errorr ::", Errorr);
      });
  };

  //SIDE EFFECTS
  useEffect(()=>{
    if (searchByStatus !== "") {
      const FilteredData = ListOrders.filter((item) => {
        if (Object.values(item).includes(searchByStatus)) {
          return item;
        }
      });
      setFilteredResults(FilteredData);
    } else {
      setFilteredResults(ListOrders);
    }  
  },[searchByStatus])


  useEffect(() => {
    GetListOrderHistory();
  }, []);

  // console.log("ListOrders ::", ListOrders);

  //NAVIGATION TO RECIEVED ORDERS PAGE
  const NavigateTo = useHistory();
  const GoToOrderDetails = (order_id) => {
    NavigateTo.push({
      pathname: "/order_history_detail",
      state: {
        order_id: order_id,
      },
    });
  };

  const [orderProducts, setOrderProducts] = useState();

  // ReOrder
  const ReOrder = (order_id) => {
    console.log("order_id ::", order_id);
    ListOrders.filter((item) => {
      if (order_id === item.order_id) {
        // return item;

        let data = {
          order_id: order_id,
        };

        fetch(MyConstants.reOrder, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            if (response.status == true) {
              setOrderProducts((response.order_items));
              addToCart((response.order_items)).flat();
            }
          });
        });
      }
    });
  };

  useEffect(() => {
    console.log("ReOrderProducts ::", orderProducts);
  }, [orderProducts]);

  return (
    <Fragment>
      <MetaTags>
        <title>Albredy || Order History</title>
        <meta
          name="description"
          content="OrderHistory of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Order History
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="container my-5 py-2">
        <Col className="col-sm-10 float-right">
                                <Form.Group className="mb-3 float-right">
                                  <select
                                    style={{marginLeft: "1vw"}}
                                    className="form-control custom-select"
                                    name="order_status"
                                    onChange={(e) => {
                                      setSearchByStatus(e.target.value);
                                    }}
                                  >
                                    <option value="Select Order Status..." disabled={true} >
                                      Select Order Status...
                                    </option>
                                    <option
                                      value="in progress"
                                      // selected={
                                      //   order_status === "in progress"
                                      //     ? "selected"
                                      //     : ""
                                      // }
                                    >
                                      In Progress
                                    </option>
                                    <option
                                      value="pick up"
                                      // selected={
                                      //   order_status === "pick up"
                                      //     ? "selected"
                                      //     : ""
                                      // }
                                    >
                                      Pick Up
                                    </option>
                                    <option
                                      value="on the way"
                                      // selected={
                                      //   order_status === "on the way"
                                      //     ? "selected"
                                      //     : ""
                                      // }
                                    >
                                      On the way
                                    </option>
                                    <option
                                       value="delivered"
                                      // selected={
                                      //   order_status === "delivered"
                                      //     ? "selected"
                                      //     : ""
                                      // }
                                    >
                                      Delivered
                                    </option>
                                    <option
                                      value="cancelled"
                                      // selected={
                                      //   order_status === "cancelled"
                                      //     ? "selected"
                                      //     : ""
                                      // }
                                    >
                                      Cancelled
                                    </option>
                                  </select>
                                </Form.Group>
                              </Col>
          <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <table
            className="nk-tb-list nk-tb-ulist is-compact"
            data-auto-responsive="false" 
            style={{textAlign: "center"}}
          >
            <thead
              className="border-0 shadow-sm p-2 w-100 mt-2 bg-dark"
              style={{ borderRadius: "30%" }}
            >
              <tr
                className="nk-tb-item nk-tb-head"
                style={{ cursor: "pointer" }}
              >
                <th className="nk-tb-col">
                  <span className="sub-text text-light">Order#</span>
                </th>
                <th className="nk-tb-col">
                  <span className="sub-text text-light">Order Date</span>
                </th>
                <th className="nk-tb-col">
                  <span className="sub-text text-light">Items</span>
                </th>
                <th className="nk-tb-col tb-col-md">
                  <span className="sub-text text-light">Total</span>
                </th>
                <th className="nk-tb-col tb-col-md">
                  <span className="sub-text text-light">Order Status</span>
                </th>
                <th className="nk-tb-col tb-col-md">
                  <span className="sub-text text-light">Payment Status</span>
                </th>
                <th className="nk-tb-col tb-col-lg">
                  <span
                    className="sub-text text-light"
                    
                  >
                    Action
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              { searchByStatus && searchByStatus.length >=1 ? (
                FilteredResults.map((item) => (
                  <tr
                    className="nk-tb-item"
                    style={{ cursor: "pointer" }}
                    key={item.order_id}
                    // onClick={() => GoToOrderDetails(item.order_id)}
                  >
                    <td className="nk-tb-col">
                      <div className="user-name">
                        <span className="tb-lead">{item.reference_no}</span>
                      </div>
                    </td>
                    <td className="nk-tb-col">
                      <div className="user-name">
                        <span className="tb-lead">{item.order_date}</span>
                      </div>
                    </td>
                    <td className="nk-tb-col">
                      <div className="user-name">
                        <span className="tb-lead">{item.quantities}</span>
                      </div>
                    </td>
                    <td className="nk-tb-col tb-col-md">
                      <div className="user-name">
                        <span className="tb-lead">{total_total(item.tax, item.delivery_fee, item.items_total)}</span>
                      </div>
                    </td>
                    <td className="nk-tb-col tb-col-md">
                      <div className="user-name">
                        <span
                          className={
                            item.order_status === "in progress"
                              ? "badge-dark text-light badge text-capitalize px-3 py-1 border-0"
                              : item.order_status === "pick up"
                              ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                              : item.order_status === "delivered"
                              ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                              : item.order_status === "cancelled"
                              ? "badge-danger text-light badge text-capitalize px-3 py-1 border-0"
                              : item.order_status === "on the way"
                              ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                              : "badge text-capitalize px-3 py-1 border-0"
                          }
                        >
                          {item.order_status}
                        </span>
                      </div>
                    </td>
                    <td className="nk-tb-col tb-col-md">
                      <div className="user-name">
                        <span
                          className={
                            item.payment_status === "Paid" ||
                            item.payment_status === "paid"
                              ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                              : item.payment_status === "Un Paid" ||
                                item.payment_status === "unpaid"
                              ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                              : "badge text-capitalize px-3 py-1 border-0"
                          }
                        >
                          {item.payment_status}
                        </span>
                      </div>
                    </td>
                    <td className="nk-tb-col tb-col-lg">
                      <div className="d-inline-flex">
                        <Button
                          variant="contained"
                          className={StylingClasses.Button}
                          onClick={() => GoToOrderDetails(item.order_id)}
                        >
                          View Detail
                        </Button>
                        {/* <Link to="/shop"> */}
                        <Button
                          variant="contained"
                          className={StylingClasses.Button}
                          onClick={() => ReOrder(item.order_id)}
                        >
                          Reorder
                        </Button>
                        {/* </Link> */}
                      </div>
                    </td>
                  </tr>
                ))
              )  : ListOrders.length>=1 ?
                 ( ListOrders.map((item) => (
                    <tr
                      className="nk-tb-item"
                      style={{ cursor: "pointer" }}
                      key={item.order_id}
                      // onClick={() => GoToOrderDetails(item.order_id)}
                    >
                      <td className="nk-tb-col">
                        <div className="user-name">
                          <span className="tb-lead">{item.reference_no}</span>
                        </div>
                      </td>
                      <td className="nk-tb-col">
                        <div className="user-name">
                          <span className="tb-lead">{item.order_date}</span>
                        </div>
                      </td>
                      <td className="nk-tb-col">
                        <div className="user-name">
                          <span className="tb-lead">{item.quantities}</span>
                        </div>
                      </td>
                      <td className="nk-tb-col tb-col-md">
                        <div className="user-name">
                          <span className="tb-lead">{
                          // (item.tax+item.delivery_fee+item.items_total)
                          total_total(item.tax, item.delivery_fee, item.items_total)
                          }</span>
                        </div>
                      </td>
                      <td className="nk-tb-col tb-col-md">
                        <div className="user-name">
                          <span
                            className={
                              item.order_status === "in progress"
                                ? "badge-dark text-light badge text-capitalize px-3 py-1 border-0"
                                : item.order_status === "pick up"
                                ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                : item.order_status === "delivered"
                                ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                : item.order_status === "cancelled"
                                ? "badge-danger text-light badge text-capitalize px-3 py-1 border-0"
                                : item.order_status === "on the way"
                                ? "badge-info text-light badge text-capitalize px-3 py-1 border-0"
                                : "badge text-capitalize px-3 py-1 border-0"
                            }
                          >
                            {item.order_status}
                          </span>
                        </div>
                      </td>
                      <td className="nk-tb-col tb-col-md">
                        <div className="user-name">
                          <span
                            className={
                              item.payment_status === "Paid" ||
                              item.payment_status === "paid"
                                ? "badge-success text-light badge text-capitalize px-3 py-1 border-0"
                                : item.payment_status === "Un Paid" ||
                                  item.payment_status === "unpaid"
                                ? "badge-warning text-light badge text-capitalize px-3 py-1 border-0"
                                : "badge text-capitalize px-3 py-1 border-0"
                            }
                          >
                            {item.payment_status}
                          </span>
                        </div>
                      </td>
                      <td className="nk-tb-col tb-col-lg">
                        <div className="d-inline-flex">
                          <Button
                            variant="contained"
                            className={StylingClasses.Button}
                            onClick={() => GoToOrderDetails(item.order_id)}
                          >
                            View Detail
                          </Button>
                          {/* <Link to="/shop"> */}
                          <Button
                            variant="contained"
                            className={StylingClasses.Button}
                            onClick={() => ReOrder(item.order_id)}
                          >
                            Reorder
                          </Button>
                          {/* </Link> */}
                        </div>
                      </td>
                    </tr>
                  )))
                 : (
                  <tr className="nk-tb-item">
                    <td colSpan={7} align="center" className="py-2">
                      <h4>Data not found!</h4>
                    </td>
                  </tr>
                 )
              }
            </tbody>
          </table>
        </div>

        {/* EMAIL LATER */}
        {/* <div className="EmailSubscribe">
          <div className="container">
            <Row>
              <Col md={7} sm={12}>
                <FaCube className="mr-2 Emailicon float-left" />
                <h2 className="EmailHeading">Be the first to know</h2>
                <h5 className="ml-5">
                  Get all the latest information on Events, Sales and Offers.
                </h5>
              </Col>
              <Col className="col-md-5">
                <div className="d-inline-flex justify-content-end">
                  <Form.Control
                    placeholder="Enter Your Email Address"
                    className="EmailInput"
                  />
                  <Button variant="outline-secondary" className="Button">
                    Subscribe
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
      </LayoutOne>
    </Fragment>
  );
};

// OrderHistory.propTypes = {
//   location: PropTypes.object,

//   addToCart: PropTypes.func,
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (
//       item,
//       addToast,
//       quantityCount,
//       selectedProductColor,
//       selectedProductSize
//     ) => {
//       dispatch(
//         addToCart(
//           item,
//           addToast,
//           quantityCount,
//           selectedProductColor,
//           selectedProductSize
//         )
//       );
//     },
//   };
// };

// export default connect(mapDispatchToProps)(OrderHistory);

OrderHistory.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
    ) => {
      dispatch(
        addToCart(
          item,
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
