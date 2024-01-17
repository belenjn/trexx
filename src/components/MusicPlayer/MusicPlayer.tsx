import React, { useState, useEffect } from "react";
import { Track } from "../../types/Track";
import "./MusicPlayer.css";
import { convertSecondsToMinutes } from "../../utils/convertSecondsToMinutes";

interface Props {
  track: Track;
}

const MusicPlayer = ({ track }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(track.preview));
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleCanPlay = () => {
      setIsPlaying(true);
      audio.play();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [track.preview, audio, setIsPlaying]);

  useEffect(() => {
    audio.src = track.preview;
  }, [track.preview, audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player-container" onClick={togglePlay}>
      <div className="left">
        <img
          src={track.album.cover_small}
          alt="Album Cover"
          className="album-cover"
        />
        <div>
          <p>{track.title}</p>
          <p>{track.artist.name}</p>
        </div>
      </div>

      <div className="center">
        <button>{isPlaying ? "▌▌" : "▶"}</button>
        <div>
          <label>{convertSecondsToMinutes(Math.floor(currentTime))}</label>
          <input type="range" value={progress} max={100} readOnly />
          <label>{convertSecondsToMinutes(track.duration)}</label>
        </div>
      </div>

      <div className="right">
        <input type="range" defaultValue={70} max="100" />
      </div>
    </div>
  );
};

export default MusicPlayer;
