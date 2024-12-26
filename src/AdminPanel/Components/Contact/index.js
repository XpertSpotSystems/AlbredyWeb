import React, { useState, useEffect } from "react";
import Sidebar from "../../ReuseableComponents/Sidebar";
import Header from "../../ReuseableComponents/Header";
import Footer from "../../ReuseableComponents/Footer";
import * as MyConstants from "../../Constant/Config";
import { Button, Col, Modal, Row } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import CategorySkeleton from "../Skeletons/categorySkeleton";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function Contact() {
  // Get Contact Data
  const [Contact, setContact] = useState([]);
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
    fetch(MyConstants.ListContactUs, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        if (response.status == true) {
          setContact(response.contactus_data);
          setOpen(false);
        }
      });
    });
  }, []);

  // Contact Data
  const [ContactShow, setContactShow] = useState(false);
  const [ContactModalData, setContactModalData] = useState([]);

  const ContactModalClose = () => setContactShow(false);
  const ContactModalShow = () => setContactShow(true);

  const GetContactData = (id, name, email, contact_no, message) => {
    let ContactUsModalData = [id, name, email, contact_no, message];
    setContactModalData([...ContactUsModalData]);
    return setContactShow(true);
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
                                Contact
                              </h3>
                            </div>
                            {/* .nk-block-head-content */}
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
                                    <th>Email Address</th>
                                    <th>Contact No</th>
                                    <th>Message</th>
                                    {/* <th>Actions</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {Contact ? (
                                    Contact.map((item) => (
                                      <tr>
                                        <td style={{ maxWidth: "100px" }}>
                                          {item.id}
                                        </td>
                                        <td>{item.name}</td>
                                        <td style={{ maxWidth: "200px" }}>
                                          {item.email}
                                        </td>
                                        <td style={{ maxWidth: "150px" }}>
                                          {item.contact_no}
                                        </td>
                                        {/* <td className="text-justify" style={{ height: "50px" }}>{item.message}</td> */}
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
                                                GetContactData(
                                                  item.id,
                                                  item.name,
                                                  item.email,
                                                  item.contact_no,
                                                  item.message
                                                )
                                              }
                                            >
                                              <em className="icon ni ni-eye" />
                                              <span>View Message</span>
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

      {/* ContactModal */}
      {ContactShow === true ? (
        <Modal
          className="fade zoom"
          show={ContactModalShow}
          onHide={ContactModalClose}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Message Detail</Modal.Title>
            <a href="#" className="close" onClick={ContactModalClose}>
              <em className="icon ni ni-cross" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  defaultValue={ContactModalData[4]}
                  disabled
                  className="text-justify"
                  as="textarea"
                  rows={10}
                />
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
