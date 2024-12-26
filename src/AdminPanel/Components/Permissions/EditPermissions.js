import React, { useEffect, useState } from "react";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";
import Select from "react-select";

export default function EditPermissions({
  closeModal,
  id,
  RightsData,
  RoleData,
  PermissionsData,
}) {
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const [EditPermissions, setEditPermissions] = useState({
    id: id,
    email: Email,
    token: Token,
    rights: RightsData,
    role: RoleData,
  });

  console.log("EditPermissions_p ::", EditPermissions);

  const [Rights, setRights] = useState([]);
  const [Role, setRole] = useState([]);

  const onInputEditValue = (e) => {
    setEditPermissions({ ...EditPermissions, [e.target.name]: e.target.value });
  };

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

  const UpdateData = () => {
    console.log("EditPermissions ::", EditPermissions);

    return;
    fetch(MyConstants.updatePermissions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(EditPermissions),
    }).then((result) => {
      result.json().then((response) => {
        console.warn("Update Permissions ===", response);
        if (response.status == true) {
          closeModal(true);
          PermissionsData();
          swal({
            title: "Success!",
            text: "Permissions has been updated successfully!",
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
      <div className="form-row mb-4">
        <div className="col">
          <div className="form-group">
            <label className="form-label" htmlFor="roles">
              Role
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <Select
              options={RoleSearchSelect}
              onChange={onInputEditValue}
              value={EditPermissions.role}
              // defaultValue={EditPermissions.role === }
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label className="form-label" htmlFor="rights">
              Rights
            </label>
            <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            <Select
              isMulti
              options={RightSearchSelect}
              onChange={onInputEditValue}
            />
          </div>
        </div>
      </div>

      <div className="modal-footer bg-white"></div>
      <div className="form-group float-right">
        <button
          type="button"
          className="btn btn-sm btn-danger mr-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button className="btn btn-sm btn-primary" onClick={UpdateData}>
          Update
        </button>
      </div>
    </div>
  );
}
