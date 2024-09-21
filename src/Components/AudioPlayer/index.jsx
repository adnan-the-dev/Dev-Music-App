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
import axios from "axios";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [volume, setVolume] = useState(1); // Set to 240 seconds (4 minutes)
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentSong = songs[currentSongIndex];
  // const envUrl = import.meta.env.VITE_REACT_SONG_URL;
  const envUrl = "http://localhost:3300";
  console.log(`${envUrl}/${currentSong?.filePath}`, "currentSong");
  // console.log(envUrl, "envUrl");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3300/api/songs/song"
        );
        setSongs(response?.data?.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

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
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume; // Set the audio element's volume
    setVolume(newVolume); // Update volume state
  };
  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setCurrentTime(0);
    audioRef.current.src = songs[nextIndex].filePath;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const playPrevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setCurrentTime(0);
    audioRef.current.src = songs[prevIndex].filePath;
    audioRef.current.play();
    setIsPlaying(true);
  };
  return (
    <div className={styles.audio_player}>
      <div className={styles.left}>
        <img src={logo} alt="song_img" />
        <div className={styles.song_info}>
          <p className={styles.song_name}>{currentSong?.name}</p>
          <p className={styles.song_artist}>{currentSong?.artist}</p>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.audio_controls}>
          <IconButton className={styles.prev} onClick={playPrevSong}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton className={styles.play} onClick={togglePlay}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton className={styles.next} onClick={playNextSong}>
            <SkipNextIcon />
          </IconButton>
        </div>
        <div className={styles.progress_container}>
          <p>{new Date(currentTime * 1000).toISOString().substring(14, 19)}</p>
          <input
            type="range"
            step="1"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className={styles.progress}
          />

          <audio ref={audioRef} src="/audio/peache.mp3" />
          {/* <audio ref={audioRef} src={`http://localhost:3300/${songs[currentSongIndex].filePath}`} /> */}

          {/* <audio
            ref={audioRef}
            // src={currentSong?.filePath}
            // src={`http://localhost:3300/api/${currentSong.filePath}`}
            // localhost:3300/public/temp/song.mp4
            // http://localhost:3300
            // src={
            //   currentSong
            //     ? `${envUrl}/public/temp/${currentSong.filePath}`
            //     : undefined
            // }
            src={`${envUrl}/${currentSong?.filePath}`}
            onEnded={playNextSong}
          ></audio> */}

          <p>{new Date(duration * 1000).toISOString().substring(14, 19)}</p>
          <input
            type="range"
            step="0.01"
            min="0"
            max="1"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.volume} // Add a new class for volume styling
          />
        </div>
      </div>
      <div className={styles.right}>
        <Like />
      </div>
    </div>
  );
};

export default AudioPlayer;
