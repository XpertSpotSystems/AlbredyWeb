import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
// import { Link } from 'react-router-dom'
import { Modal, Button } from "react-bootstrap";
import AddPermissions from "./AddPermissions";
import EditPermissions from "./EditPermissions";
import swal from "sweetalert";

export default function Permissions() {
  // Get Permissions Data
  const [Permission, setPermission] = useState([]);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const PermissionsData = () => {
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.listPermissions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setPermission(response.permissions);
        }
      });
    });
  };

  useEffect(() => {
    PermissionsData();
  }, []);

  // Edit Permissions Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditPermissionsModalData, setEditPermissionsModalData] = useState([]);
  const [PermissionID, setPermissionID] = useState([]);

  const EditPermissionsModalClose = () => setEditModalShow(false);
  const EditPermissionsModalShow = () => setEditModalShow(true);

  const GetPermissionsData = (id, rights, role) => {
    let EditPermissionsModalData = [id, rights, role];
    setEditPermissionsModalData([...EditPermissionsModalData]);
    return setEditModalShow(true);
  };

  // Add Permissions Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddPermissionsModalData, setAddPermissionsModalData] = useState([]);

  const AddPermissionsModalClose = () => setAddModalShow(false);
  const AddPermissionsModalShow = () => setAddModalShow(true);

  const AddPermissionsData = () => {
    setAddPermissionsModalData([...AddPermissionsModalData]);
    return setAddModalShow(true);
  };

  let role_prnt = "";

  // Delete Data
  const DeleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let data = { id: id, email: Email, token: Token };
        fetch(MyConstants.deletePermissions, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
            if (response.status == true) {
              PermissionsData();
            }
          });
        });
      } else {
        swal("Your imaginary row is safe!");
      }
    });
  };

  return (
    <div>
      <div className="nk-app-root">
        {/* main @s */}
        <div className="nk-main ">
          {/* sidebar @s */}
          <div
            className="nk-sidebar nk-sidebar-fixed is-light "
            data-content="sidebarMenu"
          >
            <Sidebar />
          </div>
          {/* Sidebar @e */}
          {/* wrap @s */}
          <div className="nk-wrap ">
            {/* main header @s */}
            <div className="nk-header nk-header-fixed is-light">
              {/* Header */}
              <Header />
            </div>
            {/* main header @e */}

            {/* content @s */}
            <div className="nk-content ">
              <div className="container-fluid">
                <div className="nk-content-inner">
                  <div className="nk-content-body">
                    <div class="components-preview">
                      <div
                        className="nk-block-head nk-block-head-sm card p-4"
                        style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          outline: "none",
                          marginTop: "20px",
                        }}
                      >
                        <div className="nk-block-between">
                          <div className="nk-block-head-content">
                            <h3
                              className="nk-block-title page-title"
                              style={{ color: "#398E8B" }}
                            >
                              Permissions
                            </h3>
                          </div>
                          {/* .nk-block-head-content */}
                          <div className="nk-block-head-content">
                            <Button
                              to="/Permissions"
                              className="btn btn-primary btn-sm d-none d-md-inline-flex"
                              style={{
                                backgroundColor: "#398E8B",
                                border: "#398E8B",
                                outline: "none",
                                boxShadow: "none",
                              }}
                              onClick={AddPermissionsData}
                            >
                              <em className="icon ni ni-plus" />
                              <span>Add Permissions</span>
                            </Button>
                          </div>
                          {/* .nk-block-head-content */}
                        </div>
                        {/* .nk-block-between */}
                      </div>
                      {/* .nk-block-head */}
                      <div className="nk-block nk-block-lg mt-5">
                        <div
                          className="card card-preview"
                          style={{
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            outline: "none",
                            marginTop: "20px",
                          }}
                        >
                          <div className="card-inner">
                            <table className="table table-bordered table-hover table-striped table-responsive-sm">
                              <thead>
                                <tr>
                                  <th>Role</th>
                                  <th>Permissions</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Permission &&
                                  Permission.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.role}</td>
                                      <td>
                                        {item.rights_data.map((itm) => (
                                          <span className="badge badge-info p-2 ml-2">
                                            {itm.right}
                                          </span>
                                        ))}
                                      </td>
                                      <td>
                                        <Button
                                          className="btn btn-primary d-none  btn-sm d-md-inline-flex"
                                          style={{
                                            backgroundColor: "#398E8B",
                                            border: "#398E8B",
                                            outline: "none",
                                            boxShadow: "none",
                                          }}
                                          onClick={() =>
                                            GetPermissionsData(
                                              item.id,
                                              item.rights,
                                              item.role
                                            )
                                          }
                                        >
                                          <em className="icon ni ni-edit" />
                                          <span>Edit</span>
                                        </Button>
                                        <Button
                                          className="btn btn-danger btn-sm ml-2 d-md-inline-flex"
                                          onClick={() => DeleteData(item.id)}
                                        >
                                          <em className="icon ni ni-trash" />
                                          <span>Delete</span>
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* .card-preview */}
                      </div>{" "}
                      {/* nk-block */}
                    </div>
                    {/* .components-preview */}
                  </div>
                </div>
              </div>
            </div>
            {/* content @e */}
            {/* Footer */}
            <div className="nk-footer">
              <Footer />
            </div>
            {/* footer @e */}
          </div>
          {/* wrap @e */}
        </div>
        {/* main @e */}
      </div>
      {/* nk-app-root */}

      {/* EditPermissions Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditPermissionsModalShow}
          onHide={EditPermissionsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Permissions</Modal.Title>
            <a href="#" className="close" onClick={EditPermissionsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Edit Permissions */}
            <EditPermissions
              closeModal={EditPermissionsModalClose}
              id={EditPermissionsModalData[0]}
              RightsData={EditPermissionsModalData[1]}
              RoleData={EditPermissionsModalData[2]}
              PermissionsData={PermissionsData}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddPermissionsModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddPermissionsModalShow}
          onHide={AddPermissionsModalClose}
          backdrop="static"
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>Add Permissions</Modal.Title>
            <a href="#" className="close" onClick={AddPermissionsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add Permissions */}
            <AddPermissions
              closeModal={AddPermissionsModalClose}
              PermissionsData={PermissionsData}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
