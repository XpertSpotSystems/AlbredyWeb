import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { FaSearch } from "react-icons/fa";
import CategorySkeleton from "../Skeletons/categorySkeleton";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

// Image
const Image = {
  height: "100px",
  width: "100px",
  borderRadius: "10px",
};

export default function ListProducts() {
  // Get ListProducts Data
  const [ListProducts, setListProducts] = useState([]);
  const [EditData, setEditData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const [searchValue, setSearchValue] = useState("");
  const [FilteredResults, setFilteredResults] = useState([]);

  // const SearchItems = (searchValue) => {

  //   if (SearchInput !== "") {
  //     ListProducts.map((item) => {
  //       // if(SearchInput === item.name) {
  //         console.log('SearchInput ::', SearchInput)
  //         console.log('item ::', item.name)
  //         // const FilteredData = ListProducts.filter((item) => {
  //         //   return Object.values(item).join("").toLowerCase().includes(SearchInput);
  //         // });
  //         // setFilteredResults(FilteredData);
  //       // }
  //     })
  //   } else {
  //     setFilteredResults(ListProducts);
  //   }
  // };

  useEffect(() => {
    const newProduct = ListProducts.filter((value) =>
      value.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredResults(newProduct);
  }, [searchValue]);

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      History.push("/");
    }

    let data = {
      email: Email,
      token: Token,
    };

    setOpen(true);
    fetch(MyConstants.listProduct, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListProducts(response.products);
          setOpen(false);
        } else {
          setOpen(false);
        }
      });
    });
  }, []);
  console.warn(ListProducts);

  const edit = () => {
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.listProduct, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListProducts(response.products);
        }
      });
    });
  };

  // Edit
  const History = useHistory();
  const NavigateTo = () => History.push("/add-product");
  const NavigateToEditProductPage = (id) => {
    History.push({
      pathname: "/edit-product",

      state: {
        product_id: id,
      },
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
      let data = {
        email: Email,
        token: Token,
        id: id,
      };

      if (willDelete) {
        fetch(MyConstants.deleteProduct, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
            if (response.status == true) {
              swal("Your imaginary row has been deleted!", {
                icon: "success",
              });
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
                                Products
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
                                onClick={NavigateTo}
                              >
                                <em className="icon ni ni-plus" />
                                <span>Add Product</span>
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
                              <Row>
                                <Col sm="8"></Col>
                                <Col sm="4" className="float-right">
                                  <Form.Group className="mb-3 d-flex">
                                    <Form.Label className="mt-2">
                                      <FaSearch cursor="none" />
                                    </Form.Label>

                                    <Form.Control
                                      type="search"
                                      className="ml-2 form-control-md"
                                      placeholder="Enter Product Name"
                                      onChange={(e) =>
                                        setSearchValue(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <table className="table table-bordered table-hover table-striped table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>Sr#</th>
                                    <th>Image</th>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {searchValue && searchValue.length > 1 ? (
                                    FilteredResults.map((item, index) => {
                                      return (
                                        <tr key={index}>
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
                                          <td>{item.brdname}</td>
                                          <td>
                                            <div className="d-inline-flex">
                                              <Button
                                                onClick={() =>
                                                  NavigateToEditProductPage(
                                                    item.id
                                                  )
                                                }
                                                className="btn btn-primary d-none  btn-sm d-md-inline-flex"
                                                style={{
                                                  backgroundColor: "#398E8B",
                                                  border: "#398E8B",
                                                  outline: "none",
                                                  boxShadow: "none",
                                                }}
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
                                      );
                                    })
                                  ) : ListProducts.length >= 1 ? (
                                    ListProducts.map((item, index) => {
                                      return (
                                        <tr key={index}>
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
                                          <td>{item.brdname}</td>
                                          <td>
                                            <div className="d-inline-flex">
                                              <Button
                                                onClick={() =>
                                                  NavigateToEditProductPage(
                                                    item.id
                                                  )
                                                }
                                                className="btn btn-primary d-none  btn-sm d-md-inline-flex"
                                                style={{
                                                  backgroundColor: "#398E8B",
                                                  border: "#398E8B",
                                                  outline: "none",
                                                  boxShadow: "none",
                                                }}
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
                                      );
                                    })
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
    </div>
  );
}
