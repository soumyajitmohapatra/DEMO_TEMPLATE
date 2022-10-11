import React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";

import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  IoChevronForward,
  IoChevronBack,
  IoShapes,
  IoSnow,
  IoMailUnread,
  IoLogOut,
  IoLayers,
} from "react-icons/io5";
import { logOut } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { Tooltip } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  border: "none",
  padding: 10,
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
  [theme.breakpoints.down("sm")]: {
    width: 0,
    display: "none",
  },
  border: "none",
  padding: 10,
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

export default function MiniDrawer({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [logout] = useLogoutMutation();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader
        style={{
          marginBottom: "12px",
          marginTop: "-8px",
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <IoChevronForward /> : <IoChevronBack />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {[
          { title: "Dashboard", path: "/dashboard" },
          { title: "Sample Page", path: "/sample-page" },
        ].map((item, index) => (
          <Tooltip
            title={item.title}
            placement="right-end"
            enterDelay={600}
            leaveDelay={100}
            arrow
            key={index + item.path}
          >
            <Link to={item.path} key={index}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: "8px",
                }}
                selected={pathname === item.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <IoShapes /> : <IoSnow />}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Logout"].map((text, index) => (
          <Tooltip
            title={text}
            placement="right-end"
            enterDelay={500}
            leaveDelay={200}
            arrow
            key={text}
          >
            <ListItemButton
              onClick={() => {
                if (text === "Logout") {
                  logout().then(() => dispatch(logOut()));
                }
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                borderRadius: "8px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <IoMailUnread /> : <IoLogOut />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
