import { Fragment } from "react";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckOut = ({ activeSteps }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeSteps} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeSteps === index ? true : false}
            completed={activeSteps >= index ? true : false}
          >
            <StepLabel
              style={{ color: activeSteps >= index ? "greenyellow" :"black" }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckOut;
