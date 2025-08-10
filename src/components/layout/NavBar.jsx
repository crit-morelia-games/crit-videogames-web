import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "../../hooks/useAppContext";
import { CssBaseline, Icon, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {
  WbSunnyOutlined,
  DarkModeOutlined,
  AccountCircle,
} from "@mui/icons-material";
import { useSignOut } from "react-auth-kit";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function NavBar() {
  const { open, toggleSideNav, theme, toggleTheme } = useThemeContext();
  const signOut = useSignOut();

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: theme.primary,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSideNav}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon color="white" />
          </IconButton>
          <IconButton
            aria-label="change theme"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "auto",
            }}
            onClick={signOut}
          >
            <Icon sx={{ color: "white", fontSize: 25 }}>
              <AccountCircle />
            </Icon>
            <Typography
              sx={{
                fontSize: "h7.fontSize",
                marginLeft: 1,
                color: "white",
              }}
            >
              Cerrar Sesión
            </Typography>
          </IconButton>
          {/* <IconButton
            aria-label="change theme"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginLeft: "auto",
            }}
            onClick={toggleTheme}
          >
            <Icon sx={{ color: "white", fontSize: 30 }}>
              {theme.mode === "dark" ? (
                <WbSunnyOutlined />
              ) : (
                <DarkModeOutlined />
              )}
            </Icon>
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
