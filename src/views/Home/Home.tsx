import { useState } from "react";
import "./Home.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { useData } from "../../context/DataContext";
import { Track } from "../../types/Track";
import { GridCard } from "../../components/GridCard/GridCard";
import { NoResults } from "../NoResults/NoResults";
import { strings } from "../../utils/strings";

//TODO: Al hacer click en cualquiera de las canciones, abriremos una capa con el reproductor y reproduciremos la muestra de 30 segundos que nos devuelva la petición con los controles que se muestren en el diseño. Al pinchar en otra canción, la información del reproductor deberá cambiar.
//TODO: tests

export const Home = () => {
  const { state } = useData();
  const tracks = state.data?.data.filter((artist) => artist.type === "track");

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleTrackClick = (track: Track) => {
    setSelectedTrack(track);
    // Lógica para abrir la capa del reproductor y reproducir la muestra de 30 segundos
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
    </div>
  );
};
