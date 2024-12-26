import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Row, Col, Form } from "react-bootstrap";
import swal from "sweetalert";

export default function AddPurchase() {
  //GET CURRENT DATE
  const ref = useRef(null);
  let SubTotal = 0;
  let Total = 0;

  const History = useHistory();
  const NavigateTo = () => History.push("/list-purchase");
  const NavigateToBackPage = () => History.goBack();

  const [current_date, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [invoice_no, setInvoiceNo] = useState("");
  const [supplier, setSupplier] = useState("");
  const [currency, setCurrency] = useState("");
  const [product_id, setProductID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [delivery_charges, setDeliveryCharges] = useState(0);
  const [payment_status, setPaymentStatus] = useState("");

  const [cost_price, setCostPrice] = useState("");

  const [biller, setBiller] = useState("");
  const [discount, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [purchace_price, setPurchacePrice] = useState("");
  const [Loading, setLoading] = useState(false);
  const [ListSuppliers, setListSuppliers] = useState([]);
  const [ListProducts, setListProducts] = useState([]);
  const [ListCurrencies, setListCurrencies] = useState([]);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const setting = JSON.parse(localStorage.getItem("general_set"));
  const currency_id = setting.currency_id;
  const currency_symbol = setting.currency_symbol;

  //ERROR STATES FOR VALIDATION

  const [InvoiceError, setInvoiceError] = useState("");
  const [SupplierError, setSupplierError] = useState("");
  const [CurrencyError, setCurrencyError] = useState("");
  const [ProductError, setProductError] = useState("");
  const [PaymentStatusError, setPaymentStatusError] = useState("");
  const [CostPriceError, setCostPriceError] = useState("");
  const [QuantityError, setQuantityError] = useState("");
  const [DeliveryChargesError, setDeliveryChargesError] = useState("");

  // GetData
  const GetData = () => {
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.addPurchaseForm, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListSuppliers(response.suppliers);
          setListProducts(response.products);
          setListCurrencies(response.currencies);
        }
      });
    });
  };
  useEffect(() => {
    GetData();
  }, []);

  console.log("product_id ::", product_id);

  // GetProductCostprice
  const GetProductCostprice = (e) => {
    console.log("ProductID ::", e);
    setProductID(e);

    ListProducts.map((item) => {
      return e == item.id ? setCostPrice(item.cost) : "";
    });
  };

  // purchase_items
  const purchase_items = [];

  for (let index = 0; index < ListProducts.length; index++) {
    if (product_id == ListProducts[index]["id"]) {
      const element = {
        id: ListProducts[index]["id"],
        cost_price:
          cost_price === "" ? ListProducts[index]["cost"] : cost_price,
        sale_price: ListProducts[index]["price"],
        quantity: quantity,
      };
      purchase_items.push(element);
      SubTotal += cost_price * quantity;
      Total += Number(delivery_charges) + Number(cost_price * quantity);
    }
  }

  // SubmitForm
  const SubmitForm = () => {
    setLoading(true);
    //VALIDATION FOR FORM
    if (
      invoice_no === "" ||
      supplier === "" ||
      // currency === "" ||
      product_id === "" ||
      payment_status === "" ||
      cost_price === "" ||
      quantity === "" ||
      delivery_charges === ""
    ) {
      setLoading(false);
      setInvoiceError([
        "invoice no is required!",
        "invoice no is invalid! Only positive numbers are allowed",
      ]);
      setSupplierError("Please Select Supplier");
      // setCurrencyError("Please Select Currency");
      setProductError("Please Select Product");
      setPaymentStatusError("Please Select Payment Status");
      setCostPriceError([
        "Cost price is required!",
        "Cost price is invalid! Only positive numbers are allowed",
      ]);
      setQuantityError([
        "Quantity is required!",
        "Quantity is invalid! Only positive numbers are allowed",
      ]);
      setDeliveryChargesError([
        "Delivery charges is required!",
        "Delivery charges is invalid! Only positive numbers are allowed",
      ]);
    }
    let data = {
      date: current_date,
      invoice_no: invoice_no,
      supplier_id: supplier,
      currency_id: currency_id,
      payment_status: payment_status,
      delivery_charges: delivery_charges,
      total: Total,
      purchase_items: purchase_items,
      email: Email,
      token: Token,
    };

    console.log("DataPurchase ::", data);
    fetch(MyConstants.AddPurchase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          setLoading(false);
          History.push("/list-purchase");
          swal({
            title: "Success!",
            text: "New purchase has been addedd successfully!",
            icon: "success",
            button: "Ok",
          });
        }
      });
    });
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
                                Add Purchase
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
                              <form>
                                <div className="row">
                                  <div className="col-6">
                                    <label className="form-label">Date</label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="date"
                                      ref={ref}
                                      defaultValue={current_date}
                                      onChange={(e) =>
                                        setCurrentDate(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label">
                                      Invoice No
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="invoice_no"
                                      placeholder="Enter Invoice No."
                                      onChange={(e) =>
                                        setInvoiceNo(e.target.value)
                                      }
                                    />
                                    {invoice_no === "" ? (
                                      <small className="text-danger">
                                        {InvoiceError[0]}
                                      </small>
                                    ) : invoice_no < 0 ? (
                                      <small className="text-danger">
                                        {InvoiceError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label">
                                      Supplier
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <select
                                      className="form-control custom-select"
                                      placeholder="Select Supplier"
                                      name="supplier_id"
                                      onChange={(e) =>
                                        setSupplier(e.target.value)
                                      }
                                    >
                                      <option>Select Supplier</option>
                                      {ListSuppliers.map((item, index) => (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                    {supplier === "" && (
                                      <small className="text-danger">
                                        {SupplierError}
                                      </small>
                                    )}
                                  </div>
                                  {/* <div className="col-6">
                                    <label className="form-label">
                                      Currency
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <select
                                      className="form-control custom-select"
                                      placeholder="Select Currency"
                                      name="currency_id"
                                      onChange={(e) =>
                                        setCurrency(e.target.value)
                                      }
                                    >
                                      <option>Select Currency</option>
                                      {ListCurrencies.map((item, index) => (
                                        <option key={index} value={item.id}>
                                          {item.symbol}
                                        </option>
                                      ))}
                                    </select>
                                    {currency === "" && (
                                      <small className="text-danger">
                                        {CurrencyError}
                                      </small>
                                    )}
                                  </div> */}
                                </div>
                                <div className="row mt-3">
                                  <div className="col-12">
                                    <label className="form-label">
                                      Product
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <select
                                      className="form-control custom-select"
                                      placeholder="Select Product"
                                      onChange={(e) =>
                                        GetProductCostprice(e.target.value)
                                      }
                                    >
                                      <option>Select Product</option>
                                      {ListProducts.map((item, index) => (
                                        <option key={index} value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                    {product_id === "" && (
                                      <small className="text-danger">
                                        {ProductError}
                                      </small>
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label">
                                      Payment Status
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <select
                                      className="form-control custom-select"
                                      name="payment_status"
                                      onChange={(e) =>
                                        setPaymentStatus(e.target.value)
                                      }
                                    >
                                      <option>Select Payment Status</option>
                                      <option value="paid">Paid</option>
                                      <option value="unpaid">Un Paid</option>
                                      <option value="partial">Partial</option>
                                    </select>
                                    {payment_status === "" && (
                                      <small className="text-danger">
                                        {PaymentStatusError}
                                      </small>
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label">
                                      Purchase Price
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="cost_price"
                                      placeholder="Enter Purchace Price"
                                      value={cost_price}
                                      onChange={(e) =>
                                        setCostPrice(e.target.value)
                                      }
                                    />
                                    {cost_price === "" ? (
                                      <small className="text-danger">
                                        {CostPriceError[0]}
                                      </small>
                                    ) : cost_price < 0 ? (
                                      <small className="text-danger">
                                        {CostPriceError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label">
                                      Quantity
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="quantity"
                                      placeholder="Enter Product Quantity"
                                      onChange={(e) =>
                                        setQuantity(e.target.value)
                                      }
                                    />
                                    {quantity === "" ? (
                                      <small className="text-danger">
                                        {QuantityError[0]}
                                      </small>
                                    ) : quantity < 0 ? (
                                      <small className="text-danger">
                                        {QuantityError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label">
                                      Delivery Charges
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="delivery_charges"
                                      placeholder="Enter Delivery Charges"
                                      onChange={(e) =>
                                        setDeliveryCharges(e.target.value)
                                      }
                                      value={delivery_charges}
                                    />
                                    {delivery_charges === "" ? (
                                      <small className="text-danger">
                                        {DeliveryChargesError[0]}
                                      </small>
                                    ) : delivery_charges < 0 ? (
                                      <small className="text-danger">
                                        {DeliveryChargesError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                {/* <hr />
                                <h3 className="text-capitalize mt-3">
                                  order items
                                </h3>
                                <div className="custom-control custom-control-sm custom-checkbox my-4">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="com-email"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="com-email"
                                  >
                                    <h4>More Options</h4>
                                  </label>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label">
                                      Order Tax
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <select className="form-control custom-select">
                                      <option>No Tax</option>
                                      <option>VAT @ 10%</option>
                                      <option>GST @ 6%</option>
                                      <option>VAT @ 20%</option>
                                    </select>
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label">
                                      Discount (5/5%)
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="discount"
                                      placeholder="Enter Discount"
                                      onChange={(e) =>
                                        setDiscount(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label">
                                      Shipping
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="shipping"
                                      placeholder="Enter Shipping"
                                      onChange={(e) =>
                                        setShipping(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label">
                                      Payment Term
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="payment_term"
                                      placeholder="Enter Payment Term"
                                      onChange={(e) =>
                                        setPaymentTerm(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label">Note</label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <CKEditor editor={ClassicEditor} />
                                  </div>
                                </div> */}

                                <hr />
                                <Row>
                                  <Col></Col>
                                  <Col className="mt-3">
                                    <h2>Total Due</h2>
                                    <hr />
                                    <h4 className="ml-3">
                                      Sub Total
                                      <span className="font-weight-medium float-right mr-3">
                                        {currency_symbol + SubTotal}
                                      </span>
                                    </h4>
                                    <hr />
                                    <h4 className="ml-3">
                                      Delivery Charges
                                      <span className="font-weight-medium float-right mr-3">
                                        {currency_symbol + delivery_charges}
                                      </span>
                                    </h4>
                                    <hr />
                                    <h4 className="ml-3">
                                      Total{" "}
                                      <span className="font-weight-medium float-right mr-3">
                                        {currency_symbol + Total}
                                      </span>
                                    </h4>
                                  </Col>
                                </Row>
                                <hr />
                                <div className="form-group float-right">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger mr-2"
                                    onClick={NavigateToBackPage}
                                  >
                                    Cancel
                                  </button>
                                  {/* <button
                                    type="reset"
                                    className="btn btn-sm btn-success mr-2"
                                  >
                                    Reset
                                  </button> */}
                                  <button
                                    type="button"
                                    onClick={SubmitForm}
                                    className="btn btn-sm btn-primary"
                                    style={{
                                      backgroundColor: "#398E8B",
                                      border: "#398E8B",
                                      outline: "none",
                                      boxShadow: "none",
                                    }}
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
                                      <>Submit</>
                                    )}
                                  </button>
                                </div>
                              </form>
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
              {/* ) : (
                <PurchaseFormSkeleton />
              )} */}
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
