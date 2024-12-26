import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from '../../Constant/Config'
// import { Link } from 'react-router-dom'
import { Modal, Button } from "react-bootstrap";
import AddRights from "./AddRights";
import EditRights from "./EditRights";
import swal from "sweetalert";

export default function Rights() {
  // Get Rights Data
  const [Rights, setRights] = useState([]);

  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Token = LoginUser.token;

  const RightsData = () => {
    let data = {
      email: Email,
      token: Token,
    }

    fetch(MyConstants.listRights, {
       method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then((result) => {
      result.json().then((response) => {
        if (response.status == true) {
          setRights(response.rights);
        }
      });
    });
  };

  useEffect(() => {
    RightsData();
  }, []);
  console.warn(Rights);

  // Edit Rights Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditRightsModalData, setEditRightsModalData] = useState([]);

  const EditRightsModalClose = () => setEditModalShow(false);
  const EditRightsModalShow = () => setEditModalShow(true);

  const GetRightsData = (id, rightt) => {
    let EditRightsModalData = [id, rightt];
    setEditRightsModalData([...EditRightsModalData]);
    return setEditModalShow(true);
  };

  // Add Rights Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddRightsModalData, setAddRightsModalData] = useState([]);

  const AddRightsModalClose = () => setAddModalShow(false);
  const AddRightsModalShow = () => setAddModalShow(true);

  const AddRightsData = () => {
    setAddRightsModalData([...AddRightsModalData]);
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
      let data = { id: id, email: Email, token: Token };
      if (willDelete) {
        fetch(MyConstants.deleteRights, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            if (response.status == true) {
              RightsData();
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
                              Rights
                            </h3>
                          </div>
                          {/* .nk-block-head-content */}
                          <div className="nk-block-head-content">
                            <Button
                              to="/Rights"
                              className="btn btn-primary btn-sm d-none d-md-inline-flex"
                              style={{
                                backgroundColor: "#398E8B",
                                border: "#398E8B",
                                outline: "none",
                                boxShadow: "none",
                              }}
                              onClick={AddRightsData}
                            >
                              <em className="icon ni ni-plus" />
                              <span>Add Rights</span>
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
                                  <th>Rights</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Rights &&
                                  Rights.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.id}</td>
                                      <td>{item.rightt}</td>
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
                                            GetRightsData(item.id, item.rightt)
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

      {/* EditRights Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditRightsModalShow}
          onHide={EditRightsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Rights</Modal.Title>
            <a href="#" className="close" onClick={EditRightsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Edit Rights */}
            <EditRights
              closeModal={EditRightsModalClose}
              id={EditRightsModalData[0]}
              rights={EditRightsModalData[1]}
              RightsData={RightsData}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddRightsModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddRightsModalShow}
          onHide={AddRightsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Add Rights</Modal.Title>
            <a href="#" className="close" onClick={AddRightsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add Rights */}
            <AddRights
              closeModal={AddRightsModalClose}
              RightsData={RightsData}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
