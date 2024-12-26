import * as React from 'react'
import { createPortal } from 'react-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from '@material-ui/core';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
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
  }
  

}));

export default function Modal(props) { 

  //STATES 
const classes = useStyles();
const [open, setOpen] = useState(false);

//SIDE EFFECTS

useEffect(() => {
  setTimeout(() => {
    setOpen(true);
  }, 3000)
}, [])

if (!props.open) return null;

    return createPortal(
      <>      
          <Backdrop className={classes.backdrop} open={open} onClick={()=>{}}>
            <div className={classes.modalMain}>
            <div className={classes.content}>
            <div style={{display: "flex", flexDirection: "row", alignContent: "space-between", padding: "2vh 2vh 2vh 2vh"}}>    
             <div>
              <h3>Collection from Rider</h3>
              </div>
              <div style={{width: "11vw"}}></div> 
              <div>
              <Button 
              onClick={props.onClose}
              style={
               { backgroundColor: "#fff", border: "none", cursor: "pointer", alignSelf: "center", outline: "none"}
              }>
                <AiOutlineClose style={{color: "black", fontSize: "24px", alignSelf: "center"}}/>
              </Button>
              </div>
            </div>
            <hr/>
            <Container>
              <Row>
                <Col><label className="form-label" htmlFor="">Rider Name</label></Col>
                <Col style={{marginBottom: "10px"}}><input type="text" className="form-control" name="name" placeholder="Salman Shahid" onChange={()=>{}}/></Col>
              </Row>
              <Row>
                <Col><label className="form-label" htmlFor="">Collection from Rider</label></Col>
                <Col style={{marginBottom: "10px"}}><input type="text" className="form-control" name="name" placeholder="45" onChange={()=>{}}/></Col>
              </Row>
              <Row>
                <Col><label className="form-label" htmlFor="">Collected Amount</label></Col>
                <Col style={{marginBottom: "10px"}}><input type="text" className="form-control" name="name" placeholder=" " onChange={()=>{}}/></Col>
              </Row>
            </Container>
            <hr/>
            <div style={{display:"flex" , marginTop: "20px", flexDirection: "row-reverse", marginRight: "2vw"}}>
              <Button className="btn btn-danger d-right d-md-inline-flex" onClick={props.onClose} style={{ border: "none", outline: "none",}}>
                Close
              </Button>
              <Button className="btn btn-primary d-right d-md-inline-flex" onClick={()=>{}} style={{backgroundColor: "#398e8b",marginRight: "15px", border: "none", outline: "none",}}>
                Collection
              </Button>
            </div>
            </div>
            </div>
          </Backdrop>
      </>, document.getElementById("portal")
    );  }
