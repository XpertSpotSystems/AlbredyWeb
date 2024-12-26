import React, { useState } from "react";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import { Col, Row, Spinner } from "react-bootstrap";

export default function EditUnits({ closeModal, id, code, name, edit }) {
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

  const [EditUnits, setEditUnits] = useState({
    id: id,
    code: code,
    name: name,
  });
  const [Loading, setLoading] = useState(false);

  // onInputEditValue
  const onInputEditValue = (e) => {
    setEditUnits({
      ...EditUnits,
      [e.target.name]: e.target.value,
    });
  };

  // Update Data
  const UpdateData = () => {
    setLoading(true);
    if (EditUnits.code === "" || EditUnits.name === "") {
      setLoading(false);
      console.log("Error :: Please fill all fields!");
    } else {
      let data = {
        id: id,
        name: EditUnits.name,
        code: EditUnits.code,
        email: Email,
        token: Token,
      };

      fetch(MyConstants.updateUnit, {
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
              text: "Unit has been updated successfully!",
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
                defaultValue={code}
                style={Outline}
                onChange={onInputEditValue}
              />
              {EditUnits.code === "" ? (
                <small className="text-danger">Code is required!</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
        <Col sm={12} md={6}>
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
                defaultValue={name}
                onChange={onInputEditValue}
              />
              {EditUnits.name === "" ? (
                <small className="text-danger">Name is required!</small>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
      </Row>

      <div className="modal-footer bg-white mt-3"></div>
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
            <>Update Unit</>
          )}
        </button>
      </div>
    </div>
  );
}
