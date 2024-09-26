import { useState } from "react";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";
import { useDispatch } from "react-redux";
import { playSong } from "../../redux/slices/playingSlice";

const Song = ({ song, playlist }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);

  const envUrl = import.meta.env.VITE_REACT_SONG_URL;

  const handlePlay = () => {
    dispatch(playSong(song)); 
  };

  return (
    <div className={styles.song_container}>
      <div className={styles.left}>
        <IconButton className={styles.play_btn} onClick={handlePlay}>
          <PlayArrowIcon />
          {/* {isPlaying ? <PauseIcon /> : <PlayArrowIcon />} */}
        </IconButton>
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
