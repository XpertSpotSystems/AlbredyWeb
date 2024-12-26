import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import { FaSearch } from "react-icons/fa";
import * as MyConstants from "../../Constant/Config";
import {
  Button,
  Col,
  Form,
  Row,
  Dropdown,
  DropdownButton,
  InputGroup,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { AiFillCaretDown } from "react-icons/ai";
import Modal from "../Portal/Modal";
import CategorySkeleton from "../Skeletons/categorySkeleton";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function ListRiders() {
  //GET RIDERS LIST
  const [ListRiders, setListRiders] = useState([]);
  const [EditData, setEditData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const [searchValue, setSearchValue] = useState("");
  const [FilteredResults, setFilteredResults] = useState([]);

  //Side Effects

  useEffect(() => {
    const newProduct = ListRiders.filter(
      (value) =>
        value.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        value.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredResults(newProduct);
  }, [searchValue]);
  // console.table(setFilteredResults, ListRiders);

  const GetRiders = () => {
    let data = {
      email: Email,
      token: Token,
    };
    // ***API CALL***//
    setOpen(true);
    fetch(MyConstants.listRider, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setListRiders(response.riders);
          setOpen(false);
        } else {
          setOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      History.push("/");
    }
    GetRiders();
  }, []);

  //SIDE EFFECT TO STORE RIDER DATA DUMMY
  // useEffect(() => {
  //   const dummyRiders = {
  //     name: "Albert Einstien",
  //     earnings: "0.00",
  //     collection: "0.00",
  //   };
  //   setTimeout(() => {
  //     setListRiders([...ListRiders, dummyRiders]);
  //   }, 1000);
  //   console.log(ListRiders);
  // }, []);

  //*ADD_RIDER PAGE NAVIGATION*//
  const History = useHistory();
  const NavigateTo = () => History.push("/add-rider");
  const NavigateToEditRiderPage = (id) => {
    History.push({
      pathname: "/edit-rider",

      state: {
        rider_id: id,
      },
    });
  };

  // Delete Data
  const DeleteData = (id) => {
    console.log("íd ::::", id);
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
        rider_id: id,
      };

      if (willDelete) {
        fetch(MyConstants.deleteRider, {
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
              GetRiders();
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
                                Riders
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
                                <span>Add Rider</span>
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
                                <Col sm="6"></Col>
                                <Col sm="6" className="float-right">
                                  {/* <Form.Group className="mb-3 d-flex">
                                <Form.Label className="mt-2">
                                  <FaSearch cursor='none'/>
                                  </Form.Label>
                                  <Form.Control
                                    type="search"
                                    className="ml-2 form-control-md"
                                    placeholder="Search with Rider Name and Rider Email..."
                                    onChange={(e) =>
                                      setSearchValue(e.target.value)
                                    }
                                  />
                                </Form.Group> */}
                                  <InputGroup className="mb-3">
                                    <InputGroup.Text>
                                      <FaSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                      type="search"
                                      className="form-control-md"
                                      placeholder="Search with Rider Name and Rider Email..."
                                      onChange={(e) =>
                                        setSearchValue(e.target.value)
                                      }
                                    />
                                  </InputGroup>
                                </Col>
                              </Row>
                              <table className="table table-bordered table-hover table-striped table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>Sr#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {searchValue && searchValue.length > 1 ? (
                                    FilteredResults.map((rider, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{rider.id}</td>
                                          <td>{rider.name}</td>
                                          <td>{rider.email}</td>
                                          <td>{rider.phone}</td>
                                          <td>
                                            <div className="d-inline-flex">
                                              <OptionDropDown
                                                handleEdit={() =>
                                                  NavigateToEditRiderPage(
                                                    rider.id
                                                  )
                                                }
                                                handleDelete={() =>
                                                  DeleteData(rider.id)
                                                }
                                              />
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : ListRiders.length >= 1 ? (
                                    ListRiders.map((rider, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{rider.id}</td>
                                          <td>{rider.name}</td>
                                          <td>{rider.email}</td>
                                          <td>{rider.phone}</td>
                                          <td>
                                            <div className="dropdown d-inline-flex">
                                              <OptionDropDown
                                                handleEdit={() =>
                                                  NavigateToEditRiderPage(
                                                    rider.id
                                                  )
                                                }
                                                handleDelete={() =>
                                                  DeleteData(rider.id)
                                                }
                                              />
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
              {/* footer @e */}
            </div>
            {/* wrap @e */}
          </div>
          {/* main @e */}
        </div>
        {/* nk-app-root */}
      </div>
    </div>
  );
}

export const OptionDropDown = (props) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  return (
    <>
      <Modal
        open={ModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <DropdownButton
        id="dropdown-item-button"
        title={
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span>Actions</span>
            <AiFillCaretDown />
          </span>
        }
      >
        <Dropdown.Item
          id="dropdown-item"
          as="button"
          onClick={props.handleEdit}
        >
          Edit
        </Dropdown.Item>
        {/* <Dropdown.Item id="dropdown-item" as="button" onClick={() => {}}>
          Ban Rider
        </Dropdown.Item> */}
        <Dropdown.Item id="dropdown-item" as="button" onClick={handleModalOpen}>
          Go to Collection
        </Dropdown.Item>
        {/* <Dropdown.Item id="dropdown-item" as="button" onClick={handleModalOpen}>
          Go to Payment
        </Dropdown.Item> */}
        <Dropdown.Divider />
        <Dropdown.Item
          id="dropdown-item"
          as="button"
          onClick={props.handleDelete}
        >
          Delete Rider
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};
