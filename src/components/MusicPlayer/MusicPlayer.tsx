import React, { useState, useEffect } from "react";
import { Track } from "../../types/Track";
import { convertSecondsToMinutes } from "../../utils/convertSecondsToMinutes";
import pauseButton from "../../assets/pause.png";
import volumeButton from "../../assets/volume.png";

import "./MusicPlayer.css";

interface Props {
  track: Track;
}

const MusicPlayer = ({ track }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio(track.preview));
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

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
    const handleVolumeChange = () => {
      setVolume(audio.volume * 100);
    };

    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [audio, setVolume]);

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(parseFloat(e.target.value));
    audio.volume = newVolume;
  };

  return (
    <div className="music-player-container">
      <div className="left">
        <img
          src={track.album.cover_medium}
          alt="Album Cover"
          className="album-cover"
        />
        <div className="text-container">
          <p className="album-title">{track.title}</p>
          <p className="album-subtitle">{track.artist.name}</p>
        </div>
      </div>

      <div className="center">
        <button className="play-pause-button" onClick={togglePlay}>
          {isPlaying ? (
            <img
              alt="pause button"
              src={pauseButton}
              width={12}
              height={15}
              className="pause-icon"
            />
          ) : (
            <h2 className="play-icon">▶</h2>
          )}
        </button>
        <div className="bar-container">
          <label className="duration-text">
            {convertSecondsToMinutes(Math.floor(currentTime))}
          </label>
          <input
            type="range"
            defaultValue={0}
            value={progress}
            max={100}
            readOnly
            className="progress-bar"
            style={{
              background: `linear-gradient(to right, #EF5466 ${progress}%, #0000000D ${progress}%)`,
            }}
          />
          <label className="duration-text">
            {convertSecondsToMinutes(track.duration)}
          </label>
        </div>
      </div>

      <div className="right">
        <img alt="volume button" src={volumeButton} width={24} height={24} />
        <input
          type="range"
          max="100"
          onChange={handleVolumeChange}
          value={volume}
          className="progress-bar-volume"
          style={{
            background: `linear-gradient(to right, #EF5466 ${volume}%, #0000000D ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
