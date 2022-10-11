import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { IoMenu, IoMailOutline, IoNotificationsOutline } from "react-icons/io5";
import Drawer from "../component/Drawer";
import { Avatar, Badge, Menu, MenuItem, Tooltip } from "@mui/material";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#fff",
  color: "#1b1b1b",
  boxShadow:
    "0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 1px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(0 0 0 / 0%)",
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
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          style={{
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              // marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <IoMenu />
          </IconButton>
          <div
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              display: "flex",
              minWidth: open ? "89vw" : "92vw",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Silicon Techlab Pvt Ltd
            </Typography>
            <Box
              sx={{ display: { xs: "none", md: "flex" } }}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: "10vw",
              }}
            >
              <IconButton
                style={{
                  display: open ? "none" : "flex",
                }}
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <IoMailOutline />
                </Badge>
              </IconButton>
              <IconButton
                style={{
                  display: open ? "none" : "flex",
                }}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <IoNotificationsOutline />
                </Badge>
              </IconButton>
              <Tooltip title="Open settings" arrow>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="avatar"
                    src="https://avatars.githubusercontent.com/u/30226045?s=64&v=4"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {["Profile", "My Account", "Settings", "Logout"].map(
                  (setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        if (setting === "Logout")
                          logout()
                            .then(() => dispatch(logOut()))
                            .finally(() => handleCloseUserMenu());
                        else handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        style={{
          backgroundColor: "#fff",
          padding: 12,
        }}
      >
        <DrawerHeader />
        <div
          style={{
            backgroundColor: "#E3F2FD",
            borderRadius: "8px",
            padding: 17,
            minHeight: "90vh",
          }}
        >
          {children}
        </div>
      </Box>
    </Box>
  );
}
