import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Modal, Button } from "react-bootstrap";
import AddGeneralSettings from "./AddGeneralSettings";
import EditGeneralSettings from "./EditGeneralSettings";
import swal from "sweetalert";
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

// Image
const Image = {
  height: "100px",
  width: "100px",
  borderRadius: "10px",
};

export default function GeneralSettings() {
  // Get GeneralSettings Data
  const [GeneralSettings, setGeneralSettings] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  const Email = LoginUser.email;
  const Token = LoginToken;

  const data = () => {
    let data = {
      email: Email,
      token: Token,
    };

    setOpen(true);
    fetch(MyConstants.listGeneral, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setGeneralSettings(response.general_setting);

          localStorage.setItem(
            "general_set",
            JSON.stringify(response.general_setting[0])
          );
          setOpen(false);
        } else {
          alert("no data found");
          setOpen(false);
        }
      });
    });
  };

  const Navigate = useHistory();

  useEffect(() => {
    if (LoginUser.role !== "admin") {
      Navigate.push("/");
    }
    data();
  }, []);
  console.warn("GeneralSettings ==", GeneralSettings);

  // Edit GeneralSettings Data
  const [EditModalShow, setEditModalShow] = useState(false);
  const [EditGeneralSettingsModalData, setEditGeneralSettingsModalData] =
    useState([]);

  const EditGeneralSettingsModalClose = () => setEditModalShow(false);
  const EditGeneralSettingsModalShow = () => setEditModalShow(true);

  const GetGeneralSettingsData = (
    id,
    email,
    phone,
    address,
    logo,
    facebook_link,
    twitter_link,
    instagram_link,
    description,
    currency_symbol,
    currency_id
  ) => {
    let EditGeneralSettingsModalData = [
      id,
      email,
      phone,
      address,
      logo,
      facebook_link,
      twitter_link,
      instagram_link,
      description,
      currency_symbol,
      currency_id,
    ];
    setEditGeneralSettingsModalData([...EditGeneralSettingsModalData]);
    console.log("description ===", description);
    return setEditModalShow(true);
  };

  // Add GeneralSettings Data
  const [AddModalShow, setAddModalShow] = useState(false);
  const [AddGeneralSettingsModalData, setAddGeneralSettingsModalData] =
    useState([]);

  const AddGeneralSettingsModalClose = () => setAddModalShow(false);
  const AddGeneralSettingsModalShow = () => setAddModalShow(true);

  const AddGeneralSettingsData = () => {
    setAddGeneralSettingsModalData([...AddGeneralSettingsModalData]);
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
          id: id,
        };

        fetch(MyConstants.deleteGeneral, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
            if (response.status == true) {
              data();
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
                                General Settings
                              </h3>
                            </div>
                            {/* .nk-block-head-content */}
                            <div className="nk-block-head-content">
                              <Button
                                to="/general-settings"
                                className="btn btn-primary btn-sm d-none d-md-inline-flex"
                                style={{
                                  backgroundColor: "#398E8B",
                                  border: "#398E8B",
                                  outline: "none",
                                  boxShadow: "none",
                                }}
                                onClick={AddGeneralSettingsData}
                                disabled={
                                  GeneralSettings.length > 0 ? "disabled" : ""
                                }
                              >
                                <em className="icon ni ni-plus" />
                                <span>Add General Setting</span>
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
                                    <th>Logo Image</th>
                                    <th>Email Address</th>
                                    <th>Contact No</th>
                                    <th>Facebook</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {GeneralSettings ? (
                                    GeneralSettings.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                          <img
                                            src={
                                              MyConstants.SecondImageUrl +
                                              `${item.logo}`
                                            }
                                            style={Image}
                                            alt="Image not found"
                                          />
                                        </td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.facebook_link}</td>
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
                                                GetGeneralSettingsData(
                                                  item.id,
                                                  item.email,
                                                  item.phone,
                                                  item.address,
                                                  item.logo,
                                                  item.facebook_link,
                                                  item.instagram_link,
                                                  item.twitter_link,
                                                  item.description,
                                                  item.currency_symbol,
                                                  item.currency_id
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

      {/* EditGeneralSettings Modal */}
      {EditModalShow === true ? (
        <Modal
          className="fade zoom"
          show={EditGeneralSettingsModalShow}
          onHide={EditGeneralSettingsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Edit General Settings</Modal.Title>
            <a
              href="#"
              className="close"
              onClick={EditGeneralSettingsModalClose}
            >
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Edit GeneralSettings */}
            <EditGeneralSettings
              closeModal={EditGeneralSettingsModalClose}
              data={data}
              id={EditGeneralSettingsModalData[0]}
              email={EditGeneralSettingsModalData[1]}
              phone={EditGeneralSettingsModalData[2]}
              address={EditGeneralSettingsModalData[3]}
              logo={EditGeneralSettingsModalData[4]}
              facebook_link={EditGeneralSettingsModalData[5]}
              twitter_link={EditGeneralSettingsModalData[6]}
              instagram_link={EditGeneralSettingsModalData[7]}
              description={EditGeneralSettingsModalData[8]}
              currency_symbol={EditGeneralSettingsModalData[9]}
              currency_id={EditGeneralSettingsModalData[10]}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      {/* AddGeneralSettingsModal */}
      {AddModalShow === true ? (
        <Modal
          className="fade zoom"
          show={AddGeneralSettingsModalShow}
          onHide={AddGeneralSettingsModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Add General Settings</Modal.Title>
            <a
              href="#"
              className="close"
              onClick={AddGeneralSettingsModalClose}
            >
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            {/* Add GeneralSettings */}
            <AddGeneralSettings
              closeModal={AddGeneralSettingsModalClose}
              data={data}
            />
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
