import React from "react";
import { Dialog, Box, Typography, IconButton, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import CustomAlert from "../Custom/CustomAlert";
import CustomHeaderDialog from "../Custom/CustomHeaderDialog";

const ModalDelete = ({ open, setOpen, id, updated, setUpdated, name }) => {
  const authHeader = useAuthHeader();
  const token = authHeader().split(" ")[1];
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const handleAction = () => {
    const deletePatient = async () => {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/paciente/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMsg(res.data.msg);
        setSeverity("success");
        setAlert(true);
        setTimeout(() => {
          setUpdated(!updated);
        }, 1000);
      } catch (error) {
        setMsg(error.response.data.msg);
        setSeverity("error");
        setAlert(true);
        console.log(error);
      }
    };
    deletePatient();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "130%",
            sm: "70%",
            md: "50%",
            lg: "50%",
            xl: "50%",
          },
          height: "100%",
          p: 4,
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop
      >
        <Box>
          <CustomHeaderDialog setOpen={setOpen} text="Eliminar Paciente" />
          {alert && <CustomAlert msg={msg} severity={severity} />}
          <Box
            sx={{
              paddingX: 5,
              paddingY: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "h6.fontSize",
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "h6.fontSize",
              }}
            >
              ¿Está seguro que desea eliminar este paciente?
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => handleAction()}
              >
                Eliminar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default ModalDelete;
