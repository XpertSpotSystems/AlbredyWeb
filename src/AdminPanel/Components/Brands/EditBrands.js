import React, { useState } from "react";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import { Col, Row, Spinner } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { useForm } from "react-hook-form";

export default function EditBrands({
  closeModal,
  id,
  name,
  code,
  description,
  edit,
}) {
  const Outline = {
    boxShadow: "none",
    borderColor: "#398E8B",
    backgroundColor: "transparent",
  };

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // States
  const [EditBrands, setEditBrands] = useState({
    id: id,
    name: name,
    code: code,
    description: description,
  });
  const [Description, setDescription] = useState(EditBrands.description);
  const [Loading, setLoading] = useState(false);

  // onInputEditValue
  const onInputEditValue = (e) => {
    setEditBrands({ ...EditBrands, [e.target.name]: e.target.value });
  };

  // Update Data
  const UpdateData = () => {
    setLoading(true);
    if (
      EditBrands.code === "" ||
      EditBrands.name === "" ||
      EditBrands.description === ""
    ) {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      let data = {
        id: EditBrands.id,
        name: EditBrands.name,
        code: EditBrands.code,
        description: Description,
        email: Email,
        token: Token,
      };

      fetch(MyConstants.updateBrand, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          console.warn("hgghfhgf", response);
          if (response.status == true) {
            setLoading(false);
            closeModal(true);
            edit();
            swal({
              title: "Success!",
              text: "Brand has been updated successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        });
      });
    }
  };

  return (
    <div>
      <Row>
        <Col sm={12} md={6}>
          <div className="form-group">
            <label className="form-label" htmlFor="code">
            Brand Code
            </label>
          <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="Enter Brand Code"
                defaultValue={code}
                style={Outline}
                onChange={onInputEditValue}
              />
              {EditBrands.code === "" ? (
                <small className="text-danger">Code is required!</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
            Brand Name
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
              />
              {EditBrands.name === "" ? (
                <small className="text-danger">Name is required!</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="description">
            Brand Description
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <CKEditor
              editor={ClassicEditor}
              name="description"
              data={Description}
              onChange={(e, editor) => {
                setDescription(editor.getData());
              }}
            />
            {Description === "" ? (
              <small className="text-danger">Description is required!</small>
            ) : (
              ""
            )}
          </div>
        </Col>
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
        <button className="btn btn-sm btn-primary" onClick={UpdateData}
          style={{
            backgroundColor: "#398E8B",
            border: "#398E8B",
            outline: "none",
            boxShadow: "none",
          }}>
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
            <>Update Brand</>
          )}
        </button>
      </div>
    </div>
  );
}
