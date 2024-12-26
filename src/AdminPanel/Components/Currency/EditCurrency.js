import React, { useState } from "react";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import { Col, Row, Spinner } from "react-bootstrap";

import { useForm } from "react-hook-form";

export default function EditCurrency({
  closeModal,
  id,
  code,
  name,
  symbol,
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

  const [EditCurrency, setEditCurrency] = useState({
    id: id,
    code: code,
    name: name,
    symbol: symbol,
    email: Email,
    token: Token,
  });
  const [Loading, setLoading] = useState(false);

  // onInputEditValue
  const onInputEditValue = (e) => {
    setEditCurrency({
      ...EditCurrency,
      [e.target.name]: e.target.value,
    });
  };

  // UpdateData
  const UpdateData = () => {
    setLoading(true);
    if (
      EditCurrency.code === "" ||
      EditCurrency.name === "" ||
      EditCurrency.symbol === ""
    ) {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      let data = {
        id: id,
        name: EditCurrency.name,
        code: EditCurrency.code,
        symbol: EditCurrency.symbol,
        email: Email,
        token: Token,
      };

      fetch(MyConstants.updateCurrency, {
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
              text: "Currency has been updated successfully!",
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
          <div className="form-group">
            <label className="form-label" htmlFor="code">
              Currency Code
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="Enter Currency Code"
                style={Outline}
                defaultValue={code}
                onChange={onInputEditValue}
              />
              {EditCurrency.code === "" ? (
                <small className="text-danger">Code is required!</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
        <Col>
          {" "}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
            Currency Name
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Currency Name"
                style={Outline}
                defaultValue={name}
                onChange={onInputEditValue}
              />
              {EditCurrency.name === "" ? (
                <small className="text-danger">Name is required!</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <div className="form-group">
            <label className="form-label" htmlFor="symbol">
            Currency Symbol
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="symbol"
                placeholder="Enter Symbol"
                style={Outline}
                defaultValue={symbol}
                onChange={onInputEditValue}
              />
              {EditCurrency.symbol === "" ? (
                <small className="text-danger">Symbol is required!</small>
              ) : (
                ""
              )}
            </div>
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
            <>Update Currency</>
          )}
        </button>
      </div>
    </div>
  );
}
