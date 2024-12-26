import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button, Col, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import FormSkeleton from "../Skeletons/formSkeleton";

export default function AddProducts() {
  // States
  const [ListProducts, setListProducts] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [Currencies, setCurrencies] = useState([]);
  const [Units, setUnits] = useState([]);
  const [Name, setName] = useState("");
  const [Type, setType] = useState("");
  const [Code, setCode] = useState("");
  const [Brand, setBrand] = useState("");
  const [Category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Unit, setUnit] = useState("");
  const [Price, setPrice] = useState("");
  const [AlertQuantity, setAlertQuantity] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Cost, setCost] = useState("");
  const [Discount, setDiscount] = useState("");
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [Detail, setDetail] = useState("");
  const [Loading, setLoading] = useState(false);

  // Error States
  const [NameError, setNameError] = useState("");
  const [TypeError, setTypeError] = useState("");
  const [CodeError, setCodeError] = useState("");
  const [BrandError, setBrandError] = useState("");
  const [CategoryError, setCategoryError] = useState("");
  const [SubCategoryError, setSubCategoryError] = useState("");
  const [CurrencyError, setCurrencyError] = useState("");
  const [UnitError, setUnitError] = useState("");
  const [PriceError, setPriceError] = useState("");
  const [AlertQuantityError, setAlertQuantityError] = useState("");
  const [QuantityError, setQuantityError] = useState("");
  const [CostError, setCostError] = useState("");
  const [DiscountError, setDiscountError] = useState("");
  const [ImageError, setImageError] = useState("");
  const [DetailError, setDetailError] = useState("");

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // ChangeImage
  const ChangeImage = (e) => {
    e.preventDefault();
    let Reader = new FileReader();
    let FileNameAtZeroIndex = e.target.files[0];

    Reader.onloadend = () => {
      setImage(FileNameAtZeroIndex);
      setSelectedImagePreview(Reader.result);
    };

    Reader.readAsDataURL(FileNameAtZeroIndex);
  };

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      History.push("/");
    }

    let data = {
      email: Email,
      token: Token,
    };

    // Products
    fetch(MyConstants.listProduct, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListProducts(response.products);
        }
      });
    });

    console.log("ListProducts ::", ListProducts);

    // Brands
    fetch(MyConstants.listBrand, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setBrands(response.categories);
        }
      });
    });

    // Categories
    fetch(MyConstants.ListCategories, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setCategories(response.categories);
        }
      });
    });

    // Sub Categories
    fetch(MyConstants.listSubCategories, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setSubCategories(response.sub_categories);
        }
      });
    });

    // Currency
    fetch(MyConstants.listCurrency, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setCurrencies(response.currencies);
        }
      });
    });

    // Units
    fetch(MyConstants.listUnit, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setUnits(response.units);
        }
      });
    });
  }, []);

  const History = useHistory();
  const Navigate = () => History.push("/list-products");
  const NavigateToBackPage = () => History.goBack();

  // isValidDiscount
  // const isValidDiscount = /^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/;

  // ChangeCode
  const ChangeCode = (e) => {
    let data = {
      code: e,
      email: Email,
      token: Token,
    };

    console.log("data ::", data);

    fetch(MyConstants.checkProductCode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == false) {
          // if(e.length > 0) {
          setCodeError(response.message);
          // } else {
          // setCodeError("");
          // }
        } else {
          setCodeError("");
          setCode(e);
        }
      });
    });
  };

  // AddData
  const SubmitForm = () => {
    setLoading(true);
    if (
      Code === "" ||
      Name === "" ||
      Detail === "" ||
      Image === "" ||
      Category === "" ||
      Quantity === "" ||
      AlertQuantity === "" ||
      Brand === "" ||
      Unit === "" ||
      Cost === "" ||
      Price === "" ||
      Type === "" ||
      Discount === "" ||
      Discount < 0 ||
      Price < 0 ||
      Cost < 0 ||
      Quantity < 0 ||
      AlertQuantity < 0
    ) {
      setLoading(false);
      setNameError("Product name is required!");
      setTypeError("Product type is required!");
      setCodeError("Product code is required!");
      setBrandError("Product brand is required!");
      setCategoryError("Product category is required!");
      setUnitError("Product unit is required!");
      setPriceError([
        "Product price is required!",
        "Product price is invalid! Only positive numbers are allowed",
      ]);
      setDiscountError(
        "Product discount is invalid! Only positive numbers are allowed"
      );
      setAlertQuantityError([
        "Product alert quantity is required!",
        "Product alert quantity is invalid! Only positive numbers are allowed",
      ]);
      setQuantityError([
        "Product quantity is required!",
        "Product quantity is invalid! Only positive numbers are allowed",
      ]);
      // setCurrencyError("Product currency is required!");
      setCostError([
        "Product cost is required!",
        "Product cost is invalid! Only positive numbers are allowed",
      ]);
      setDetailError("Product detail is required!");
      setImageError([
        "Product Image is required!",
        "File is too Large, please select a file less than 10mb!",
        " File is too Small, please select a file greater than 2mb!",
        "Select valid image format as jpeg, jpg, jfif, png or webp!",
      ]);
    } else {
      const formData = new FormData();
      formData.append("alert_quantity", AlertQuantity);
      formData.append("detail", Detail);
      formData.append("unit", Unit);
      formData.append("name", Name);
      formData.append("quantity", Quantity);
      formData.append("sub_category", SubCategory);
      formData.append("type", Type);
      formData.append("price", Price);
      formData.append("brand", Brand);
      formData.append("cost", Cost);
      formData.append("code", Code);
      formData.append("discount", Discount);
      formData.append("image", Image);
      formData.append("parent_category", Category);
      formData.append("email", Email);
      formData.append("token", Token);

      for (var pair of formData.entries()) {
        console.log('formData', pair); 
    }    

      // axios
      //   .post(MyConstants.addProduct, formData)
      //   .then((result) => {
      //     if (result.data.status == true) {
      //       console.log(result.data.message);
      //       console.log(result.data);
      //       setLoading(false);
      //       History.push("/list-products");
      //       swal({
      //         title: "Success!",
      //         text: "New product has been addedd successfully!",
      //         icon: "success",
      //         button: "Ok",
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("Error ::", error);
      //   });
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
              {!Loading ? (
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
                                  Add Products
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
                                  onClick={Navigate}
                                >
                                  <em className="icon ni ni-list" />
                                  <span>Products List</span>
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
                                    <label className="form-label" htmlFor="">
                                      Product Name
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
                                      name="name"
                                      placeholder="Enter Product Name"
                                      onChange={(e) => setName(e.target.value)}
                                    />
                                    {Name === "" && (
                                      <small className="text-danger">
                                        {NameError}
                                      </small>
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Type
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
                                      name="type"
                                      onChange={(e) => setType(e.target.value)}
                                    >
                                      <option>Select Product Type</option>
                                      <option value="1">Food</option>
                                    </select>
                                    {Type === "" && (
                                      <small className="text-danger">
                                        {TypeError}
                                      </small>
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Code
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
                                      name="code"
                                      placeholder="Enter Product Code"
                                      // onChange={(e) => setCode(e.target.value)}
                                      onChange={(e) =>
                                        ChangeCode(e.target.value)
                                      }
                                    />
                                    {Code === "" && (
                                      <small className="text-danger">
                                        {CodeError}
                                      </small>
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Brand
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
                                      name="brand"
                                      onChange={(e) => setBrand(e.target.value)}
                                    >
                                      <option>Select Brand</option>
                                      {Brands &&
                                        Brands.map((item) => (
                                          <option value={item.id}>
                                            {item.name}
                                          </option>
                                        ))}
                                    </select>
                                    {Brand === "" && (
                                      <small className="text-danger">
                                        {BrandError}
                                      </small>
                                    )}
                                    <div className="row mt-3"></div>
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Category
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
                                      name="parent_category"
                                      onChange={(e) =>
                                        setCategory(e.target.value)
                                      }
                                    >
                                      <option>Select Category</option>
                                      {Categories.map((item) => (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                    {Category === "" && (
                                      <small className="text-danger">
                                        {CategoryError}
                                      </small>
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Sub Category
                                    </label>
                                    <small
                                      style={{
                                        color: "red",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (Optional)
                                    </small>
                                    <select
                                      className="form-control custom-select"
                                      name="sub_category"
                                      onChange={(e) =>
                                        setSubCategory(e.target.value)
                                      }
                                    >
                                      <option>Select Sub Category</option>
                                      {SubCategories.map((item) => (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Units
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
                                      name="unit"
                                      onChange={(e) => setUnit(e.target.value)}
                                    >
                                      <option>Select Units</option>
                                      {Units.map((item) => (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                    {Unit === "" && (
                                      <small className="text-danger">
                                        {UnitError}
                                      </small>
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Price
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
                                      name="price"
                                      placeholder="Enter Product Price"
                                      onChange={(e) => setPrice(e.target.value)}
                                    />
                                    {Price === "" ? (
                                      <small className="text-danger">
                                        {PriceError[0]}
                                      </small>
                                    ) : Price < 0 ? (
                                      <small className="text-danger">
                                        {PriceError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Alert Quantity
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
                                      name="alert_quantity"
                                      placeholder="Enter Alert Quantity"
                                      onChange={(e) =>
                                        setAlertQuantity(e.target.value)
                                      }
                                    />
                                    {AlertQuantity === "" ? (
                                      <small className="text-danger">
                                        {AlertQuantityError[0]}
                                      </small>
                                    ) : AlertQuantity < 0 ? (
                                      <small className="text-danger">
                                        {AlertQuantityError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Quantity
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
                                    {Quantity === "" ? (
                                      <small className="text-danger">
                                        {QuantityError[0]}
                                      </small>
                                    ) : Quantity < 0 ? (
                                      <small className="text-danger">
                                        {QuantityError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <label className="form-label" htmlFor="">
                                      Product Cost
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
                                      name="cost"
                                      placeholder="Enter Cost"
                                      onChange={(e) => setCost(e.target.value)}
                                    />
                                    {Cost === "" ? (
                                      <small className="text-danger">
                                        {CostError[0]}
                                      </small>
                                    ) : Cost < 0 ? (
                                      <small className="text-danger">
                                        {CostError[1]}
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <Col md="6" sm="12">
                                    <div className="form-group">
                                      <label
                                        className="form-label"
                                        htmlFor="discount"
                                      >
                                        Product Discount
                                      </label>
                                      <small
                                        style={{
                                          color: "red",
                                          marginLeft: "4px",
                                        }}
                                      >
                                        (Optional)
                                      </small>
                                      <div className="form-control-wrap">
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="discount"
                                          placeholder="Enter Discount"
                                          onChange={(e) =>
                                            setDiscount(e.target.value)
                                          }
                                        />
                                        {Discount === "" ? (
                                          ""
                                        ) : Discount < 0 ? (
                                          <small className="text-danger">
                                            {DiscountError}
                                          </small>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </Col>
                                </div>
                                <div className="row mt-3">
                                  <Col md="10" sm="12">
                                    <div className="form-group">
                                      <label
                                        className="form-label"
                                        htmlFor="name"
                                      >
                                        Product Image
                                      </label>
                                      <span
                                        style={{
                                          color: "red",
                                          marginLeft: "2px",
                                        }}
                                      >
                                        *
                                      </span>

                                      <div className="custom-file">
                                        <input
                                          className="custom-file-input"
                                          type="file"
                                          accept="image/*"
                                          id="image"
                                          name="image"
                                          onChange={(e) => {
                                            ChangeImage(e);
                                          }}
                                        />
                                        <label
                                          className="custom-file-label"
                                          htmlFor="customFile"
                                        >
                                          {Image === ""
                                            ? "Choose Image..."
                                            : Image.name}
                                        </label>
                                      </div>

                                      {Image === "" ? (
                                        <small className="text-danger">
                                          {ImageError[0]}
                                        </small>
                                      ) : Image.size >= 10000 ? (
                                        <small className="text-danger">
                                          {ImageError[1]}
                                        </small>
                                      ) : Image.size <= 2000 ? (
                                        <small className="text-danger">
                                          {ImageError[2]}
                                        </small>
                                      ) : "image/jpeg" !== Image.type &&
                                        "image/jpg" !== Image.type &&
                                        "image/jfif" !== Image.type &&
                                        "image/webp" !== Image.type &&
                                        "image/png" !== Image.type ? (
                                        <small className="text-danger">
                                          {ImageError[3]}
                                        </small>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </Col>
                                  <Col md="2" sm="12" className="mt-3 mt-md-0">
                                    <img
                                      src={
                                        SelectedImagePreview !== ""
                                          ? SelectedImagePreview
                                          : "sample.jpg"
                                      }
                                      alt="Image"
                                      className="rounded-circle"
                                      height={80}
                                      width={80}
                                    />
                                  </Col>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-12">
                                    <label className="form-label" htmlFor="">
                                      Product Details
                                    </label>
                                    <span
                                      style={{
                                        color: "red",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      *
                                    </span>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      name="detail"
                                      data={Detail}
                                      onChange={(e, editor) => {
                                        setDetail(editor.getData());
                                      }}
                                    />
                                    {Detail === "" && (
                                      <small className="text-danger">
                                        {DetailError}
                                      </small>
                                    )}
                                  </div>
                                </div>

                                <div className="modal-footer mt-3"></div>
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
                                    onClick={SubmitForm}
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
                                      <>Add Product</>
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
              ) : (
                <FormSkeleton />
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
    </div>
  );
}
