import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddUnits from "./AddUnits";
import EditUnits from "./EditUnits";
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CategorySkeleton from "../Skeletons/categorySkeleton";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function Units() {
  // Get Units Data
  const [Units, setUnits] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const Naviagte = useHistory();

  useEffect(() => {
    if (LoginUser.role === "admin") {
      Naviagte.push("/units");
    } else {
      Naviagte.push("/");
    }
    let data = {
      email: Email,
      token: Token,
    };

    setOpen(true);

    fetch(MyConstants.listUnit, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setUnits(response.units);
          setOpen(false);
        }
      });
    });
  }, []);
  console.warn(Units);

  // Edit Units Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditUnitsModalData, setEditUnitsModalData] = useState([]);

  const EditUnitsModalClose = () => setEditModalShow(false);
  const EditUnitsModalShow = () => setEditModalShow(true);

  const GetUnitsData = (id, code, name) => {
    let EditUnitsModalData = [id, code, name];
    setEditUnitsModalData([...EditUnitsModalData]);
    return setEditModalShow(true);
  };

  // Add Units Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddUnitsModalData, setAddUnitsModalData] = useState([]);

  const AddUnitsModalClose = () => setAddModalShow(false);
  const AddUnitsModalShow = () => setAddModalShow(true);

  const AddUnitsData = () => {
    setAddUnitsModalData([...AddUnitsModalData]);
    return setAddModalShow(true);
  };

  const edit = () => {
    let data = {
      email: Email,
      token: Token,
    };
    fetch(MyConstants.listUnit, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setUnits(response.units);
        }
      });
    });
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
        let data = {
          email: Email,
          token: Token,
          id: id,
        };
        fetch(MyConstants.deleteUnit, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
            if (response.status == true) {
              edit();
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
            {!open ? (
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
                                Units
                              </h3>
                            </div>
                            {/* .nk-block-head-content */}
                            <div className="nk-block-head-content">
                              <Button
                                to="/units"
                                className="btn btn-primary btn-sm d-none d-md-inline-flex"
                                style={{
                                  backgroundColor: "#398E8B",
                                  border: "#398E8B",
                                  outline: "none",
                                  boxShadow: "none",
                                }}
                                onClick={AddUnitsData}
                              >
                                <em className="icon ni ni-plus" />
                                <span>Add Units</span>
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
                                    <th>Unit Code</th>
                                    <th>Unit Name</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Units ? (
                                    Units.map((item) => (
                                      <tr>
                                        <td>{item.id}</td>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
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
                                              GetUnitsData(
                                                item.id,
                                                item.code,
                                                item.name
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
                                    ))
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={4}
                                        align="center"
                                        className="py-2"
                                      >
                                        <h6>Data not found!</h6>
                                      </td>
                                    </tr>
                                  )}
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
            ) : (
              <CategorySkeleton />
            )}
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

      {/* EditUnits Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditUnitsModalShow}
          onHide={EditUnitsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Units</Modal.Title>
            <a href="#" className="close" onClick={EditUnitsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Edit Units */}
            <EditUnits
              closeModal={EditUnitsModalClose}
              id={EditUnitsModalData[0]}
              code={EditUnitsModalData[1]}
              name={EditUnitsModalData[2]}
              edit={edit}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddUnitsModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddUnitsModalShow}
          onHide={AddUnitsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Add Unit</Modal.Title>
            <a href="#" className="close" onClick={AddUnitsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add Units */}
            <AddUnits closeModal={AddUnitsModalClose} edit={edit} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
