import {
  Card,
  Box,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Input,
  Button,
  CardMedia,
  Typography,
} from "@mui/material";
import HomeImage from "../../assets/Home.svg";
import Logo from "../../assets/Logo.svg";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import CustomAlert from "../../components/Custom/CustomAlert";

export function SignIn() {
  const { register, handleSubmit } = useForm();
  const [errorC, setErrorC] = useState(false);
  const [errorP, setErrorP] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard/home");
    }
  }, []);

  const onSubmit = (data) => {
    if (data.email === "") {
      setErrorC(true);
      return;
    }
    if (data.password === "") {
      setErrorP(true);
      return;
    }

    const login = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/login`,
          data
        );
        signIn({
          token: res.data.data,
          expiresIn: 7200,
          tokenType: "Bearer",
          authState: { user: data.email, role: res.data.role },
        });
        navigate("/dashboard/home");
      } catch (error) {
        setLoginError("Credenciales invalidas");
        console.log(error.response.data.msg);
      }
    };
    login();
  };

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        minHeight: "100vh",
        backgroundImage: `url(${HomeImage})`,
        backgroundSize: "cover",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { sm: "0%", md: "50%" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            backgroundColor: "transparent",
            boxShadow: 0,
            width: "60%",
            display: { xs: "none", md: "block" },
          }}
        >
          <CardMedia component="img" image={Logo} about="Logo" />
        </Card>
      </Box>
      <Box
        sx={{
          width: { sm: "100%", md: "50%" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            boxShadow: 3,
            backgroundColor: "#FFFBE3",
            borderRadius: 5,
            width: "80%",
          }}
        >
          <CardHeader
            title="¡Bienvenido de nuevo!"
            subheader="Ingrese sus datos para iniciar sesión"
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              alignItems: "flex-start",
              p: { xs: 2, md: 3 },
            }}
          />
          <CardContent>
            <Box>
              {loginError ? (
                <CustomAlert msg={loginError} severity={"error"} />
              ) : null}
              <form
                style={{
                  gap: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormControl variant="standard">
                  <InputLabel htmlFor="email" color="warning">
                    Correo Electrónico*
                  </InputLabel>
                  <Input
                    id="email"
                    type="email"
                    color="warning"
                    placeholder="ejemplo@ejemplo.com"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    error={errorC}
                  />
                </FormControl>
                <FormControl variant="standard">
                  <InputLabel htmlFor="password" color="warning">
                    Contraseña*
                  </InputLabel>
                  <Input
                    id="password"
                    type="password"
                    color="warning"
                    {...register("password", { required: true })}
                    error={errorP}
                    autoComplete="off"
                  />
                </FormControl>
                <Typography variant="caption" color="text.secondary">
                  * Campos obligatorios
                </Typography>
                <Button variant="text" color="warning" type="submit">
                  Iniciar Sesión
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default SignIn;
