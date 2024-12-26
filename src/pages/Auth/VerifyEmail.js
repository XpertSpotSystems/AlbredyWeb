import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import OTPInput from "otp-input-react";

// Styling
const CustomStyle = makeStyles({
  ContinueButton: {
    background: "#398E8B",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    width: "50%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#333",
      color: "#fff",
    },
  },
  ResendButton: {
    background: "#333",
    color: "#fff",
    padding: "6px 30px",
    textTransform: "capitalize",
    width: "50%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      background: "#398E8B",
      color: "#fff",
    },
  },
});

const VerifyEmail = () => {
  //   StylingClasses
  const StylingClasses = CustomStyle();

  const [OTP, setOTP] = useState("");

  return (
    <div>
      <div className="container shadow-lg AuthBg">
        <div className="row">
          <div className="offset-1 col-lg-6 col-11">
            <h3 className="text-center fw-500 pt-5">verifiction</h3>
            <h6 className="text-center fw-300 pt-2 mb-5">
              Please enter otp send to your email address.
            </h6>
            <div className="d-flex justify-content-center">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                secure
              />
            </div>
            {/* <h4 className="text-muted mb-2 text-center mt-5 fw-500">
              {IsOtpActive === true
                ? Seconds
                : ""}
            </h4> */}

            <div className="d-flex justify-content-center mt-5">
              <Button
                variant="contained"
                className={StylingClasses.ResendButton}
              >
                Resend OTP
              </Button>
            </div>

            <div className="d-flex justify-content-center mt-1">
              <Button
                variant="contained"
                className={StylingClasses.ContinueButton}
              >
                Continue
              </Button>
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

export default VerifyEmail;
