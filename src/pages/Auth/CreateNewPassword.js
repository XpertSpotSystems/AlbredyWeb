import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import {AiOutlineEye} from 'react-icons/ai'

// Styling
const CustomStyle = makeStyles({
  ContinueButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    width: "80%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
});

const CreateNewPassword = () => {
  //   StylingClasses
  const StylingClasses = CustomStyle();

  return (
    <div>
      <div className="container shadow-lg AuthBg">
        <div className="row">
          <div className="offset-1 col-lg-6 col-11 pt-5">
            <h3 className="text-center fw-500 pt-5">Create New Password</h3>
            <div className=" px-md-5 px-3 py-3">
            <InputGroup className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  className="InputField"
                />
                <InputGroup.Text className="InputFieldGroup">
                  <AiOutlineEye />
                </InputGroup.Text>
              </InputGroup>

              <InputGroup className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter Your Confirm Password"
                  className="InputField"
                />
                <InputGroup.Text className="InputFieldGroup">
                  <AiOutlineEye />
                </InputGroup.Text>
              </InputGroup>

              <div className="d-flex justify-content-center pt-4">
                <Button
                  variant="contained"
                  className={StylingClasses.ContinueButton}
                >
                 Continue
                </Button>
              </div>
            </div>
          </div>
          <div className="offset-1 col-md-4 col-sm-11 mt-3 mt-md-0">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/auth_right_image.png"}
              alt="RightImage"
              height={400}
              width={385}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
