import * as React from "react";
import { createPortal } from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { GoChevronDown } from "react-icons/go";
import * as MyConstants from "../../Constant/Config";
import Axios from "axios";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
  modalMain: {
    position: "fixed",
    height: "200vh",
    width: "200vw",
    zIndex: theme.zIndex.drawer + 2,
  },
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    lineHeight: "1.4",
    background: "white",
    padding: "2vh 0vh 2vh 0vh",
    maxWidth: "600px",
    minWidth: "300px",
    textAlign: "left",
    borderRadius: "10px",
    zIndex: "1000",
  },
}));

export default function AddPaymentModal(props) {
  // CONSTANTS
  const LoginUser = JSON.parse(localStorage.getItem("LOGIN_USER"));
  const LoginToken = JSON.parse(localStorage.getItem("LOGIN_TOKEN"));
  //STATES
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  //const [accounts, setAccounts] = useState([]);
  const [selectedAccountID, setSelectedAccountID] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [total, setTotal] = useState(props.data.remaining);

  //SIDE EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 3000);

    let data = {
      email: LoginUser.email,
      token: LoginToken,
    };

    // fetch(MyConstants.ListAccounts, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // }).then((result) => {
    //   result.json().then((response) => {
    //     if (response.status == true) {
    //       setAccounts(response.accounts);
    //     } else {
    //       console.log(response);
    //     }
    //   });
    // });
  }, []);

  const submitFormData = () => {
    if (selectedAccountID.length == 0) {
      alert("Please Select Account", selectedAccountID);
      return;
    } else {
      const formData = new FormData();
      formData.append("email", LoginUser.email);
      formData.append("token", LoginToken);
      formData.append("purchase_id", props.data.id);
      formData.append("date", date);
      formData.append("amount", total);
      formData.append("paid_from", selectedAccountID);

      console.table(props.data.id, date, total, selectedAccountID);

      //API CALL
      Axios.post(MyConstants.addPurchasePayment, formData).then((result) => {
        if (result.data.status == true) {
          console.log(result.data.message);
          console.log(result.data);
          swal({
            title: "Success!",
            text: "Payment has been updated successfully!",
            icon: "success",
            button: "Ok",
          });
        } else {
          swal({
            title: "Error!",
            text: result.data.message,
            icon: "error",
            button: "Ok",
          });
        }
      });
    }
  };

  if (!props.open) return null;

  return createPortal(
    <>
      <Backdrop className={classes.backdrop} open={open} onClick={() => {}}>
        <div className={classes.modalMain}>
          <div className={classes.content}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "space-between",
                padding: "2vh 2vh 2vh 2vh",
              }}
            >
              <div>
                <h3>Add Supplier Payment</h3>
              </div>
              <div style={{ width: "11vw" }}></div>
              <div>
                <Button
                  onClick={props.onClose}
                  style={{
                    backgroundColor: "#fff",
                    border: "none",
                    cursor: "pointer",
                    alignSelf: "center",
                    outline: "none",
                  }}
                >
                  <AiOutlineClose
                    style={{
                      color: "black",
                      fontSize: "24px",
                      alignSelf: "center",
                    }}
                  />
                </Button>
              </div>
            </div>
            <hr />
            <Container>
              <Row>
                <Col>
                  <label className="form-label" htmlFor="">
                    Supplier Name
                  </label>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={props.data.name}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-label" htmlFor="">
                    Total
                  </label>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <input
                    type="number"
                    max={props.data.remaining}
                    className="form-control"
                    name="total"
                    defaultValue={props.data.remaining}
                    onChange={(e) => {
                      setTotal(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-label" htmlFor="">
                    Select Date
                  </label>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <input
                    type="date"
                    className="form-control"
                    name="Date"
                    defaultValue={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="form-label" htmlFor="">
                    Select Account
                  </label>
                </Col>
                <Col style={{ marginBottom: "10px" }}>
                  <Form.Group>
                    <select
                      className="form-control custom-select"
                      name="account_select"
                      onChange={(e) => {
                        setSelectedAccountID(e.target.value);
                      }}
                      //defaultValue={selectedAccountID}
                    >
                      <option>Please Select Account ...</option>
                      {props.accounts.length > 0 ? (
                        props.accounts.map((item) => {
                          return (
                            <option
                              value={item.id}
                              onSelect={() => {
                                setSelectedAccountID(item.id);
                              }}
                              defaultValue={item.id}
                            >
                              {item.name}
                            </option>
                          );
                        })
                      ) : (
                        <option value="Select Order Status..." disabled={false}>
                          No Accounts found
                        </option>
                      )}
                    </select>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <hr />
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                flexDirection: "row-reverse",
                marginRight: "2vw",
              }}
            >
              <Button
                className="btn btn-danger d-right d-md-inline-flex"
                onClick={props.onClose}
                style={{ border: "none", outline: "none" }}
              >
                Close
              </Button>
              <Button
                className="btn btn-primary d-right d-md-inline-flex"
                onClick={() => {
                  submitFormData();
                }}
                style={{
                  backgroundColor: "#398e8b",
                  marginRight: "15px",
                  border: "none",
                  outline: "none",
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal")
  );
}

export const AccountDropdown = () => {
  return (
    <>
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
            <span>Select Account...</span>
            <GoChevronDown />
          </span>
        }
      >
        <Dropdown.Item id="dropdown-item" as="button" onClick={() => {}}>
          View Detail
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};
