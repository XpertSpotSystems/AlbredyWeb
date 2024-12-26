import React, { useState } from "react";
import * as MyConstants from "../../Constant/Config";
import swal from "sweetalert";

export default function EditAccount({
  closeModal,
  id,
  name,
  type,
  opening_balance,
  deefault,
  AccountsData,
}) {
  // State
  const [EditAccount, setEditAccount] = useState({
    id: id,
    name: name,
    type: type,
    opening_balance: opening_balance,
    deefault: deefault ? "1" : "0",
  });

  // onInputEditValue
  const onInputEditValue = (e) => {
    setEditAccount({ ...EditAccount, [e.target.name]: e.target.value });
  };

  // checkedDefault
  const checkedDefault = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setEditAccount({ ...EditAccount, ["deefault"]: "1" });
    } else {
      setEditAccount({ ...EditAccount, ["deefault"]: "0" });
    }
  };

  // Login User Data
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  // UpdateData
  const UpdateData = () => {
    if (
      EditAccount.name === "" ||
      EditAccount.type === "" ||
      EditAccount.opening_balance === ""
    ) {
      console.log("Error :: Please fill all fields!");
    } else {
      let data = {
        id: EditAccount.id,
        email: Email,
        token: Token,
        name: EditAccount.name,
        type: EditAccount.type,
        opening_balance: EditAccount.opening_balance,
        deefault: EditAccount.deefault,
      };

      fetch(MyConstants.updateAccount, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((response) => {
          if (response.status == true) {
            closeModal(true);
            AccountsData();
            swal({
              title: "Success!",
              text: "Account has been updated successfully!",
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
      <div className="row">
        <div className="col-6">
          <label className="form-label" htmlFor="">
            Name
          </label>
          <span style={{ color: "red", marginLeft: "2px" }}>*</span>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter Name"
            defaultValue={name}
            onChange={onInputEditValue}
          />
          {EditAccount.name === "" && (
            <small className="text-danger">
              Name is required!
            </small>
          )}
        </div>
        <div className="col-6">
          <label className="form-label" htmlFor="">
            Type
          </label>
          <span style={{ color: "red", marginLeft: "2px" }}>*</span>
          <input
            type="text"
            className="form-control"
            name="type"
            placeholder="Enter Type"
            defaultValue={type}
            onChange={onInputEditValue}
          />
          {EditAccount.type === "" && (
            <small className="text-danger">
              Type is required!
            </small>
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6">
          <label className="form-label" htmlFor="">
            Opening Balance
          </label>
          <span style={{ color: "red", marginLeft: "2px" }}>*</span>
          <input
            type="number"
            className="form-control"
            name="opening_balance"
            placeholder="Enter Opening Balance"
            defaultValue={opening_balance}
            onChange={onInputEditValue}
          />
          {EditAccount.opening_balance === "" && (
            <small className="text-danger">
              Opening Balance is required!
            </small>
          )}
        </div>
        <div className="col-6">
          <div className="custom-control custom-checkbox mt-4">
            {EditAccount.deefault == "1" ? (
              <input
                type="checkbox"
                className="custom-control-input"
                id="default"
                name="defaults"
                onChange={checkedDefault}
                checked
              />
            ) : (
              <input
                type="checkbox"
                className="custom-control-input"
                id="default"
                name="defaults"
                onChange={checkedDefault}
              />
            )}
            <label className="custom-control-label" htmlFor="default">
              <h4>Default</h4>
            </label>
          </div>
        </div>
      </div>

      <hr />
      <div className="form-group float-right">
        <button
          type="button"
          className="btn btn-sm btn-danger mr-2"
          onClick={closeModal}
          
          style={{
            backgroundColor: "#398E8B",
            border: "#398E8B",
            outline: "none",
            boxShadow: "none",
          }}
        >
          Cancel
        </button>
        <button className="btn btn-sm btn-primary" onClick={UpdateData}>
          Update Account
        </button>
      </div>
    </div>
  );
}
