import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import EditAccount from "./EditAccount";
import CategorySkeleton from "../Skeletons/categorySkeleton";

export default function Accounts() {
  // Get ListAccounts Data
  const [ListAccounts, setListAccounts] = useState([]);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    AccountsData();
  }, []);

  const AccountsData = () => {
    setOpen(true);
    let data = {
      email: Email,
      token: Token,
    };

    fetch(MyConstants.ListAccounts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setOpen(false);
          console.log(response.accounts);
          setListAccounts(response.accounts);
        }
      });
    });
  };

  // Edit
  const History = useHistory();
  const NavigateTo = () => History.push("/add-account");

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
        fetch(MyConstants.deleteAccount, {
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
              AccountsData();
            }
          });
        });
      } else {
        swal("Your imaginary row is safe!");
      }
    });
  };

  // Edit Accounts Data
  const [EditAccountModalShow, setEditAccountModalShow] = useState(false);
  const [EditModalData, setEditModalData] = useState([]);

  const EditModalClose = () => setEditAccountModalShow(false);
  const EditModalShow = () => setEditAccountModalShow(true);

  const GetAccountsData = (id, name, type, deefault, opening_balance) => {
    let EditModalData = [id, name, type, opening_balance, deefault];
    setEditModalData([...EditModalData]);
    return setEditAccountModalShow(true);
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
                                Accounts
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
                                <span>Add Account</span>
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
                                    <th>Type</th>
                                    <th>Opening Balance</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ListAccounts.length >= 1 ? (
                                    ListAccounts.map((item) => (
                                      <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.opening_balance}</td>
                                        <td>{item.remaining}</td>
                                        <td>
                                          <Button
                                            className="btn btn-primary d-none  btn-sm d-md-inline-flex"
                                            onClick={() =>
                                              GetAccountsData(
                                                item.id,
                                                item.name,
                                                item.type,
                                                item.deefault,
                                                item.opening_balance
                                              )
                                            }
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

      {/* EditModal */}
      {EditAccountModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditModalShow}
          onHide={EditModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit Modal</Modal.Title>
            <a href="#" className="close" onClick={EditModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <EditAccount
              closeModal={EditModalClose}
              AccountsData={AccountsData}
              id={EditModalData[0]}
              name={EditModalData[1]}
              type={EditModalData[2]}
              opening_balance={EditModalData[3]}
              deefault={EditModalData[4]}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
