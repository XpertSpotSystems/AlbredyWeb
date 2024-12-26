import * as React from "react";
import { createPortal } from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
  modalMain: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
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

export default function Modal(props) {
  //STATES
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  //SIDE EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 3000);
  }, []);

  if (!props.open) return null;

  return createPortal(
    <>
      <Backdrop className={classes.backdrop} open={open} onClick={() => {}}>
        <div className={classes.modalMain}>
          <div className={classes.content}>
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                paddingRight: "1vw",
              }}
            >
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
                <AiOutlineCloseCircle
                  style={{
                    color: "black",
                    fontSize: "24px",
                    alignSelf: "center",
                  }}
                />
              </Button>
            </div>
            <Container>
              <Row style={{ justifyContent: "center" }}>
                <Col className="my-sm-3 my-md-0 d-md-flex align-items-center justify-content-center col-md-6 col-sm-12">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/noInternet.png"}
                    alt="No Internet"
                  />
                </Col>
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <h1>Something Went Wrong!</h1>
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <h4>Check Your Internet Connection.</h4>
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <Button
                  className="btn-lg btn-primary d-right d-lg-inline-flex"
                  onClick={() => {}}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#398e8b",
                    marginRight: "15px",
                    border: "none",
                    outline: "none",
                    marginBottom: "10px",
                  }}
                >
                  Try Again
                </Button>
              </Row>
            </Container>
          </div>
        </div>
      </Backdrop>
    </>,
    document.getElementById("portal")
  );
}
