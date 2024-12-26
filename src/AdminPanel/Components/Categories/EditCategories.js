import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as MyConstants from "../../Constant/Config";
import axios from "axios";
import swal from "sweetalert";
import { Col, Row, Spinner } from "react-bootstrap";

export default function EditCategories({
  closeModal,
  id,
  code,
  name,
  // description,
  image,
  edit,
}) {
  const Outline = {
    boxShadow: "none",
    borderColor: "#398E8B",
    backgroundColor: "transparent",
  };

  // States
  const [EditCategories, setEditCategories] = useState({
    id: id,
    code: code,
    name: name,
    // description: description,
    image: image,
  });
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);
  // const [Description, setDescription] = useState(EditCategories.description);

  console.log("EditCategories :::", EditCategories);

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
    setEditCategories({ ...EditCategories, [e.target.name]: e.target.value });
  };

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;
  // Update Data
  const UpdateData = () => {
    setLoading(true);
    if (
      EditCategories.code === "" ||
      EditCategories.name === ""
      // Description === ""
    ) {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      const formData = new FormData();
      formData.append("id", EditCategories.id);
      formData.append("name", EditCategories.name);
      formData.append("code", EditCategories.code);
      // formData.append("description", Description);
      formData.append("image", Image);
      formData.append("email", Email);
      formData.append("token", Token);

      axios
        .post(MyConstants.UpdateCategories, formData)
        .then((result) => {
          if (result.data.status === true) {
            setLoading(false);
            closeModal(true);
            edit();
            swal({
              title: "Success!",
              text: "Category data is updated successfully!",
              icon: "success",
              button: "Ok",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error ::", error);
        });
    }
  };

  return (
    <div>
      <Row>
        <Col md={6} sm={12}>
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
                defaultValue={code}
                style={Outline}
                onChange={onInputEditValue}
              />
              {EditCategories.code === "" ? (
                <small className="text-danger">
                  Category code is required!
                </small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
        <Col md={6} sm={12}>
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
                defaultValue={name}
                style={Outline}
                onChange={onInputEditValue}
              />
              {EditCategories.name === "" ? (
                <small className="text-danger">
                  Category name is required!
                </small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* <Row className="mt-3">
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="description">
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
            {Description === "" ? (
              <small className="text-danger">
                Category description is required!
              </small>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row> */}
      <Row className="mt-3 mb-2">
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
                onChange={ChangeImage}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {Image === "" ? image : Image.name}
              </label>
            </div>
            {EditCategories.image === "" ? (
              <small className="text-danger">Category Image is required!</small>
            ) : Image.size >= 10000 ? (
              <small className="text-danger">
                File is too Large, please select a file less than 10mb!
              </small>
            ) : Image.size <= 2000 ? (
              <small className="text-danger">
                File is too Small, please select a file greater than 2mb!
              </small>
            ) : (
              ""
            )}

            {EditCategories.image === null ? (
              "image/jpeg" !== Image.type &&
              "image/jpg" !== Image.type &&
              "image/jfif" !== Image.type &&
              "image/webp" !== Image.type &&
              "image/png" !== Image.type ? (
                <small className="text-danger">
                  Select valid image format as jpeg, jpg, jfif, png or webp!
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
                : MyConstants.ImageUrl + `${EditCategories.image}`
            }
            alt="Image"
            className="rounded-circle"
            height={80}
            width={80}
          />
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
            <>Update Category</>
          )}
        </button>
      </div>
    </div>
  );
}
