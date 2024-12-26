import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button, Col, Spinner } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function EditProducts() {
  const Location = useLocation();

  const ProductID = Location.state.product_id;

  // States
  const [Brands, setBrands] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [Currencies, setCurrenies] = useState([]);
  const [Units, setUnits] = useState([]);
  const [EditProduct, setEditProduct] = useState([]);
  const [Loading, setLoading] = useState(false);

  console.log("EditProduct ::", EditProduct);

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // ChangeImage
  const ChangeImage = (e) => {
    e.preventDefault();
    console.log("Image_Name_Inner ::", e.target.files[0].name);
    let Reader = new FileReader();
    let FileNameAtZeroIndex = e.target.files[0];

    Reader.onloadend = () => {
      setImage(FileNameAtZeroIndex);
      setSelectedImagePreview(Reader.result);
    };

    Reader.readAsDataURL(FileNameAtZeroIndex);
  };

  // onInputEditValue
  const onInputEditValue = (e) => {
    setEditProduct({
      ...EditProduct,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      History.push("/");
    }

    let data = {
      email: Email,
      token: Token,
      id: ProductID,
    };

    // EditProducts
    fetch(MyConstants.editProduct, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setBrands(response.products.brand);
          setCategories(response.products.category);
          setSubCategories(response.products.sub_category);
          setCurrenies(response.products.currency);
          setEditProduct(response.products.products);
          setUnits(response.products.unit);
        }
      });
    });
  }, []);

  console.log("EditProduct ::", EditProduct);
  console.log("Categories ::", Categories);

  // States
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [Detail, setDetail] = useState("");
  console.log("Detail ::", Detail);

  const History = useHistory();
  const NavigateTo = () => History.push("/list-products");
  const NavigateToBackPage = () => History.goBack();

  // isValidDiscount
  const isValidDiscount = /^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/;

  const UpdateData = () => {
    console.log("EditProduct.discount ", typeof EditProduct.discount);
    setLoading(true);
    if (
      // EditProduct.code === "" ||
      EditProduct.name === "" ||
      Detail === "" ||
      EditProduct.parent_category === "" ||
      EditProduct.quantity === "" ||
      EditProduct.alert_quantity === "" ||
      EditProduct.brand === "" ||
      EditProduct.unit === "" ||
      EditProduct.cost === "" ||
      EditProduct.type === "" ||
      EditProduct.currency === "" ||
      EditProduct.price === "" ||
      EditProduct.discount === "" ||
      EditProduct.discount < 0 ||
      EditProduct.cost < 0 ||
      EditProduct.price < 0 ||
      EditProduct.quantity < 0 ||
      EditProduct.alert_quantity < 0
    ) {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      console.log("EditProductElse ::", EditProduct);

      const formData = new FormData();
      formData.append("id", ProductID);
      formData.append("alert_quantity", EditProduct.alert_quantity);
      formData.append("detail", Detail);
      formData.append("unit", EditProduct.unit);
      formData.append("name", EditProduct.name);
      formData.append("quantity", EditProduct.quantity);
      formData.append("sub_category", EditProduct.sub_category);
      formData.append("type", EditProduct.type);
      formData.append("price", EditProduct.price);
      formData.append("brand", EditProduct.brand);
      formData.append("cost", EditProduct.cost);
      // formData.append("code", EditProduct.code);
      formData.append("currency", EditProduct.currency);
      formData.append("discount", EditProduct.discount);
      formData.append("image", Image);
      formData.append("parent_category", EditProduct.category);
      formData.append("email", Email);
      formData.append("token", Token);

      for (const value of formData.entries()) {
        console.log("values :::", value[0]);
      }

      // return;

      axios
        .post(MyConstants.updateProduct, formData)
        .then((result) => {
          console.log("Response ::", result);
          if (result.data.status == true) {
            console.log("JsonResponse ::", result.data);
            console.log("Message ::", result.data.message);
            setLoading(false);
            NavigateTo();
            swal({
              title: "Success!",
              text: "Product has been updated successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        })
        .catch((error) => {
          console.log("CatchError ::", error);
        });
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
                                Edit Products
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
                                    Code
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    placeholder="Enter Product Code"
                                    defaultValue={EditProduct.code}
                                    // onChange={onInputEditValue}
                                    disabled
                                  />
                                  {/* {EditProduct.code === "" && (
                                    <small className="text-danger">
                                      Code is required!
                                    </small>
                                  )} */}
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Product Name
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Product Name"
                                    defaultValue={EditProduct.name}
                                    onChange={onInputEditValue}
                                  />
                                  {EditProduct.name === "" && (
                                    <small className="text-danger">
                                      Name is required!
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Type
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <select
                                    className="form-control custom-select"
                                    name="type"
                                    onChange={onInputEditValue}
                                  >
                                    <option>Select Product Type</option>
                                    <option
                                      value="1"
                                      selected={
                                        EditProduct.type === "1"
                                          ? "selected"
                                          : ""
                                      }
                                    >
                                      Food
                                    </option>
                                  </select>
                                  {EditProduct.type === "" && (
                                    <small className="text-danger">
                                      Type is required!
                                    </small>
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Brand
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <select
                                    className="form-control custom-select"
                                    name="brand"
                                    onChange={onInputEditValue}
                                  >
                                    <option>Select Brand</option>
                                    {Brands.map((item) =>
                                      EditProduct.brand == item.id ? (
                                        <option value={item.id} selected>
                                          {item.name}
                                        </option>
                                      ) : (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  {EditProduct.brand === "" ? (
                                    <small className="text-danger">
                                      Brand is required!
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                  <div className="row mt-3"></div>
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Category
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <select
                                    className="form-control custom-select"
                                    name="category"
                                    onChange={onInputEditValue}
                                  >
                                    <option>Select Category</option>
                                    {Categories.map((item) =>
                                      EditProduct.category == item.id ? (
                                        <option value={item.id} selected>
                                          {item.name}
                                        </option>
                                      ) : (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  {EditProduct.parent_category === "" ? (
                                    <small className="text-danger">
                                      Category is required!
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Sub Category
                                  </label>
                                  <small
                                    style={{ color: "red", marginLeft: "4px" }}
                                  >
                                    (Optional)
                                  </small>
                                  <select
                                    className="form-control custom-select"
                                    name="sub_category"
                                    onChange={onInputEditValue}
                                  >
                                    <option>Select Sub Category</option>
                                    {SubCategories.map((item) =>
                                      EditProduct.sub_category == item.id ? (
                                        <option value={item.id} selected>
                                          {item.name}
                                        </option>
                                      ) : (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Units
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <select
                                    className="form-control custom-select"
                                    name="unit"
                                    onChange={onInputEditValue}
                                  >
                                    <option>Select Units</option>
                                    {Units.map((item) =>
                                      EditProduct.unit == item.id ? (
                                        <option value={item.id} selected>
                                          {item.name}
                                        </option>
                                      ) : (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  {EditProduct.unit === "" ? (
                                    <small className="text-danger">
                                      Unit is required!
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Price
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    placeholder="Enter Product Price"
                                    defaultValue={EditProduct.price}
                                    onChange={onInputEditValue}
                                  />
                                  {EditProduct.price === "" ? (
                                    <small className="text-danger">
                                      Price is required!
                                    </small>
                                  ) : EditProduct.price < 0 ? (
                                    <small className="text-danger">
                                      Product price is invalid! Only positive
                                      numbers are allowed
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
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="alert_quantity"
                                    placeholder="Enter Alert Quantity"
                                    defaultValue={EditProduct.alert_quantity}
                                    onChange={onInputEditValue}
                                  />
                                  {EditProduct.alert_quantity === "" ? (
                                    <small className="text-danger">
                                      Alert Quantity is required!
                                    </small>
                                  ) : EditProduct.alert_quantity < 0 ? (
                                    <small className="text-danger">
                                      Product alert quantity is invalid! Only
                                      positive numbers are allowed
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Quantity
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    defaultValue={EditProduct.quantity}
                                    placeholder="Enter Product Quantity"
                                    onChange={onInputEditValue}
                                  />
                                  {EditProduct.quantity === "" ? (
                                    <small className="text-danger">
                                      Quantity is required!
                                    </small>
                                  ) : EditProduct.quantity < 0 ? (
                                    <small className="text-danger">
                                      Product quantity is invalid! Only positive
                                      numbers are allowed
                                    </small>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-6">
                                  <label className="form-label" htmlFor="">
                                    Cost
                                  </label>
                                  <span
                                    style={{ color: "red", marginLeft: "2px" }}
                                  >
                                    *
                                  </span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="cost"
                                    placeholder="Enter Cost"
                                    defaultValue={EditProduct.cost}
                                    onChange={onInputEditValue}
                                  />
                                  {EditProduct.cost === "" ? (
                                    <small className="text-danger">
                                      Cost is required!
                                    </small>
                                  ) : EditProduct.cost < 0 ? (
                                    <small className="text-danger">
                                      Product cost is invalid! Only positive
                                      numbers are allowed
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
                                      Discount
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
                                        defaultValue={EditProduct.discount}
                                        onChange={onInputEditValue}
                                      />
                                      {EditProduct.discount === "" ? (
                                        ""
                                      ) : EditProduct.discount < 0 ? (
                                        <small className="text-danger">
                                          Product discount is invalid! Only
                                          positive numbers are allowed
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
                                      Image
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
                                        accept="image/png, image/gif, image/jpeg"
                                        id="image"
                                        name="image"
                                        onChange={ChangeImage}
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                      >
                                        {Image === ""
                                          ? EditProduct.image
                                          : Image.name}
                                      </label>
                                    </div>
                                    {EditProduct.image === "" ? (
                                      <small className="text-danger">
                                        Image is required!
                                      </small>
                                    ) : Image.size >= 10000 ? (
                                      <small className="text-danger">
                                        File is too Large, please select a file
                                        less than 10mb!
                                      </small>
                                    ) : Image.size <= 2000 ? (
                                      <small className="text-danger">
                                        File is too Small, please select a file
                                        greater than 2mb!
                                      </small>
                                    ) : (
                                      ""
                                    )}

                                    {EditProduct.image === null ? (
                                      "image/jpeg" !== Image.type &&
                                      "image/jpg" !== Image.type &&
                                      "image/jfif" !== Image.type &&
                                      "image/webp" !== Image.type &&
                                      "image/png" !== Image.type ? (
                                        <small className="text-danger">
                                          Select valid image format as jpeg,
                                          jpg, jfif, png or webp!
                                        </small>
                                      ) : (
                                        ""
                                      )
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
                                        : MyConstants.ImageUrl +
                                          `${EditProduct.image}`
                                    }
                                    alt="product"
                                    className="rounded-circle"
                                    height={80}
                                    width={80}
                                  />
                                </Col>
                              </div>
                              <div className="row mt-3">
                                <Col>
                                  <div className="form-group">
                                    <label
                                      className="form-label"
                                      htmlFor="description"
                                    >
                                      Detail
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
                                      data={EditProduct.detail}
                                      onChange={(e, editor) => {
                                        setDetail(editor.getData());
                                      }}
                                    />
                                    {Detail === "" ? (
                                      <small className="text-danger">
                                        Detail is required!
                                      </small>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </Col>
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
                                  onClick={UpdateData}
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
                                    <>Update Product</>
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
