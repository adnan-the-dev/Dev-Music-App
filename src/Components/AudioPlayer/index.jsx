import Like from "../Like";
import { IconButton } from "@mui/material";
import logo from "../../assets/logo.png";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CachedIcon from "@mui/icons-material/Cached";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { getSongsApi } from "../../api/songs/songsApi";
import showToast from "../../utils/toastService";
import { getRandomNumber } from "../Shared/shared";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [volume, setVolume] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const envUrl = import.meta.env.VITE_REACT_SONG_URL;

  const currentSong = songs[currentSongIndex];

  const getAllApiSongs = async () => {
    try {
      setLoading(true);
      const response = await getSongsApi();
      const songsData = response?.data?.data || [];
      if (songsData.length === 0) {
        // throw new Error("No songs available.");
        showToast("No songs available.", "error");
      }
      setSongs(songsData);
      const number = getRandomNumber(songsData?.length || 6);
      setCurrentSongIndex(number);
      setLoading(false);
    } catch (error) {
      showToast(`${response?.data?.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

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
    setRepeat(true);
  };
  const muteSong = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setVolume(audio.muted ? 0 : 1);
    setMuted(!muted);
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
    <div className={styles.audio_player}>
      <div className={styles.left}>
        <div className={styles.imageBox}>
          <img src={`${envUrl}/${currentSong?.image}` || logo} alt="song_img" />
        </div>
        <div className={styles.song_info}>
          <p className={styles.song_name}>{currentSong?.name}</p>
          <p className={styles.song_artist}>{currentSong?.artist}</p>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.audio_controls}>
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
          <IconButton className={styles.reapte} onClick={reapteSong}>
            {repeat ? <RepeatOneIcon /> : <CachedIcon />}
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
          <audio
            ref={audioRef}
            src={currentSong ? `${envUrl}/${currentSong?.filePath}` : undefined}
            onEnded={playNextSong}
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
        </div>
      </div>
      <div className={styles.right}>
        <Like />
      </div>
    </div>
  );
};

export default AudioPlayer;
