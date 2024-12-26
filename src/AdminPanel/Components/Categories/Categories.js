import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import EditCategories from "./EditCategories";
import AddCategories from "./AddCategories";
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

export default function Categories() {
  // Image
  const Image = {
    height: "100px",
    width: "100px",
    borderRadius: "10px",
  };

  // Get Categories Data
  const [Categories, setCategories] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  console.log("LoginUser ===", LoginUser);
  console.log("LoginUserEmail ===", LoginUser.email);
  console.log("LoginUserToken ===", LoginUser.token);

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

    fetch(MyConstants.ListCategories, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setCategories(response.categories);
          setOpen(false);
        }
      });
    });
  }, []);
  console.warn("Categories ::", Categories);

  const edit = () => {
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.ListCategories, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setCategories(response.categories);
        }
      });
    });
  };

  // Edit Categories Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditCategoriesModalData, setEditCategoriesModalData] = useState([]);

  const EditCategoriesModalClose = () => setEditModalShow(false);
  const EditCategoriesModalShow = () => setEditModalShow(true);

  const GetCategoriesData = (
    id,
    image,
    code,
    name
    // description
  ) => {
    let EditCategoriesModalData = [
      id,
      image,
      code,
      name,
      // description
    ];
    setEditCategoriesModalData([...EditCategoriesModalData]);
    return setEditModalShow(true);
  };

  // Add Categories Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddCategoriesModalData, setAddCategoriesModalData] = useState([]);

  const AddCategoriesModalClose = () => setAddModalShow(false);
  const AddCategoriesModalShow = () => setAddModalShow(true);

  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [sub_category, setSubCategory] = useState("");

  const AddCategoryData = () => {
    setAddCategoriesModalData([...AddCategoriesModalData]);
    return setAddModalShow(true);
  };

  // Delete Category
  const DeleteCategory = (id) => {
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

        fetch(MyConstants.DeleteCategory, {
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
                                Categories
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
                                onClick={AddCategoryData}
                              >
                                <em className="icon ni ni-plus" />
                                <span>Add Category</span>
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
                                    <th>Category Image</th>
                                    <th>Category Code</th>
                                    <th>Category Name</th>
                                    {/* <th>Description</th> */}
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Categories ? (
                                    Categories.map((item) => (
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
                                                GetCategoriesData(
                                                  item.id,
                                                  item.image,
                                                  item.code,
                                                  item.name
                                                  // item.description
                                                )
                                              }
                                            >
                                              <em className="icon ni ni-edit" />
                                              <span>Edit</span>
                                            </Button>
                                            <Button
                                              className="btn btn-danger btn-sm ml-2 d-md-inline-flex"
                                              onClick={() =>
                                                DeleteCategory(item.id)
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

      {/* EditCategory Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditCategoriesModalShow}
          onHide={EditCategoriesModalClose}
          backdrop="static"
          size="sm"
        >
          <Modal.Header>
            <Modal.Title>Edit Category</Modal.Title>
            <a href="#" className="close" onClick={EditCategoriesModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Edit Category */}
            <EditCategories
              closeModal={EditCategoriesModalClose}
              id={EditCategoriesModalData[0]}
              image={EditCategoriesModalData[1]}
              code={EditCategoriesModalData[2]}
              name={EditCategoriesModalData[3]}
              // description={EditCategoriesModalData[4]}
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
          show={AddCategoriesModalShow}
          onHide={AddCategoriesModalClose}
          backdrop="static"
          size="sm"
        >
          <Modal.Header>
            <Modal.Title>Add Category</Modal.Title>
            <a href="#" className="close" onClick={AddCategoriesModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add Categories */}
            <AddCategories closeModal={AddCategoriesModalClose} edit={edit} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
