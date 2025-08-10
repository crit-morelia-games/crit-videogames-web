import {
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Close } from "@mui/icons-material";
import { useAuthHeader } from "react-auth-kit";
import { useForm } from "react-hook-form";
import axios from "axios";
import CustomAlert from "../Custom/CustomAlert";
import CustomError from "../Custom/CustomError";
import CustomHeaderDialog from "../Custom/CustomHeaderDialog";
//   import { Dates } from "../../utils/dataNormalized";

const ModalEditTherapist = ({ open, setOpen, row, updated, setUpdated }) => {
  const authHeader = useAuthHeader();
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const [alert, setAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const token = authHeader().split(" ")[1];
    const editTherapist = async () => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/terapeuta/${row.id}`,
          data,
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
        setUpdated(!updated);
      } catch (error) {
        setMsg(error.response.data.msg || "Error desconocido");
        setSeverity("error");
        setAlert(true);
      }
    };

    editTherapist();
    console.log(data);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
          <CustomHeaderDialog setOpen={setOpen} text="Editar Terapeuta" />
          {alert && <CustomAlert msg={msg} severity={severity} />}
          <Box sx={{ marginTop: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                style={{
                  display: "flex",
                  gap: 50,
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="standard">
                  <InputLabel htmlFor="name" color="warning">
                    Nombre*
                  </InputLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    defaultValue={row.nombre}
                    {...register("nombre", { required: true })}
                  />
                  {errors.nombre && (
                    <CustomError text="*Este campo es obligatorio" />
                  )}
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="lastnameP" color="warning">
                    Apellido Paterno*
                  </InputLabel>
                  <Input
                    id="lastnameP"
                    placeholder="Apellido Paterno"
                    sx={{ mt: 2 }}
                    defaultValue={row.aPaterno}
                    {...register("aPaterno", { required: true })}
                  />
                  {errors.aPaterno && (
                    <CustomError text="*Este campo es obligatorio" />
                  )}
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="lastnameM" color="warning">
                    Apellido Materno
                  </InputLabel>
                  <Input
                    id="lastnameM"
                    placeholder="Apellido Materno"
                    defaultValue={row.aMaterno}
                    sx={{ mt: 2 }}
                    {...register("aMaterno")}
                  />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="telefono" color="warning">
                    Teléfono*
                  </InputLabel>
                  <Input
                    id="telefono"
                    defaultValue={row.telefono}
                    {...register("telefono", {
                      required: true,
                    })}
                    sx={{ width: 200, mt: 2 }}
                  />
                  {errors.telefono && (
                    <CustomError text="*Este campo es obligatorio" />
                  )}
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="email" color="warning">
                    Correo Electrónico*
                  </InputLabel>
                  <Input
                    id="email"
                    defaultValue={row.email}
                    {...register("email", {
                      required: true,
                    })}
                    sx={{ width: 200, mt: 2 }}
                  />
                  {errors.email && (
                    <CustomError text="*Este campo es obligatorio" />
                  )}
                </FormControl>
              </div>
              <Typography
                sx={{
                  mt: 2,
                  fontSize: "12px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                * Campos Obligatorios
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  type="submit"
                >
                  Confirmar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    mt: 2,
                  }}
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ModalEditTherapist;
