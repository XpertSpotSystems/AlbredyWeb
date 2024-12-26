import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Link, useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddTaggs from "./AddTaggs";
import EditTaggs from "./EditTaggs";
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

export default function TaggedProducts() {
  // Get TaggedProducts Data
  const [TaggedProducts, setTaggedproducts] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const History = useHistory();

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      History.push("/");
    }

    let data = {
      email: Email,
      token: Token,
    };

    setOpen(true);
    fetch(MyConstants.listTaggedProducts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setTaggedproducts(response.tag_products);
          setOpen(false);
        } else {
          setOpen(false);
        }
      });
    });
  }, []);

  // Edit TaggedProducts Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditTaggedProductsModalData, setEditTaggedProductsModalData] =
    useState([]);

  const EditTaggedProductsModalClose = () => setEditModalShow(false);
  const EditTaggedProductsModalShow = () => setEditModalShow(true);

  const GetData = (id, product, popular, featured, discount) => {
    let EditTaggedProductsModalData = [
      id,
      product,
      popular,
      featured,
      discount,
    ];
    setEditTaggedProductsModalData([...EditTaggedProductsModalData]);
    return setEditModalShow(true);
  };

  // Add TaggedProducts Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddTaggedProductsModalData, setAddTaggedProductsModalData] = useState(
    []
  );

  const AddTaggedProductsModalClose = () => setAddModalShow(false);
  const AddTaggedProductsModalShow = () => setAddModalShow(true);

  const AddData = () => {
    setAddTaggedProductsModalData([...AddTaggedProductsModalData]);
    return setAddModalShow(true);
  };

  const edit = () => {
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.listTaggedProducts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setTaggedproducts(response.tag_products);
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
        fetch(MyConstants.deleteTaggedProduct, {
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
                                Tagged Products
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
                                onClick={AddData}
                              >
                                <em className="icon ni ni-plus" />
                                <span>Add Tagged Products</span>
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
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Popular</th>
                                    <th>Featured</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {TaggedProducts.length >= 1 ? (
                                    TaggedProducts.map((item) => (
                                      <tr>
                                        <td>{item.id}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.product_price}</td>
                                        <td>
                                          {item.popular == "null"
                                            ? ""
                                            : item.popular}
                                        </td>
                                        <td>
                                          {item.featured === "null"
                                            ? ""
                                            : item.featured}
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
                                                GetData(
                                                  item.id,
                                                  item.product,
                                                  item.popular,
                                                  item.featured
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
                                        colSpan={7}
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
          show={EditTaggedProductsModalShow}
          onHide={EditTaggedProductsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Tagged Products</Modal.Title>
            <a
              href="#"
              className="close"
              onClick={EditTaggedProductsModalClose}
            >
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please fill in the information below. The field labels marked with
              * are required input fields.
            </p>
            {/* EditTaggs */}
            <EditTaggs
              closeModal={EditTaggedProductsModalClose}
              edit={edit}
              id={EditTaggedProductsModalData[0]}
              product={EditTaggedProductsModalData[1]}
              popular={EditTaggedProductsModalData[2]}
              featured={EditTaggedProductsModalData[3]}
              discount={EditTaggedProductsModalData[4]}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddTaggedProductsModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddTaggedProductsModalShow}
          onHide={AddTaggedProductsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Add Tagged Products</Modal.Title>
            <a href="#" className="close" onClick={AddTaggedProductsModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please fill in the information below. The field labels marked with
              * are required input fields.
            </p>
            {/* Add Units */}
            <AddTaggs closeModal={AddTaggedProductsModalClose} edit={edit} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
