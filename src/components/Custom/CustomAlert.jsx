import { Alert } from "@mui/material";

function CustomAlert({ msg, severity }) {
  return (
    <Alert
      variant="filled"
      severity={severity}
      style={{
        margin: "1rem 1rem",
        width: "90%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {msg}
    </Alert>
  );
}
export default CustomAlert;
