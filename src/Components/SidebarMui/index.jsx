import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink, Outlet } from "react-router-dom";

// icon
import CachedIcon from "@mui/icons-material/Cached";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import styles from "./styles.module.scss";
import image from "../../assets/logo.png";
import Like from "../Like";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayerBar from "./PlayerBar";
import { Avatar } from "@mui/material";
import Navbar from "../Navbar";

const drawerWidth = 240;

const menuItems = [
  { to: "/home", icon: <HomeIcon />, label: "Home" },
  { to: "/search", icon: <SearchIcon />, label: "Search" },
  {
    to: "/collection/playlists",
    icon: <LibraryMusicIcon />,
    label: "Your Library",
  },
  {
    to: "/add-playList",
    icon: <CreateNewFolderIcon />,
    label: "Create Playlist",
  },
  {
    to: "/add-song",
    icon: <AddIcon />,
    label: "Create New Song",
  },
  {
    to: "/collection/tracks",
    icon: <FavoriteIcon />,
    label: "Liked Songs",
  },
  {
    to: "/wave-surfer",
    icon: <FavoriteIcon />,
    label: "Wave Surfer",
  },
];

const playlists = [
  { _id: "1", label: "Today's Top Songs", icon: <AirlineStopsIcon /> },
  // Add more playlists as needed
];

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

const LogoHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // padding: theme.spacing(0, 1),
  // // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         ...openedMixin(theme),
//         "& .MuiDrawer-paper": openedMixin(theme),
//       },
//     },
//     {
//       props: ({ open }) => !open,
//       style: {
//         ...closedMixin(theme),
//         "& .MuiDrawer-paper": closedMixin(theme),
//       },
//     },
//   ],
// }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  backgroundColor: "var(--black)",
  color: "var(--white)",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          backgroundColor: "var(--black)",
          color: "var(--white)",
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          backgroundColor: "var(--black)",
          color: "var(--white)",
        },
      },
    },
  ],
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Navbar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <LogoHeader>
          <Avatar
            alt="Logo"
            src={image}
            sx={{ width: open ? 150 : 56, height: open ? 150 : 56 }}
          />
        </LogoHeader>
        <Divider
          sx={{
            borderColor: "var(--white)",
            padding: "0 1px",
          }}
        />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item} disablePadding sx={{ display: "block" }}>
              <NavLink
                to={item.to}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                          justifyContent: "initial",
                        }
                      : {
                          justifyContent: "center",
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                        color: "var(--white)",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <Divider
          sx={{
            borderColor: "var(--white)",
            padding: "0 1px",
          }}
        />
        <List>
          {playlists.map((item, index) => (
            <ListItem key={item._id} disablePadding sx={{ display: "block" }}>
              <NavLink
                to={`/playlist/${item._id}`} // Use the actual item._id
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? {
                          justifyContent: "initial",
                        }
                      : {
                          justifyContent: "center",
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                        color: "var(--white)",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
      {/* bottom app bar */}
      <AppBar position="fixed" open={open} sx={{ top: "auto", bottom: 0 }}>
        <Toolbar
          style={{
            backgroundColor: `var(--light-gray)`,
          }}
        >
          <PlayerBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
