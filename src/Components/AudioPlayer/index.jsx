import Like from "../Like";
import { IconButton } from "@mui/material";
// import peaches from "../../images/peaches.jpg";
// import peaches from "../../images/peaches.jpg";
import logo from "../../assets/logo.png";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // Set to 240 seconds (4 minutes)

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
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

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  return (
    <div className={styles.audio_player}>
      <div className={styles.left}>
        <img src={logo} alt="song_img" />
        <div className={styles.song_info}>
          <p className={styles.song_name}>sidhu</p>
          <p className={styles.song_artist}>Justin Bieber</p>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.audio_controls}>
          <IconButton className={styles.prev}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton className={styles.play} onClick={togglePlay}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton className={styles.next}>
            <SkipNextIcon />
          </IconButton>
        </div>
        <div className={styles.progress_container}>
          <p>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</p>
          <input
            type="range"
            step="1"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className={styles.progress}
          />
          {/* <p>0.30</p>
          <input
            type="range"
            step="1"
            min="0"
            max={4}
            className={styles.progress}
          /> */}
          {/* <audio controls ref={audioRef} src="/audio/peache.mp3"></audio> */}
          <audio ref={audioRef} src="/audio/peache.mp3"></audio>
          {/* <p>4.00</p> */}
          <p>{new Date(duration * 1000).toISOString().substr(14, 5)}</p>
        </div>
      </div>
      <div className={styles.right}>
        <Like />
      </div>
    </div>
  );
};

export default AudioPlayer;
