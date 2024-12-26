import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { useState } from "react";
import BillingAddressForm from "./BillingAddressForm";
import ShippingMethodForm from "./ShippingMethodForm";
import { ImLocation } from "react-icons/im";
import { FaShippingFast } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { AiFillFileText } from "react-icons/ai";
import PaymentMethodForm from "./PaymentMethodForm";
import ReviewOrder from "./ReviewOrder";

// Styling
const CustomStyle = makeStyles({
  root: {
    width: "100%",
    "& .MuiStepLabel": {
      color: "#8B8B8B",
    },

    "& .MuiStepLabel-active": {
      color: "#398E8B",
      fontWeight: "bold",
    },

    "& .MuiStepLabel-completed": {
      color: "#398E8B",
      fontWeight: "bold",
    },

    "& .MuiStepLabel-iconContainer.MuiStepLabel-alternativeLabel": {
      height: "40px",
      width: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      backgroundColor: "#8B8B8B",
      fontSize: "20px",
      color: "#fff",
    },

    "& .MuiStep-completed .MuiStepLabel-iconContainer.MuiStepLabel-alternativeLabel":
      {
        backgroundColor: "#398E8B",
      },

    " & .MuiStepConnector-alternativeLabel.Mui-disabled": {
      top: "20px",
    },

    "& .MuiStepConnector-active": {
      top: "20px",
      backgroundColor: "#398E8B",
      height: "2px",
    },

    "& .MuiStepConnector-completed": {
      top: "20px",
      backgroundColor: "#398E8B",
      height: "2px",
    },
  },
});

const MultiStepForm = () => {
  const [ActiveStep, setActiveStep] = useState(0);

  // GetStep
  function GetStep() {
    return [
      "Billing Address",
      // "Shipping Method",
      "Payment Method",
      "Review Order",
    ];
  }
  const GetSteps = GetStep();

  // GetCurrencySymbol
  const GetCurrencySymbol = JSON.parse(localStorage.getItem('general_set'))

  const currency_id = GetCurrencySymbol.currency_id;
  const currency_symbol = GetCurrencySymbol.currency_symbol;

  const HandleBillingAddress = () => {
    setActiveStep((PreviousActiveStep) => PreviousActiveStep - 2);
  };

  const HandleNext = () => {
    setActiveStep((PreviousActiveStep) => PreviousActiveStep + 1);
  };

  const HandleBack = () => {
    setActiveStep((PreviousActiveStep) => PreviousActiveStep - 1);
  };

  const GetStepsContent = (StepsIndex) => {
    switch (StepsIndex) {
      case 0:
        return (
          <BillingAddressForm
            ActiveStep={ActiveStep}
            GetSteps={GetSteps}
            HandleNext={HandleNext}
          />
        );

      // case 1:
      //   return (
      //     <ShippingMethodForm
      //       ActiveStep={ActiveStep}
      //       GetSteps={GetSteps}
      //       HandleNext={HandleNext}
      //       HandleBack={HandleBack}
      //     />
      //   );

      case 1:
        return (
          <PaymentMethodForm
            ActiveStep={ActiveStep}
            GetSteps={GetSteps}
            HandleNext={HandleNext}
            HandleBack={HandleBack}
            currency_symbol={currency_symbol}
          />
        );

      case 2:
        return (
          <ReviewOrder
            ActiveStep={ActiveStep}
            GetSteps={GetSteps}
            HandleNext={HandleNext}
            HandleBack={HandleBack}
            HandleBillingAddress={HandleBillingAddress}
            currency_id={currency_id}
            currency_symbol={currency_symbol}
          />
        );

      default:
        return;
    }
  };

  //   StylingClasses
  const StylingClasses = CustomStyle();

  const CustomStepIcon = (props) => {
    const { active, completed } = props;

    const StepIcons = {
      1: <ImLocation />,
      // 2: <FaShippingFast />,
      2: <BiDollar />,
      3: <AiFillFileText />,
    };

    return <>{StepIcons[String(props.icon)]}</>;
  };

  return (
    <div>
      <Stepper
        className={StylingClasses.root}
        activeStep={ActiveStep}
        alternativeLabel
      >
        {GetSteps.map((Label) => (
          <Step key={Label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{Label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <>{GetStepsContent(ActiveStep)}</>
    </div>
  );
};

export default MultiStepForm;
