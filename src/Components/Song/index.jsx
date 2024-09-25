import { useState } from "react";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";

const Song = ({ song, playlist }) => {
  const [menu, setMenu] = useState(false);

  const envUrl = import.meta.env.VITE_REACT_SONG_URL;

  return (
    <div className={styles.song_container}>
      <div className={styles.left}>
        <IconButton className={styles.play_btn}>
          <PlayArrowIcon />
        </IconButton>
        {/* <img src={song?.image} alt="song_img" /> */}
        <img
          src={song ? `${envUrl}/${song?.image}` : undefined}
          alt="song_img"
        />
        <p>{song?.name}</p>
      </div>
      <div className={styles.center}>
        <p>{song?.artist}</p>
      </div>
      <div className={styles.right}>
        <Like songId={song._id} />
        {/* <Like /> */}
        <p>4.30</p>
        <IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
          <MoreHorizIcon />
        </IconButton>
        {menu && <PlaylistMenu song={song} closeMenu={() => setMenu(false)} />}
      </div>
    </div>
  );
};

export default Song;
