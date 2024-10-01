import { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "../../assets/logo.png";
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
import CachedIcon from "@mui/icons-material/Cached";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import MailIcon from "@mui/icons-material/Mail";
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
import { Avatar } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getSongsApi } from "../../api/songs/songsApi";
import showToast from "../../utils/toastService";
import { getRandomNumber } from "../Shared/shared";
import { setSongs } from "../../redux/slices/songsSlice";
// import styles from "./styles.module.scss";

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
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "flex-end",
  // padding: theme.spacing(0, 1),
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
];

const playlists = [
  { _id: "1", label: "Today's Top Songs", icon: <AirlineStopsIcon /> },
  // Add more playlists as needed
];

export default function SidebarMui() {
  const theme = useTheme();
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [volume, setVolume] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState("");
  // const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const envUrl = import.meta.env.VITE_REACT_SONG_URL;

  const useSelectorData = useSelector((state) => state.playing.currentSong);

  const songs = useSelector((state) => state.songs.songs);

  // const currentSong = songs[currentSongIndex];

  const getAllApiSongs = async () => {
    try {
      setLoading(true);
      const response = await getSongsApi();
      const songsData = response?.data?.data || [];
      if (songsData.length === 0) {
        showToast("No songs available.", "error");
      }
      // setSongs(songsData);
      dispatch(setSongs(songsData));
      const number = getRandomNumber(songsData?.length || 6);
      setCurrentSongIndex(number);
      setLoading(false);
    } catch (error) {
      showToast(`${response?.data?.message}`, "error");
    } finally {
      setLoading(false);
    }
  };
  const currentSong = songs[currentSongIndex] || useSelectorData;

  useEffect(() => {
    if (useSelectorData) {
      const songIndex = songs.findIndex(
        (song) => song._id === useSelectorData._id
      );
      if (songIndex !== -1) {
        setCurrentSongIndex(songIndex);
        setPlay(true);
      }
    }
  }, [useSelectorData, songs]);

  // set play functions
  const setPlay = (play) => {
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(play);
  };

  const togglePlay = () => {
    setPlay(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };
  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setCurrentTime(0);
    setRepeat(false);
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.src = songs[nextIndex].filePath;
      audioElement.load();
      audioElement.oncanplay = () => {
        audioElement
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Error playing audio:", error));
      };
    }
  };

  const playPrevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setCurrentTime(0);
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.src = songs[prevIndex].filePath;
      audioElement.load();
      audioElement.oncanplay = () => {
        audioElement
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Error playing audio:", error));
      };
    }
  };
  const reapteSong = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(true);
    setRepeat(!repeat);
  };
  const muteSong = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setVolume(audio.muted ? 0 : 1);
    setMuted(!muted);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    getAllApiSongs();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
          <Navbar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
      >
        <DrawerHeader>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: theme.spacing(1),
              // necessary for content to be below app bar
              ...theme.mixins.toolbar,
            }}
          >
            <IconButton
              style={{
                color: "var(--white)",
              }}
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Avatar
              alt="Logo"
              src={image}
              sx={{ width: open ? 150 : 56, height: open ? 150 : 56 }}
            />
          </div>
        </DrawerHeader>
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

        {/* Playlist Section */}

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
        <DrawerHeader />
        <Outlet />
      </Box>
      {/* bottom app bar */}

      <AppBar position="fixed" open={open} sx={{ top: "auto", bottom: 0 }}>
        <Toolbar className={styles.audio_player}>
          <Box className={styles.left}>
            <Box className={styles.imageBox}>
              <img
                src={currentSong ? `${envUrl}/${currentSong?.image}` : logo}
                alt="song_img"
              />
            </Box>
            <Box className={styles.song_info}>
              <p className={styles.song_name}>{currentSong?.name}</p>
              <p className={styles.song_artist}>{currentSong?.artist}</p>
            </Box>
          </Box>
          <Box className={styles.center}>
            <Box className={styles.audio_controls}>
              <IconButton className={styles.mute} onClick={muteSong}>
                {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
              <IconButton className={styles.prev} onClick={playPrevSong}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton className={styles.play} onClick={togglePlay}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton className={styles.next} onClick={playNextSong}>
                <SkipNextIcon />
              </IconButton>
              <IconButton className={styles.repeatIcon} onClick={reapteSong}>
                {repeat ? <RepeatOneIcon /> : <CachedIcon />}
              </IconButton>
            </Box>
            <Box className={styles.progress_container}>
              <p>
                {new Date(currentTime * 1000).toISOString().substring(14, 19)}
              </p>
              <input
                type="range"
                step="1"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressChange}
                className={styles.progress}
              />
              <audio
                ref={audioRef}
                src={
                  currentSong ? `${envUrl}/${currentSong?.filePath}` : undefined
                }
                onEnded={playNextSong}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                muted={muted}
                autoPlay={isPlaying}
              />
              <p>{new Date(duration * 1000).toISOString().substring(14, 19)}</p>
              <input
                type="range"
                step="0.01"
                min="0"
                max="1"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volume}
              />
            </Box>
          </Box>
          {/* <Box className={styles.right}>
            <Like songId={currentSong._id} />
          </Box> */}
        </Toolbar>
      </AppBar>
    </>
  );
}
