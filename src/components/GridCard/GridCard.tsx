import React, { useState } from "react";
import "./GridCard.css";
import { Track } from "../../types/Track";
import playButton from "../../assets/play_button.png";

interface GridCardProps {
  track: Track;
  onClick: (track: Track) => void;
}

export const GridCard = ({ track, onClick }: GridCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`grid-item ${isHovered ? "grid-item-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: `url(${track.album.cover_xl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`overlay ${isHovered ? "overlay-hovered" : "overlay"}`}>
        {isHovered && (
          <img alt="play button" src={playButton} className="play-button" />
        )}
        <h2 className="title-style">{track.title}</h2>
        <h4 className="font-style">{track.artist.name}</h4>
        <h4 className="font-style">{track.album.title}</h4>

        {/* <button onClick={() => onClick(track)}>Play 30s Sample</button> */}
      </div>
    </div>
  );
};
