import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as MyConstants from "../../Constant/Config";
import axios from "axios";
import swal from "sweetalert";
import { Col, Row, Spinner } from "react-bootstrap";

ClassicEditor.defaultConfig = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "fontFamily",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "insertTable",
    "undo",
    "redo",
  ],
  // language: 'fa'
};

const AddCategories = ({ closeModal, edit }) => {
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
  const [Name, setName] = useState("");
  const [Code, setCode] = useState("");
  // const [Description, setDescription] = useState("");
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);

  // Error States
  const [NameError, setNameError] = useState("");
  const [CodeError, setCodeError] = useState("");
  const [ImageError, setImageError] = useState("");

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

  const SubmitForm = () => {
    setLoading(true);
    if (
      Code === "" ||
      Name === "" ||
      // Description === ""
      Image === ""
    ) {
      setLoading(false);
      setNameError("Category name is required!");
      setCodeError("Category code is required!");
      setImageError([
        "Image is required!",
        "File is too Large, please select a file less than 10mb!",
        " File is too Small, please select a file greater than 2mb!",
        "Select valid image format as jpeg, jpg, jfif, png or webp!",
      ]);
    } else {
      const formData = new FormData();
      formData.append("name", Name);
      formData.append("code", Code);
      // formData.append("description", Description);
      formData.append("image", Image);
      formData.append("email", Email);
      formData.append("token", Token);

      axios
        .post(MyConstants.addCategory, formData)
        .then((result) => {
          if (result.data.status == true) {
            setLoading(false);
            closeModal(true);
            edit();
            swal({
              title: "Success!",
              text: "New category has been addedd successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        })
        .catch((error) => {
          console.log("Error ::", error);
        });
    }
  };

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="code">
              Category Code
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="Enter Category Code"
                style={Outline}
                onChange={(e) => setCode(e.target.value)}
              />
              {Code === "" && (
                <small className="text-danger">{CodeError}</small>
              )}
            </div>
          </div>
        </Col>
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Category Name
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Category Name"
                style={Outline}
                onChange={(e) => setName(e.target.value)}
              />
              {Name === "" && (
                <small className="text-danger">{NameError}</small>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* <Row>
        <Col>
          <label className="form-label" htmlFor="name">
            Category Description
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
          {Description === "" && (
            <small className="text-danger">
              Category Description is required!
            </small>
          )}
        </Col>
      </Row> */}

      <Row className="mt-4">
        <Col md="6" sm="12">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Category Image
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>

            <div className="custom-file">
              <input
                className="custom-file-input"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                id="image"
                name="image"
                onChange={(e) => {
                  ChangeImage(e);
                }}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {Image === "" ? "Choose Image..." : Image.name}
              </label>
            </div>

            {Image === "" ? (
              <small className="text-danger">{ImageError[0]}</small>
            ) : Image.size >= 10000 ? (
              <small className="text-danger">{ImageError[1]}</small>
            ) : Image.size <= 2000 ? (
              <small className="text-danger">{ImageError[2]}</small>
            ) : "image/jpeg" !== Image.type &&
              "image/jpg" !== Image.type &&
              "image/jfif" !== Image.type &&
              "image/webp" !== Image.type &&
              "image/png" !== Image.type ? (
              <small className="text-danger">{ImageError[3]}</small>
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col md="2" sm="12" className="mt-3 mt-md-0">
          <img
            src={
              SelectedImagePreview !== "" ? SelectedImagePreview : "sample.jpg"
            }
            alt="Image"
            className="rounded-circle"
            height={80}
            width={80}
          />
        </Col>
      </Row>

      <div className="modal-footer bg-white mt-2"></div>
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
            <>Add Category</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategories;
