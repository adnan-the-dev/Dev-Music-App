import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import logo from "../../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import CachedIcon from "@mui/icons-material/Cached";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSongsApi } from "../../api/songs/songsApi";
import showToast from "../../utils/toastService";
import { getRandomNumber } from "../Shared/shared";
import { setSongs } from "../../redux/slices/songsSlice";

export default function PlayerBar() {
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
    if (repeat) {
      const audio = audioRef.current;
      audio.play();
      audio.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    }
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
    setRepeat(!repeat);
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
    <>
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
        {/* <Box className={styles.audio_controls}>
          <IconButton className={styles.mute} onClick={muteSong}>
            {muted ? (
              <VolumeOffIcon sx={{ color: `var(--white)` }} />
            ) : (
              <VolumeUpIcon />
            )}
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
            {repeat ? (
              <RepeatOneIcon sx={{ color: `var(--white)` }} />
            ) : (
              <CachedIcon />
            )}
          </IconButton>
        </Box> */}
        <Box className={styles.progress_container}>
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
        <Box className={styles.audio_controls}>
          <IconButton className={styles.mute} onClick={muteSong}>
            {muted ? (
              <VolumeOffIcon sx={{ color: `var(--white)` }} />
            ) : (
              <VolumeUpIcon />
            )}
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
            {repeat ? (
              <RepeatOneIcon sx={{ color: `var(--white)` }} />
            ) : (
              <CachedIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      {/* <Box className={styles.right}>
            <Like songId={currentSong._id} />
          </Box> */}
    </>
  );
}
