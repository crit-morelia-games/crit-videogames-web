import {
  Box,
  Button,
  Dialog,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useForm } from "react-hook-form";
import axios from "axios";
import CustomAlert from "../Custom/CustomAlert";
import CustomError from "../Custom/CustomError";
import { Dates } from "../../utils/dataNormalized";
import CustomHeaderDialog from "../Custom/CustomHeaderDialog";

const ModalPatient = ({ open, setOpen, row, updated, setUpdated }) => {
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
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
    const editPatient = async () => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/paciente/${row.id}`,
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
        setMsg(error.response.data.msg);
        setSeverity("error");
        console.log(error);
      }
    };
    editPatient();
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
          <CustomHeaderDialog text="Editar Paciente" setOpen={setOpen} />
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
                  <InputLabel htmlFor="birthDate" color="warning">
                    Fecha de Nacimiento*
                  </InputLabel>
                  <Input
                    id="birthDate"
                    type="date"
                    defaultValue={Dates(row.fechaNacimiento)}
                    {...register("fechaNacimiento", {
                      required: true,
                    })}
                    sx={{ width: 200, mt: 2 }}
                  />
                  {errors.fechaNacimiento && (
                    <CustomError text="*Este campo es obligatorio" />
                  )}
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="diagnostic" color="warning">
                    Diagnóstico*
                  </InputLabel>
                  <Input
                    id="diagnostic"
                    placeholder="Diagnóstico"
                    defaultValue={row.diagnostico}
                    sx={{ mt: 2 }}
                    {...register("diagnostico", {
                      required: true,
                    })}
                  />
                  {errors.diagnostico && (
                    <CustomError text="*Este campo es obligatorio" />
                  )}
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="gender" color="warning">
                    Genero*
                  </InputLabel>
                  <Select
                    id="gender"
                    defaultValue={row.sexo}
                    sx={{ mt: 2, width: 200 }}
                    {...register("sexo", {
                      required: true,
                    })}
                  >
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Femenino</MenuItem>
                  </Select>
                  {errors.sexo && (
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

export default ModalPatient;
