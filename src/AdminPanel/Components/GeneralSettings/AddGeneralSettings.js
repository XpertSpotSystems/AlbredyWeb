import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import * as MyConstants from "../../Constant/Config";
import axios from "axios";
import swal from "sweetalert";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function AddGeneralSettings({ closeModal, data }) {
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
  const [EmailAddress, setEmailAddress] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Address, setAddress] = useState("");
  const [SelectedImagePreview, setSelectedImagePreview] = useState("");
  const [Image, setImage] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [Description, setDescription] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Loading, setLoading] = useState(false);

  // Error States
  const [EmailAddressError, setEmailAddressError] = useState("");
  const [ContactNoError, setContactNoError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [ImageError, setImageError] = useState("");
  const [FacebookError, setFacebookError] = useState("");
  const [TwitterError, setTwitterError] = useState("");
  const [InstagramError, setInstagramError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");
  const [CurrencyError, setCurrencyError] = useState("");
  const [Currencies, setCurrencies] = useState([]);

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

  // isValidEmail
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // AddGeneralSettings
  const SubmitForm = () => {
    setLoading(true);
    if (
      EmailAddress === "" ||
      Address === "" ||
      ContactNo === "" ||
      Facebook === "" ||
      Twitter === "" ||
      Instagram === "" ||
      Description === "" ||
      Image === "" || 
      Currency === "" 
    ) {
      setLoading(false);
      setEmailAddressError([
        "Email Address is required!",
        "Invalid email address!",
      ]);
      setContactNoError(["Phone No is required!"]);
      setAddressError("Address is required!");
      setImageError([
        "Image is required!",
        "File is too Large, please select a file less than 10mb!",
        " File is too Small, please select a file greater than 2mb!",
        "Select valid image format as jpeg, jpg, jfif, png or webp!",
      ]);
      setFacebookError("Facebook Link is required!");
      setTwitterError("Twitter Link is required!");
      setInstagramError("Instagram Link is required!");
      setDescriptionError("Description is required!");
      setCurrencyError("Currency is required!");
    } else {
      const formData = new FormData();
      formData.append("general_email", EmailAddress);
      formData.append("address", Address);
      formData.append("phone", ContactNo);
      formData.append("facebook", Facebook);
      formData.append("twitter", Twitter);
      formData.append("instagram", Instagram);
      formData.append("description", Description);
      formData.append("logo", Image);
      formData.append("email", Email);
      formData.append("token", Token);
      formData.append("currency_id", Currency);

      axios
        .post(MyConstants.addGeneral, formData)
        .then((result) => {
          if (result.data.status == true) {
            console.log("Message ===", result.data.message);
            setLoading(false);
            closeModal();
            data();
            swal({
              title: "Success!",
              text: "New general setting has been added successfully!",
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
      <form className="form-validate is-alter">
        <Row>
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
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
                {EmailAddress === "" ? (
                  <small className="text-danger">{EmailAddressError[0]}</small>
                ) : !EmailAddress.match(isValidEmail) ? (
                  <small className="text-danger">{EmailAddressError[1]}</small>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <label className="form-label" htmlFor="phone">
              Contact No
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <PhoneInput
              country={"eg"}
              enableSearch={true}
              placeholder="Enter Address"
              name="contact_no"
              value={ContactNo}
              onChange={(e) => setContactNo(e)}
            />
            {ContactNo === "" ? (
              <small className="text-danger">{ContactNoError[0]}</small>
            ) : (
              ""
            )}
          </Col>
        </Row>

        <Row className="mt-3">
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
                  onChange={(e) => setAddress(e.target.value)}
                />
                {Address === "" && (
                  <small className="text-danger">{AddressError}</small>
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
                onChange={(e) => setCurrency(e.target.value)}
              >
                {Currencies.map((item) =>
                    <option value={item.id} selected>
                      {item.symbol}
                    </option>
                )}
              </select>
              {Currency === "" && (
                <small className="text-danger">{CurrencyError}</small>
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
                  name="facebook"
                  placeholder="Enter Facebook"
                  style={Outline}
                  onChange={(e) => setFacebook(e.target.value)}
                />
                {Facebook === "" && (
                  <small className="text-danger">{FacebookError}</small>
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
                  name="instagram"
                  placeholder="Enter Instagram"
                  style={Outline}
                  onChange={(e) => setInstagram(e.target.value)}
                />
                {Instagram === "" && (
                  <small className="text-danger">{InstagramError}</small>
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
                  name="twitter"
                  placeholder="Enter Twitter"
                  style={Outline}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                {Twitter === "" && (
                  <small className="text-danger">{TwitterError}</small>
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={12} md={12}>
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
                {Description === "" && (
                  <small className="text-danger">{DescriptionError}</small>
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
            className="btn btn-sm btn-primary"
            style={{
              backgroundColor: "#398E8B",
              border: "#398E8B",
              outline: "none",
              boxShadow: "none",
            }}
            type="button"
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
              <>Add General Setting</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
