import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useThemeContext } from "../../hooks/useAppContext";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { LogoBlanco } from "../../assets";
import { Typography } from "@mui/material";
import { Filters } from "../../utils/filters";
import { useAuthUser, useSignOut } from "react-auth-kit";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNav() {
  const { open, toggleSideNav, theme } = useThemeContext();
  const signOut = useSignOut();
  const user = useAuthUser();

  return (
    <Box sx={{ display: "flex", backgroundColor: theme.back }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        sx={{ backgroundColor: theme.back }}
      >
        <DrawerHeader
          sx={{
            backgroundColor: theme.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={LogoBlanco} alt="Logo" style={{ width: 35, height: 35 }} />
          <Typography
            sx={{
              color: "white",
              fontSize: "20px",
              fontFamily: "unset",
            }}
          >
            RehabilyTec
          </Typography>
          <IconButton onClick={toggleSideNav}>
            <ChevronLeftIcon sx={{ color: "white" }} />
          </IconButton>
        </DrawerHeader>
        <List>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, name, icon, rol }) =>
                rol === Filters.ROLE_ALL || rol === user().role ? (
                  <ListItem key={name} disablePadding sx={{ display: "block" }}>
                    <NavLink
                      to={`/${layout}${path}`}
                      style={{ textDecoration: "None", color: "inherit" }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={name}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                ) : null
              )
          )}
        </List>
        <Divider />
        <List>
          <ListItem
            key="Cerrar sesión"
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => signOut()}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Cerrar sesión"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
