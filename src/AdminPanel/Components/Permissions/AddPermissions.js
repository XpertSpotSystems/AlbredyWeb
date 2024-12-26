import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";

export default function AddPermissions({ closeModal, PermissionsData }) {
  const [Rights, setRights] = useState([]);
  const [Role, setRole] = useState([]);
  const [right_id, setRightId] = useState("");
  const [role_id, setRoleId] = useState("");

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
    };
    fetch(MyConstants.listRole, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setRole(response.roles);
        }
      });
    });
    fetch(MyConstants.listRights, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setRights(response.rights);
        }
      });
    });
  }, []);

  // AddPermissions
  const AddPermissions = () => {
    let data = { right: right_id, role: role_id, email: Email, token: Token };

    console.log("data ::", data);

    fetch(MyConstants.addPermissions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          console.log("Message ===", response.message);
          closeModal(true);
          PermissionsData();
          swal({
            title: "Success!",
            text: "New Permission has been addedd successfully!",
            icon: "success",
            button: "Ok",
          });
        }
      });
    });
  };

  const RightSearchSelect = Rights.map((item) => ({
    label: item.rightt,
    value: item.id,
    name: "right_id",
  }));

  const RoleSearchSelect = Role.map((item) => ({
    label: item.role,
    value: item.id,
    name: "role_id",
  }));

  return (
    <div>
      <Row>
        <Col sm={12} md={6}>
          <div className="form-group">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <Select
              options={RoleSearchSelect}
              onChange={(e) => setRoleId(e.value)}
            />
          </div>
        </Col>
        <Col sm={12} md={6}>
          <div className="form-group">
            <label className="form-label" htmlFor="rights">
              Rights
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <Select
              isMulti
              options={RightSearchSelect}
              onChange={(e) => setRightId(e)}
            />
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
          onClick={AddPermissions}
        >
          Add Permissions
        </button>
      </div>
    </div>
  );
}
