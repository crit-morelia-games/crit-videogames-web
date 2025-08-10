import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuthHeader } from "react-auth-kit";
import { Autocomplete, TextField, Typography } from "@mui/material";
import axios from "axios";
import CustomAlert from "../Custom/CustomAlert";
import CustomError from "../Custom/CustomError";
import CustomHeaderDialog from "../Custom/CustomHeaderDialog";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  CircularProgress,
} from "@mui/material";

const ModalUpdateTherapist = ({ open, setOpen, updated, setUpdated, id }) => {
  const [msg, setMsg] = useState("");
  const [openA, setOpenA] = useState(false);
  const [terapeutas, setTerapeutas] = useState([]);
  const [severity, setSeverity] = useState("");
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const authHeader = useAuthHeader();
  const token = authHeader().split(" ")[1];
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      terapeuta: {},
    },
  });

  const onSubmit = (data) => {
    const editPatient = async () => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/paciente/${id}/${
            data.terapeuta.id
          }`,
          {},
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
    if (data.terapeuta.id) {
      editPatient();
      // console.log(token);
      // console.log(data.terapeuta.id);
    } else {
      setMsg("Terapeuta es requerido");
      setSeverity("error");
      setAlert(true);
    }
  };

  useEffect(() => {
    const getTherapists = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/terapeutas`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTerapeutas(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTherapists();
  }, []);

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
          paddingX: 2,
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop
      >
        <Box>
          <CustomHeaderDialog setOpen={setOpen} text="Cambiar Terapeuta" />
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
                <FormControl variant="outlined">
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        onChange={(e, data) => {
                          field.onChange(data);
                          setAlert(false);
                        }}
                        open={openA}
                        sx={{ width: 200 }}
                        onOpen={() => {
                          setOpenA(true);
                        }}
                        onClose={() => {
                          setOpenA(false);
                        }}
                        id="therapist"
                        options={terapeutas}
                        loading={loading}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) =>
                          option.nombre +
                          " " +
                          option.aPaterno +
                          " " +
                          option.aMaterno
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nuevo Terapeuta*"
                            color="warning"
                            variant="standard"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {loading ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    )}
                    name="terapeuta"
                    control={control}
                    rules={{ required: true }}
                  />
                  {errors.terapeuta && (
                    <CustomError msg="Terapeuta es requerido" />
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
                  Cambiar
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

export default ModalUpdateTherapist;
