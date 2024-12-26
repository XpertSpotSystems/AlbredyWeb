import React, { useState } from "react";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import { Col, Row, Spinner } from "react-bootstrap";

export default function AddUnits({ closeModal, edit }) {
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
  const [Symbol, setSymbol] = useState("");
  const [Loading, setLoading] = useState(false);

  // ErrorStates
  const [NameError, setNameError] = useState("");
  const [CodeError, setCodeError] = useState("");
  const [SymbolError, setSymbolError] = useState("");

  const SubmitForm = () => {
    setLoading(true);
    if (Code === "" || Name === "" || Symbol === "") {
      setLoading(false);
      setNameError("Currency name is required!");
      setCodeError("Currency code is required!");
      setSymbolError("Currency symbol is required!");
    } else {
      let data = {
        name: Name,
        code: Code,
        symbol: Symbol,
        email: Email,
        token: Token,
      };
      fetch(MyConstants.addCurrency, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            setLoading(false);
            closeModal(true);
            edit();
            swal({
              title: "Success!",
              text: "New currency  has been addedd successfully!",
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
                onChange={(e) => setCode(e.target.value)}
              />
              {Code === "" && (
                <small className="text-danger">{CodeError}</small>
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
                onChange={(e) => setName(e.target.value)}
              />
              {Name === "" && (
                <small className="text-danger">{NameError}</small>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {" "}
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
                onChange={(e) => setSymbol(e.target.value)}
              />
              {Symbol === "" && (
                <small className="text-danger">{SymbolError}</small>
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
            <>Add Currency</>
          )}
        </button>
      </div>
    </div>
  );
}
