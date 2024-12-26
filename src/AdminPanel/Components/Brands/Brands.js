import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button } from "react-bootstrap";
import AddBrands from "./AddBrands";
import EditBrands from "./EditBrands";
import swal from "sweetalert";
import reactHtmlParser from "react-html-parser";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { useHistory } from "react-router-dom";
import CategorySkeleton from "../Skeletons/categorySkeleton";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function Brands() {
  // Get Brands
  const [Brands, setBrands] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const Naviagte = useHistory();

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      Naviagte.push("/");
    }

    let data = {
      email: Email,
      token: Token,
    };

    setOpen(true);
    fetch(MyConstants.listBrand, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setBrands(response.categories);
          setOpen(false);
        }
      });
    });
  }, []);
  console.warn(Brands);

  // Edit Brands Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditBrandsModalData, setEditBrandsModalData] = useState([]);

  const EditBrandsModalClose = () => setEditModalShow(false);
  const EditBrandsModalShow = () => setEditModalShow(true);

  const GetBrandsData = (id, name, code, description) => {
    let EditBrandsModalData = [id, name, code, description];
    setEditBrandsModalData([...EditBrandsModalData]);
    return setEditModalShow(true);
  };

  // Add Brands Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddBrandsModalData, setAddBrandsModalData] = useState([]);

  const AddBrandsModalClose = () => setAddModalShow(false);
  const AddBrandsModalShow = () => setAddModalShow(true);

  const AddBrandsData = () => {
    setAddBrandsModalData([...AddBrandsModalData]);
    return setAddModalShow(true);
  };

  const edit = () => {
    let data = {
      email: Email,
      token: Token,
    };
    fetch(MyConstants.listBrand, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setBrands(response.categories);
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

        fetch(MyConstants.deleteBrand, {
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
                                Brands
                              </h3>
                            </div>
                            {/* .nk-block-head-content */}
                            <div className="nk-block-head-content">
                              <Button
                                className="btn btn-primary btn-sm d-none d-md-inline-flex"
                                style={{
                                  backgroundColor: "#398E8B",
                                  border: "#398E8B",
                                  outline: "none",
                                  boxShadow: "none",
                                }}
                                onClick={AddBrandsData}
                              >
                                <em className="icon ni ni-plus" />
                                <span>Add Brands</span>
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
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Brands && Brands ? (
                                    Brands.map((item) => (
                                      <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.code}</td>
                                        <td>
                                          {reactHtmlParser(item.description)}
                                        </td>
                                        <td>
                                          <div className="d-inline-flex">
                                            <Button
                                              className="btn btn-primary d-none  btn-sm d-md-inline-flex"
                                              style={{
                                                backgroundColor: "#398E8B",
                                                border: "#398E8B",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              onClick={() =>
                                                GetBrandsData(
                                                  item.id,
                                                  item.name,
                                                  item.code,
                                                  item.description
                                                )
                                              }
                                            >
                                              <em className="icon ni ni-edit" />
                                              <span>Edit</span>
                                            </Button>
                                            <Button
                                              className="btn btn-danger btn-sm ml-2 d-md-inline-flex"
                                              onClick={() =>
                                                DeleteData(item.id)
                                              }
                                            >
                                              <em className="icon ni ni-trash" />
                                              <span>Delete</span>
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={5}
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

      {/* EditBrands Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditBrandsModalShow}
          onHide={EditBrandsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Brands</Modal.Title>
            <a href="#" className="close" onClick={EditBrandsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Edit Brands */}
            <EditBrands
              closeModal={EditBrandsModalClose}
              id={EditBrandsModalData[0]}
              name={EditBrandsModalData[1]}
              code={EditBrandsModalData[2]}
              description={EditBrandsModalData[3]}
              edit={edit}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddBrandsModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddBrandsModalShow}
          onHide={AddBrandsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Add Brands</Modal.Title>
            <a href="#" className="close" onClick={AddBrandsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add Brands */}
            <AddBrands closeModal={AddBrandsModalClose} edit={edit} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
