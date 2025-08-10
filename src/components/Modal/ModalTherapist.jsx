import {
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";
import { useAuthHeader } from "react-auth-kit";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import CustomAlert from "../Custom/CustomAlert";
import CustomError from "../Custom/CustomError";
import CustomHeaderDialog from "../Custom/CustomHeaderDialog";

const ModalTherapist = ({ open, setOpen }) => {
  const authHeader = useAuthHeader();
  let msg = "Las contraseñas no coinciden";
  let severity = "error";
  const [error, setError] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const token = authHeader().split(" ")[1];
    const { nombre, aPaterno, aMaterno, email, telefono, password } = data;
    const newData = {
      nombre,
      aPaterno,
      aMaterno,
      email,
      telefono,
      password,
    };
    const addTherapist = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/terapeuta`,
          newData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (data.password !== data.passwordC) {
      msg = "Las contraseñas no coinciden";
      severity = "error";
      setError(true);
    } else {
      addTherapist();
    }
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
          <CustomHeaderDialog setOpen={setOpen} text="Agregar Terapeuta" />
          {error && <CustomAlert msg={msg} severity={severity} />}
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
                    sx={{ mt: 2 }}
                    {...register("aMaterno")}
                  />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="email" color="warning">
                    Correo Electrónico*
                  </InputLabel>
                  <Input
                    id="email"
                    placeholder="ejemplo@ejemplo.com"
                    sx={{ mt: 2 }}
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {errors.email?.type === "required" ? (
                    <CustomError text="*Este campo es obligatorio" />
                  ) : errors.email?.type === "pattern" ? (
                    <CustomError text="*Correo inválido" />
                  ) : null}
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="phone" color="warning">
                    Teléfono*
                  </InputLabel>
                  <Input
                    id="phone"
                    type="number"
                    placeholder="4433443344"
                    sx={{ mt: 2 }}
                    {...register("telefono", { required: true, maxLength: 10 })}
                  />
                  {errors.telefono?.type === "required" ? (
                    <CustomError text="*Este campo es obligatorio" />
                  ) : errors.telefono?.type === "maxLength" ? (
                    <CustomError text="*Máximo 10 caracteres" />
                  ) : null}
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="password" color="warning">
                    Contraseña*
                  </InputLabel>
                  <Input
                    id="password"
                    placeholder="Contraseña"
                    sx={{ mt: 2 }}
                    type="password"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/,
                    })}
                  />
                  {errors.password?.type === "required" ? (
                    <CustomError text="*Este campo es obligatorio" />
                  ) : errors.password?.type === "pattern" ? (
                    <CustomError text="*Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial" />
                  ) : null}
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="passwordC" color="warning">
                    Confirmar Contraseña*
                  </InputLabel>
                  <Input
                    id="passwordC"
                    placeholder="Confirmar Contraseña"
                    sx={{ mt: 2 }}
                    type="password"
                    {...register("passwordC", {
                      required: true,
                    })}
                  />
                  {errors.passwordC?.type === "required" ? (
                    <CustomError text="*Este campo es obligatorio" />
                  ) : null}
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
                  Agregar
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

export default ModalTherapist;
