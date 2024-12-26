import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import { Row, Col, Spinner } from "react-bootstrap";

export default function AddUnits({ closeModal, edit }) {
  const Outline = {
    boxShadow: "none",
    borderColor: "##398E8B",
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
  const [Loading, setLoading] = useState(false);

    // ErrorStates
    const [NameError, setNameError] = useState("");
    const [CodeError, setCodeError] = useState("");

  // AddUnit
  const History = useHistory();
  const navigate = () => History.push("");

  const SubmitForm = () => {
    setLoading(true)
    if (Code === "" || Name === "") {
      setLoading(false)
      setNameError("Unit name is required!");
      setCodeError("Unit code is required!");
    } else {
      let data = { name: Name, code: Code, email: Email, token: Token };
      fetch(MyConstants.addUnit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            setLoading(false)
            closeModal(true);
            edit();
            swal({
              title: "Success!",
              text: "New unit has been addedd successfully!",
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
            <label className="form-label" htmlFor="unit_code">
              Unit Code
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="Enter Unit Code"
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
            <label className="form-label" htmlFor="unit_name">
              Unit Name
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter Unit Name"
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

      <div className="modal-footer bg-white"></div>
      <div className="form-group float-right">
        <button className="btn btn-sm btn-danger mr-2" onClick={closeModal}>
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
            <>Add Unit</>
          )}
        </button>
      </div>
    </div>
  );
}
