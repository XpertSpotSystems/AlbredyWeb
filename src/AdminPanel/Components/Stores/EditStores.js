import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as MyConstants from "../../Constant/Config";
import axios from "axios";
import swal from "sweetalert";
import { Col, Row } from "react-bootstrap";

export default function EditStores({
  closeModal,
  edit,
  id,
  name,
  code,
  email,
  address,
  phone,
  commission,
  user_id,
  category_id,
}) {
  const Outline = {
    boxShadow: "none",
    borderColor: "#398E8B",
    backgroundColor: "transparent",
  };

  const [image, setImage] = useState("");
  const [EditStores, setEditStores] = useState({
    id: id,
    name: name,
    code: code,
    email: email,
    address: address,
    phone: phone,
    commission: commission,
    user_id: user_id,
    category_id: category_id,
  });

  const [sellers, setSellers] = useState([]);
  const [categories, setCategories] = useState([]);

  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Token = LoginUser.token;

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
    };
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

  const onInputEditValue = (e) => {
    setEditStores({ ...EditStores, [e.target.name]: e.target.value });
  };
  console.log("USERS DATA ===", EditStores);

  const UpdateData = () => {
    console.log(EditStores);
    console.log(image);
    const formData = new FormData();
    formData.append("id", EditStores.id);
    formData.append("name", EditStores.name);
    formData.append("code", EditStores.code);
    formData.append("email", EditStores.email);
    formData.append("address", EditStores.address);
    formData.append("phone", EditStores.phone);
    formData.append("commission", EditStores.commission);
    formData.append("user_id", EditStores.user_id);
    formData.append("category_id", EditStores.category_id);
    formData.append("image", image);
    formData.append("email", Email);
    formData.append("token", Token);
    axios.post(MyConstants.updateStores, formData).then((result) => {
      if (result.data.status == true) {
        console.log(result.data.message);
        closeModal(true);
        edit();
        swal({
          title: "Success!",
          text: "Store has been updated successfully!",
          icon: "success",
          button: "Ok",
        });
      }
    });
    axios({
      method: "POST",
      url: MyConstants.updateStores,
      body: {
        name: EditStores.name,
        id: EditStores.id,
        code: EditStores.code,
        email: EditStores.email,
        address: EditStores.address,
        commission: EditStores.commission,
        user_id: EditStores.user_id,
        category_id: EditStores.category_id,
        phone: EditStores.phone,
        image: image,
      },

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (jsonResponse) {
        console.log(
          "JsonResponse===",
          JSON.stringify(jsonResponse.data.message)
        );
        // setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
        // setIsLoading(false)
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
                defaultValue={code}
                onChange={onInputEditValue}
                required
              />
            </div>
          </div>
        </Col>
        <Col>
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
                placeholder="Enter Name"
                style={Outline}
                defaultValue={name}
                onChange={onInputEditValue}
                required
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Contact No
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="number"
                className="form-control"
                name="phone"
                placeholder="Enter Contact No"
                style={Outline}
                defaultValue={phone}
                onChange={onInputEditValue}
                required
              />
            </div>
          </div>
        </Col>
        <Col>
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
                defaultValue={email}
                onChange={onInputEditValue}
                style={Outline}
                required
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
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
                defaultValue={address}
                onChange={onInputEditValue}
              />
            </div>
          </div>
        </Col>
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="commission">
              Commission
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="commission"
                placeholder="Enter Address"
                defaultValue={commission}
                onChange={onInputEditValue}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="commission">
              Sellers
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <select
              className="form-control custom-select"
              name="user_id"
              onChange={onInputEditValue}
            >
              {sellers.map((item) =>
                item.id == EditStores.user_id ? (
                  <option value={item.id} selected>
                    {item.name}
                  </option>
                ) : (
                  <option value={item.id}>{item.name}</option>
                )
              )}
            </select>
          </div>
        </Col>
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Categoy
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <select
              className="form-control custom-select"
              name="category_id"
              onChange={onInputEditValue}
            >
              {categories.map((item) =>
                item.id == EditStores.category_id ? (
                  <option value={item.id} selected>
                    {item.name}
                  </option>
                ) : (
                  <option value={item.id}>{item.name}</option>
                )
              )}
            </select>
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
              onChange={(e) => setImage(e.target.files[0])}
              style={{ border: "none", background: "none" }}
            />
          </div>
        </Col>
        <Col></Col>
      </Row>

      <hr />
      <div className="form-group float-right">
        <button
          type="button"
          className="btn btn-sm btn-danger mr-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button className="btn btn-sm btn-primary" onClick={UpdateData}>
          Update
        </button>
      </div>
    </div>
  );
}
