import React, { useState, useEffect } from "react";
import * as MyConstants from "../../Constant/Config";
import axios from "axios";
import swal from "sweetalert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Col, Row, Spinner } from "react-bootstrap";

export default function EditSubCategories({
  closeModal,
  id,
  code,
  name,
  parent_category,
  // description,
  image,
  edit,
  Categories,
}) {
  console.log("image_ ::", image);
  const Outline = {
    boxShadow: "none",
    borderColor: "#398E8B",
    backgroundColor: "transparent",
  };

  // States
  const [EditSubCategories, setEditSubCategories] = useState({
    id: id,
    code: code,
    name: name,
    parent_category: parent_category,
    // description: description,
    image: image,
  });
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState(EditSubCategories.image);
  const [Loading, setLoading] = useState(false);
  // const [Description, setDescription] = useState(EditSubCategories.description);
  // const [IsError, setIsError] = useState(false);

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
    setEditSubCategories({
      ...EditSubCategories,
      [e.target.name]: e.target.value,
    });
  };

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const UpdateData = () => {
    setLoading(true);
    if (
      EditSubCategories.code === "" ||
      EditSubCategories.name === "" ||
      EditSubCategories.parent_category === ""
      // Description === ""
    ) {
      // setIsError("Please fill all fields!");
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      const formData = new FormData();
      formData.append("id", EditSubCategories.id);
      formData.append("name", EditSubCategories.name);
      formData.append("code", EditSubCategories.code);
      // formData.append("description", Description);
      formData.append("image", Image);
      formData.append("parent_category", EditSubCategories.parent_category);
      formData.append("email", Email);
      formData.append("token", Token);
      axios
        .post(MyConstants.updateSubCategory, formData)
        .then((result) => {
          if (result.data.status == true) {
            console.log(result.data.message);
            setLoading(false);
            closeModal(true);
            edit();
            swal({
              title: "Success!",
              text: "Sub Category has been updated successfully!",
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
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="code">
              Sub Category Code
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
              {EditSubCategories.code === "" ? (
                <small className="text-danger">
                  Sub Category code is required!
                </small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Sub Category Name
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
              {EditSubCategories.name === "" ? (
                <small className="text-danger">
                  Sub Category name is required!
                </small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6} sm={12}>
          <div className="form-group">
            <label className="form-label" htmlFor="parent_category">
              Parent Category
            </label>
            <div className="form-control-wrap">
              <select
                className="form-control custom-select"
                name="parent_category"
                onChange={onInputEditValue}
              >
                {Categories.map((item) =>
                  EditSubCategories.parent_category == item.id ? (
                    <option value={item.id} selected>
                      {item.name}
                    </option>
                  ) : (
                    <option value={item.id}>{item.name}</option>
                  )
                )}
              </select>
              {EditSubCategories.parent_category === "" ? (
                <small className="text-danger">
                  Parent Category is required!
                </small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
        <Col md="4" sm="12">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Sub Category Image
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
                {Image === EditSubCategories.image ? image : Image.name}
              </label>
            </div>
            {Image === "" ? (
              <small className="text-danger">
                Sub Category Image is required!
              </small>
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

            {EditSubCategories.image === null ? (
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
                : MyConstants.ImageUrl + `${image}`
            }
            alt="Image"
            className="rounded-circle"
            height={80}
            width={80}
          />
        </Col>
      </Row>

      {/* <Row className="mt-3">
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Sub Category Description
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
                Sub Category description is required!
              </small>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row> */}

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
            <>Update Sub Category</>
          )}
        </button>
      </div>
    </div>
  );
}
