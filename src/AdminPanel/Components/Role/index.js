import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
// import { Link } from 'react-router-dom'
import { Modal, Button } from "react-bootstrap";
import AddRole from "./AddRole";
import EditRole from "./EditRole";
import swal from "sweetalert";

export default function Role() {
  // Get Role Data
  const [Role, setRole] = useState([]);

  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Token = LoginUser.token;

  const RoleData = () => {
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
        if (response.status == true) {
          console.warn("Role ===", response.message);
          setRole(response.roles);
        }
      });
    });
  };

  useEffect(() => {
    RoleData();
  }, []);
  console.warn(Role);

  // Edit Role Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditRoleModalData, setEditRoleModalData] = useState([]);

  const EditRoleModalClose = () => setEditModalShow(false);
  const EditRoleModalShow = () => setEditModalShow(true);

  const GetRoleData = (id, role) => {
    let EditRoleModalData = [id, role];
    setEditRoleModalData([...EditRoleModalData]);
    return setEditModalShow(true);
  };

  // Add Role Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddRoleModalData, setAddRoleModalData] = useState([]);

  const AddRoleModalClose = () => setAddModalShow(false);
  const AddRoleModalShow = () => setAddModalShow(true);

  const AddRoleData = () => {
    setAddRoleModalData([...AddRoleModalData]);
    return setAddModalShow(true);
  };

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
        fetch(MyConstants.deleteRole, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
            if (response.status == true) {
              RoleData();
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
                              Role
                            </h3>
                          </div>
                          {/* .nk-block-head-content */}
                          <div className="nk-block-head-content">
                            <Button
                              to="/Role"
                              className="btn btn-primary btn-sm d-none d-md-inline-flex"
                              style={{
                                backgroundColor: "#398E8B",
                                border: "#398E8B",
                                outline: "none",
                                boxShadow: "none",
                              }}
                              onClick={AddRoleData}
                            >
                              <em className="icon ni ni-plus" />
                              <span>Add Role</span>
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
                                  <th>Sr#</th>
                                  <th>Role</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Role &&
                                  Role.map((item) => (
                                    <tr>
                                      <td>{item.id}</td>
                                      <td>{item.role}</td>
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
                                            GetRoleData(item.id, item.role)
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

      {/* EditRole Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditRoleModalShow}
          onHide={EditRoleModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Role</Modal.Title>
            <a href="#" className="close" onClick={EditRoleModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Edit Role */}
            <EditRole
              closeModal={EditRoleModalClose}
              id={EditRoleModalData[0]}
              Role={EditRoleModalData[1]}
              RoleData={RoleData}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddRoleModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddRoleModalShow}
          onHide={AddRoleModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Add Role</Modal.Title>
            <a href="#" className="close" onClick={AddRoleModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add Role */}
            <AddRole closeModal={AddRoleModalClose} RoleData={RoleData} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
