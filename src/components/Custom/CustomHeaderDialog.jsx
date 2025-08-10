import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const CustomHeaderDialog = ({ text, setOpen }) => {
  return (
    <Box
      id="modal-modal-title"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: { xs: 2, md: 3 },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "h7.fontSize",
            md: "h5.fontSize",
          },
          fontWeight: "bold",
        }}
      >
        {text}
      </Typography>
      <IconButton onClick={() => setOpen(false)}>
        <Close />
      </IconButton>
    </Box>
  );
};

export default CustomHeaderDialog;
