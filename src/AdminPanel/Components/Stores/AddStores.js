import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as MyConstants from "../../Constant/Config";
import axios from "axios";
import swal from "sweetalert";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function AddStores({ closeModal, edit }) {
  const Outline = {
    boxShadow: "none",
    borderColor: "#398E8B",
    backgroundColor: "transparent",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Token = LoginUser.token;

  // Get Users Data
  const [Sellers, setSellers] = useState([]);
  // Get Categories Data
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
    };

    // listSellers
    fetch(MyConstants.listSellers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setSellers(response.sellers);
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
  }, []);

  // AddData
  const SubmitForm = (Data) => {
    console.log("Data ::", Data);

    const formData = new FormData();
    formData.append("name", Data.name);
    formData.append("code", Data.code);
    formData.append("email", Data.email);
    formData.append("address", Data.address);
    formData.append("phone", Data.phone);
    formData.append("commission", Data.commission);
    formData.append("user_id", Data.user_id);
    formData.append("category_id", Data.category_id);
    formData.append("phone", Data.phone);
    formData.append("image", Data.image[0]);
    formData.append("email", Email);
    formData.append("token", Token);
    axios.post(MyConstants.addStores, formData).then((result) => {
      if (result.data.status == true) {
        closeModal(true);
        edit();
        swal({
          title: "Success!",
          text: result.data.message,
          icon: "success",
          button: "Ok",
        });
      }
    });
  };

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="code">
              Code
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="Enter Code"
                style={Outline}
                {...register("code", {
                  required: "Store Code is required!",
                })}
              />
            </div>
            {errors.code && (
              <small className="text-danger">{errors.code.message}</small>
            )}
          </div>
        </Col>
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Store Name"
                style={Outline}
                {...register("name", {
                  required: "Store Name is required!",
                })}
              />
            </div>
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              Comission
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <input
              type="number"
              className="form-control"
              name="comission"
              placeholder="Enter Comission"
              style={Outline}
              {...register("comission", {
                required: "Store Comission is required!",
              })}
            />
          </div>
          {errors.comission && (
            <small className="text-danger">{errors.comission.message}</small>
          )}
        </Col>
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              Sellers
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <select
              className="form-control custom-select"
              {...register("user_id", {
                required: "Sellers is required!",
              })}
            >
              <option>Select Seller</option>
              {Sellers.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          {errors.user_id && (
            <small className="text-danger">{errors.user_id.message}</small>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="price_group">
              Categories
            </label>
            <div className="form-control-wrap">
              <select
                className="form-control custom-select"
                // value={Data.category_id}
                {...register("category_id", {
                  required: "Category is required!",
                })}
              >
                <option>Select Category</option>
                {Categories.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            {errors.category_id && (
              <small className="text-danger">
                {errors.category_id.message}
              </small>
            )}
          </div>
        </Col>
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="contact_no">
              Store Contact No
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="number"
                className="form-control"
                name="phone"
                placeholder="Enter Contact No"
                style={Outline}
                {...register("phone", {
                  required: "Phone no is required!",
                  maxLength: {
                    value: 11,
                    message:
                      "Invalid phone number it containes maximum 11 characters!",
                  },
                  minLength: {
                    value: 11,
                    message:
                      "Invalid phone number it containes minimum 11 characters!",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email Address"
                style={Outline}
                {...register("email", {
                  required: "Email Address is required!",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email!",
                  },
                })}
              />
            </div>
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>
        </Col>
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Enter Address"
                style={Outline}
                {...register("address", {
                  required: "Address is required!",
                })}
              />
            </div>
            {errors.address && (
              <small className="text-danger">{errors.address.message}</small>
            )}
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              name="image"
              style={{ border: "none", background: "none" }}
              {...register("image", {
                required: "Image is required!",
              })}
            />
            {errors.image && (
              <small className="text-danger">{errors.image.message}</small>
            )}
          </div>
        </Col>
        <Col></Col>
      </Row>

      <div className="modal-footer bg-white"></div>
      <div className="form-group float-right">
        <button
          type="button"
          className="btn btn-sm btn-danger mr-2"
          onClick={closeModal}
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
          type="button"
          onClick={handleSubmit(SubmitForm)}
        >
          Add Store
        </button>
      </div>
    </div>
  );
}
