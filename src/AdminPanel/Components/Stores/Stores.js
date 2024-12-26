import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddStores from "./AddStores";
import EditStores from "./EditStores";
import swal from "sweetalert";

// Image
const Image = {
  height: "100px",
  width: "100px",
  borderRadius: "10px",
};

export default function Stores() {
  // Get Stores Data
  const [Stores, setStores] = useState([]);

  const LoginUser = JSON.parse(sessionStorage.getItem("LOGIN_USER"));

  const Email = LoginUser.email;
  const Token = LoginUser.token;

  console.log("LoginUser ===", LoginUser);
  console.log("LoginUserEmail ===", LoginUser.email);
  console.log("LoginUserToken ===", LoginUser.token);

  useEffect(() => {
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.ListStores, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((result) => {
        if (result.status == true) {
          console.log(result.stores);
          setStores(result.stores);
        }
      });
    });
  }, []);
  console.warn(Stores);

  const edit = () => {
    let data = {
      email: Email,
      token: Token,
    };
    fetch(MyConstants.ListStores, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((result) => {
        if (result.status == true) {
          console.log(result.stores);
          setStores(result.stores);
        }
      });
    });
  };

  // Edit Stores Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditStoresModalData, setEditStoresModalData] = useState([]);

  const EditStoresModalClose = () => setEditModalShow(false);
  const EditStoresModalShow = () => setEditModalShow(true);

  const GetStoresData = (
    id,
    name,
    code,
    email,
    address,
    phone,
    commission,
    image,
    user_id,
    category_id
  ) => {
    let EditStoresModalData = [
      id,
      name,
      code,
      email,
      address,
      phone,
      commission,
      image,
      user_id,
      category_id,
    ];
    setEditStoresModalData([...EditStoresModalData]);
    return setEditModalShow(true);
  };

  // Add Stores Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddStoresModalData, setAddStoresModalData] = useState([]);

  const AddStoresModalClose = () => setAddModalShow(false);
  const AddStoresModalShow = () => setAddModalShow(true);

  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [sub_category, setSubCategory] = useState("");

  const AddStoresData = () => {
    setAddStoresModalData([...AddStoresModalData]);
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
        let data = {
          email: Email,
          token: Token,
          id: id
        }

        fetch(MyConstants.deleteStores, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
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
                              Stores
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
                              onClick={AddStoresData}
                            >
                              <em className="icon ni ni-plus" />
                              <span>Add Store</span>
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
                                  <th>Image</th>
                                  <th>Name</th>
                                  <th>Email Address</th>
                                  {/* <th>Phone</th> */}
                                  <th>Owner</th>
                                  <th>Commission</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Stores.map((item) => (
                                  <tr>
                                    <td>
                                      <img
                                        src={
                                          MyConstants.ImageUrl + `${item.image}`
                                        }
                                        style={Image}
                                      />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    {/* <td>{item.phone}</td> */}
                                    <td>{item.owner_name}</td>
                                    <td>{item.commission}</td>
                                    <td className="d-inline-flex">
                                      <Button
                                        className="btn btn-primary d-none  btn-sm d-md-inline-flex"
                                        style={{
                                          backgroundColor: "#398E8B",
                                          border: "#398E8B",
                                          outline: "none",
                                          boxShadow: "none",
                                        }}
                                        onClick={() =>
                                          GetStoresData(
                                            item.store_id,
                                            item.name,
                                            item.code,
                                            item.email,
                                            item.address,
                                            item.phone,
                                            item.commission,
                                            item.image,
                                            item.user_id,
                                            item.category_id
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

      {/* EditStores Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditStoresModalShow}
          onHide={EditStoresModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Stores</Modal.Title>
            <a href="#" className="close" onClick={EditStoresModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please fill in the information below. The field labels marked with
              * are required input fields.
            </p>
            {/* Edit Stores */}
            <EditStores
              closeModal={EditStoresModalClose}
              edit={edit}
              id={EditStoresModalData[0]}
              name={EditStoresModalData[1]}
              code={EditStoresModalData[2]}
              email={EditStoresModalData[3]}
              address={EditStoresModalData[4]}
              phone={EditStoresModalData[5]}
              commission={EditStoresModalData[6]}
              image={EditStoresModalData[7]}
              user_id={EditStoresModalData[8]}
              category_id={EditStoresModalData[9]}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddStoresModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddStoresModalShow}
          onHide={AddStoresModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Add Store</Modal.Title>
            <a href="#" className="close" onClick={AddStoresModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add Stores */}
            <AddStores closeModal={AddStoresModalClose} edit={edit} />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
