import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddSubCategories from "./AddSubCategories";
import EditSubCategories from "./EditSubCategories";
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CategorySkeleton from "../Skeletons/categorySkeleton";

// Image
const Image = {
  height: "100px",
  width: "100px",
  borderRadius: "10px",
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function SubCategories() {
  // Get SubCategories Data
  const [SubCategories, setSubCategories] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Get Categories Data
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
    };

    // setOpen(true);

    fetch(MyConstants.ListCategories, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn('Testing', response);
        if (response.status == true) {
          setCategories(response.categories);
          // setOpen(false);
        }
      });
    });
  }, []);

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

    fetch(MyConstants.listSubCategories, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setSubCategories(response.sub_categories);
          setOpen(false);
        }
      });
    });
  }, []);
  console.warn(SubCategories);

  // Edit SubCategories Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditSubCategoriesModalData, setEditSubCategoriesModalData] = useState(
    []
  );

  const EditSubCategoriesModalClose = () => setEditModalShow(false);
  const EditSubCategoriesModalShow = () => setEditModalShow(true);

  const GetSubCategoriesData = (
    id,
    code,
    name,
    ctgname,
    parent_category,
    // description,
    image
  ) => {
    let EditSubCategoriesModalData = [
      id,
      code,
      name,
      ctgname,
      parent_category,
      // description,
      image,
    ];
    setEditSubCategoriesModalData([...EditSubCategoriesModalData]);

    EditSubCategoriesModalShow();
  };

  // Add SubCategories Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddSubCategoriesModalData, setAddSubCategoriesModalData] = useState(
    []
  );

  const AddSubCategoriesModalClose = () => setAddModalShow(false);
  const AddSubCategoriesModalShow = () => setAddModalShow(true);

  const AddSubCategoryData = () => {
    setAddSubCategoriesModalData([...AddSubCategoriesModalData]);
    return setAddModalShow(true);
  };

  const edit = () => {
    let data = {
      email: Email,
      token: Token,
    };
    fetch(MyConstants.listSubCategories, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status === true) {
          setSubCategories(response.sub_categories);
        }
      });
    });
  };

  // Delete SubCategory
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
        fetch(MyConstants.deleteSubCategory, {
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
                      <div className="components-preview">
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
                                Sub Categories
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
                                onClick={AddSubCategoryData}
                              >
                                <em className="icon ni ni-plus" />
                                <span>Add Sub Categories</span>
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
                                    <th>Image</th>
                                    <th>Sub Category Code</th>
                                    <th>Sub Category Name</th>
                                    <th>Parent Category</th>
                                    {/* <th>Description</th> */}
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {SubCategories ? (
                                    SubCategories.map((item) => (
                                      <tr>
                                        <td>{item.id}</td>
                                        <td>
                                          <img
                                            src={
                                              MyConstants.ImageUrl +
                                              `${item.image}`
                                            }
                                            style={Image}
                                          />
                                        </td>
                                        <td>{item.code}</td>
                                        <td>{item.name}</td>
                                        <td>{item.ctgname}</td>
                                        {/* <td>{item.description}</td> */}
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              className="btn btn-primary d-none  btn-sm d-md-inline-flex"
                                              style={{
                                                backgroundColor: "#398E8B",
                                                border: "#398E8B",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              onClick={() =>
                                                GetSubCategoriesData(
                                                  item.id,
                                                  item.code,
                                                  item.name,
                                                  item.ctgname,
                                                  item.parent_category,
                                                  // item.description,
                                                  item.image
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
                                        colSpan={6}
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

      {/* EditSubCategory Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditSubCategoriesModalShow}
          onHide={EditSubCategoriesModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Sub Category</Modal.Title>
            <a href="#" className="close" onClick={EditSubCategoriesModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Edit SubCategories */}
            <EditSubCategories
              closeModal={EditSubCategoriesModalClose}
              id={EditSubCategoriesModalData[0]}
              code={EditSubCategoriesModalData[1]}
              name={EditSubCategoriesModalData[2]}
              ctgname={EditSubCategoriesModalData[3]}
              parent_category={EditSubCategoriesModalData[4]}
              // description={EditSubCategoriesModalData[5]}
              image={EditSubCategoriesModalData[5]}
              Categories={Categories}
              edit={edit}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddCategoriesModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddSubCategoriesModalShow}
          onHide={AddSubCategoriesModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Add Sub Category</Modal.Title>
            <a href="#" className="close" onClick={AddSubCategoriesModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add SubCategories */}
            <AddSubCategories
              closeModal={AddSubCategoriesModalClose}
              edit={edit}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
