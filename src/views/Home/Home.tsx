import { useEffect, useState } from "react";
import "./Home.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataContext";
import { Track } from "../../types/Track";
import { GridCard } from "../../components/GridCard/GridCard";
import { NoResults } from "../NoResults/NoResults";
import { strings } from "../../utils/strings";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";

//TODO: tests

export const Home = () => {
  const { state } = useData();
  const tracks = state.data?.data.filter((artist) => artist.type === "track");

  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [track, setTrack] = useState<Track | null>(null);

  const handleTrackClick = (track: Track) => {
    setIsMusicPlayerOpen(true);
    setTrack(track);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="home-container">
        <label className="home-search-label">
          {`${strings.home.search}`}
          <b>{state.data?.data[1].artist.name}</b>
        </label>
        <div className={tracks ? "grid-container" : ""}>
          {tracks ? (
            tracks.map((track, index) => (
              <GridCard key={index} track={track} onClick={handleTrackClick} />
            ))
          ) : (
            <NoResults />
          )}
        </div>
      </div>
      {track && isMusicPlayerOpen && <MusicPlayer track={track} />}
    </div>
  );
};
