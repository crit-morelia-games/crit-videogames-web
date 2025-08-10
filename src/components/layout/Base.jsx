import React from "react";
import { Box } from "@mui/material";
import SideNav from "./SideNav";
import NavBar from "./NavBar";
import routes from "../../routes";
import { Routes, Route, Navigate } from "react-router-dom";
import { useThemeContext } from "../../hooks/useAppContext";
import { Filters } from "../../utils/filters";
import { useAuthUser } from "react-auth-kit";

function Base() {
  const { theme } = useThemeContext();
  const user = useAuthUser();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 2,
          paddingLeft: 2,
          paddingTop: 8,
          width: "100%",
          backgroundColor: theme.back,
        }}
      >
        <NavBar />
        <Routes>
          {routes.map(({ pages }) =>
            pages.map(({ path, component, rol }) =>
              rol === Filters.ROLE_ALL || rol === user().role ? (
                <Route exact path={path} element={component} />
              ) : (
                <Route
                  path="*"
                  element={<Navigate to="/dashboard/home" replace />}
                />
              )
            )
          )}
        </Routes>
      </Box>
    </Box>
  );
}

export default Base;
