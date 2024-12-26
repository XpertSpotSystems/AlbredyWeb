import React, { useState } from "react";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import { Row, Col, Spinner } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function AddBrands({ closeModal, edit }) {
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
  const [Description, setDescription] = useState("");
  const [Loading, setLoading] = useState(false);

  // ErrorStates
  const [NameError, setNameError] = useState("");
  const [CodeError, setCodeError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");

  // isValidName
  const isValidName = /^[a-zA-Z_ ]+$/;

  // isValidEmail
  const isValidEmail =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  // AddData
  const SubmitForm = () => {
    setLoading(true)
    if (Code === "" || Name === "" || Description === "") {
      setLoading(false)
      setNameError("Brand name is required!");
      setCodeError("Brand code is required!");
      setDescriptionError("Brand description is required!");
    } else {
      let data = {
        name: Name,
        code: Code,
        description: Description,
        email: Email,
        token: Token,
      };
      fetch(MyConstants.addBrand, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            console.log('Response ===', response)
            setLoading(false)
            closeModal(true);
            edit();
            swal({
              title: "Success!",
              text: "New brand has been addedd successfully!",
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
      <Row className="mb-3">
        <Col>
          {" "}
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
            Brand Name
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Brand Name"
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

      <Row>
        <Col>
          <label className="form-label" htmlFor="name">
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
          {Description === "" && (
                <small className="text-danger">{DescriptionError}</small>
          )}
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
            <>Add Brand</>
          )}
        </button>
      </div>
    </div>
  );
}
