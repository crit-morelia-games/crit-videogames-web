import React from "react";
import { Typography } from "@mui/material";

const CustomError = ({ text }) => {
  return (
    <Typography
      sx={{
        fontSize: "12px",
        color: "red",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {text}
    </Typography>
  );
};

export default CustomError;
