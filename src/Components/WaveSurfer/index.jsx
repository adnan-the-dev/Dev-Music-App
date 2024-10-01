import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#ccc",
  progressColor: "#0178ff",
  cursorColor: "transparent",
  response: true,
  height: 80,
  normalize: true,
  backend: "WebAudio",
  barWidth: 2,
  barGap: 3,
});

// helper functions
const formatTime = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
};
export default function WaveSurferPage({ audioFile }) {
  const waveFormRef = useRef(null);
  const waveSurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileName, setAudioFileName] = useState("");

  // initialize waveSurfer and set up event listeners

  useEffect(() => {
    // create waveSurfer instance with options
    const option = formWaveSurferOptions(waveSurfer.current);
    waveSurfer.current = WaveSurfer.create(option);
    waveSurfer.current.load(audioFile);
    waveSurfer.current.on("ready", () => {
      setVolume(waveSurfer.current.getVolume());
      setDuration(waveSurfer.current.getDuration());
      setAudioFileName(audioFile.split("/").pop());
    });
    waveSurfer.current.on("audioprocess", () => {
      setCurrentTime(waveSurfer.current.getCurrentTime());
    });
    return () => {
      waveSurfer.current.un("audioprocess");
      waveSurfer.current.un("ready");
      waveSurfer.current.destroy();
    };
  }, [audioFile]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    waveSurfer.current.playPause();
  };

  const hadleVolumeChange = (volume) => {
    setVolume(volume);
    waveSurfer.current.setVolume(volume);
    setMuted(volume === 0);
  };

  const handleMute = () => {
    setMuted(!muted);
    waveSurfer.current.setVolume(muted ? volume : 0);
  };
  return (
    <div id="waveform" ref={waveFormRef} style={{ width: "100%" }}>
      <div className="controls">
        <Button onClick={handlePlayPause}>
          {isPlaying ? "paused" : "playing"}
        </Button>
        {/* mute button */}
        <button onClick={handleMute}>{muted ? "unmute" : "mute"}</button>
        {/* volume slider */}
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.05"
          value={muted ? 0 : volume}
          onChange={(e) => hadleVolumeChange(parseFloat(e.target.value))}
        />
      </div>

      <div>
        {/* audioFile name */}
        <span>
          Playing: {audioFileName} <br />
        </span>
        <span>
          Duration: {formatTime(duration)} | Current Time:{" "}
          {formatTime(currentTime)} <br />
        </span>
        <span>volume: {Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
}
