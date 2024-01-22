import React, { useState } from "react";
import { Track } from "../../types/Track";
import playButton from "../../assets/play_button.png";

import "./GridCard.css";
import { NoResults } from "../../views/NoResults/NoResults";

interface GridCardProps {
  track: Track;
  onClick: (track: Track) => void;
}

export const GridCard = ({ track, onClick }: GridCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!track.artist) {
    return <NoResults />;
  }

  return (
    <div
      className={`grid-item ${isHovered ? "grid-item-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(track)}
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
      </div>
    </div>
  );
};
