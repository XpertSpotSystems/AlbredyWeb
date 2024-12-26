import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import * as MyConstants from "../../Constant/Config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import swal from "sweetalert";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function EditGeneralSettings({
  closeModal,
  id,
  email,
  address,
  phone,
  logo,
  facebook_link,
  twitter_link,
  instagram_link,
  description,
  data,
  currency_symbol,
  currency_id,
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
  const [EditGeneralSettings, setEditGeneralSettings] = useState({
    id: id,
    general_email: email,
    address: address,
    phone: phone,
    logo: logo,
    facebook_link: facebook_link,
    twitter_link: twitter_link,
    instagram_link: instagram_link,
    description: description,
    email: Email,
    token: Token,
    currency_symbol: currency_symbol,
    currency_id: currency_id,
  });
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState(EditGeneralSettings.logo);
  const [Currencies, setCurrencies] = useState([]);
  const [Description, setDescription] = useState(
    EditGeneralSettings.description
  );
  const [Loading, setLoading] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState(EditGeneralSettings.phone);

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

  useEffect(() => {
    
    let data = {
      email: Email,
      token: Token,
    };

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
  }, []);

  // onInputEditValue
  const onInputEditValue = (e) => {
    setEditGeneralSettings({
      ...EditGeneralSettings,
      [e.target.name]: e.target.value,
    });
  };

  // isValidEmail
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // Update Data
  const UpdateData = (Data) => {
    setLoading(true);
    if (
      EditGeneralSettings.general_email === "" ||
      PhoneNumber === "" ||
      EditGeneralSettings.address === "" ||
      EditGeneralSettings.facebook_link === "" ||
      EditGeneralSettings.twitter_link === "" ||
      EditGeneralSettings.instagram_link === "" ||
      Description === "" ||
      EditGeneralSettings.currency_symbol === "" 
    ) {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      console.log('phone_no ::', EditGeneralSettings.phone)
      
      const formData = new FormData();
      formData.append("id", EditGeneralSettings.id);
      formData.append("general_email", EditGeneralSettings.general_email);
      formData.append("address", EditGeneralSettings.address);
      formData.append("phone", PhoneNumber);
      formData.append("facebook", EditGeneralSettings.facebook_link);
      formData.append("twitter", EditGeneralSettings.twitter_link);
      formData.append("instagram", EditGeneralSettings.instagram_link);
      formData.append("description", Description);
      formData.append("logo", Image);
      formData.append("email", EditGeneralSettings.email);
      formData.append("token", EditGeneralSettings.token);
      formData.append("currency_id", EditGeneralSettings.currency_id);

      axios
        .post(MyConstants.updateGeneral, formData)
        .then((result) => {
          if (result.data.status == true) {
            console.log("Message ===", result.data.message);
            setLoading(false);
            closeModal();
            data();
            swal({
              title: "Success!",
              text: "Settings have been successfully updated.",
              icon: "success",
              button: "Ok",
            });

          }
        })
        .catch((error) => {
          console.log("Error ===", error.message);
        });
    }
  };

  return (
    <div>
      <Row className="mb-3">
        <Col sm={12} md={6}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="email"
                className="form-control"
                name="general_email"
                placeholder="Enter Email Address"
                style={Outline}
                defaultValue={email}
                onChange={onInputEditValue}
              />
              {EditGeneralSettings.general_email === "" ? (
                <small className="text-danger">
                  Email Address is required!
                </small>
              ) : !EditGeneralSettings.general_email.match(isValidEmail) ? (
                <small className="text-danger">Invalid email address!</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Contact No
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              {/* <input
                type="number"
                className="form-control"
                name="phone"
                placeholder="Enter Contact No"
                style={Outline}
                defaultValue={phone}
                onChange={onInputEditValue}
              /> */}

              <PhoneInput
                country={"eg"}
                enableSearch={true}
                placeholder="Enter Address"
                name="contact_no"
                value={EditGeneralSettings.phone}
                onChange={(e) => setPhoneNumber(e)}
              />
              {EditGeneralSettings.phone === "" ? (
                <small className="text-danger">Contact No is required!</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={12} md={3}>
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
                defaultValue={address}
                onChange={onInputEditValue}
              />
              {EditGeneralSettings.address === "" && (
                <small className="text-danger">Address is required!</small>
              )}
            </div>
          </div>
        </Col>
        <Col sm={12} md={3}>
          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Currency
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
            <select
                className="form-control custom-select"
                name="currency_id"
                onChange={onInputEditValue}
              >
                {Currencies.map((item) =>
                  EditGeneralSettings.currency_id == item.id ? (
                    <option value={item.id} selected>
                      {item.symbol}
                    </option>
                  ) : (
                    <option value={item.id}>{item.symbol}</option>
                  )
                )}
              </select>
              {EditGeneralSettings.currency_symbol === "" && (
                <small className="text-danger">Currency is required!</small>
              )}
            </div>
          </div>
        </Col>
        <Col md="4" sm="12">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Image
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>

            <div className="custom-file">
              <input
                className="custom-file-input"
                type="file"
                id="image"
                name="image"
                onChange={ChangeImage}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {Image === EditGeneralSettings.logo ? logo : Image.name}
              </label>
            </div>
            {Image === "" ? (
              <small className="text-danger">Image is required!</small>
            ) : Image.size >= 10000 ? (
              <small className="text-danger">
                File is too Large, please select a file less than 10mb!
              </small>
            ) : Image.size <= 1000 ? (
              <small className="text-danger">
                File is too Small, please select a file greater than 1mb!
              </small>
            ) : (
              ""
            )}

            {EditGeneralSettings.logo === null ? (
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
                : MyConstants.SecondImageUrl + `${EditGeneralSettings.logo}`
            }
            alt="Image"
            className="rounded-circle"
            height={80}
            width={80}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={12} md={4}>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              Facebook
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="facebook_link"
                placeholder="Enter Facebook"
                style={Outline}
                defaultValue={facebook_link}
                onChange={onInputEditValue}
              />
              {EditGeneralSettings.facebook === "" && (
                <small className="text-danger">
                  Facebook Link is required!
                </small>
              )}
            </div>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              Instagram
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="instagram_link"
                placeholder="Enter Instagram"
                style={Outline}
                defaultValue={instagram_link}
                onChange={onInputEditValue}
              />
              {EditGeneralSettings.instagram === "" && (
                <small className="text-danger">
                  Instagram Link is required!
                </small>
              )}
            </div>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              Twitter
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="twitter_link"
                placeholder="Enter Twitter"
                style={Outline}
                defaultValue={twitter_link}
                onChange={onInputEditValue}
              />
              {EditGeneralSettings.twitter === "" && (
                <small className="text-danger">Twitter Link is required!</small>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={12}>
          <div className="form-group">
            <label className="form-label" htmlFor="">
              Description
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
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
        <button
          onClick={UpdateData}
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
            <>Update General Setting</>
          )}
        </button>
      </div>
    </div>
  );
}
