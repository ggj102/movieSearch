import React, { useState } from "react";
import "../../css/Main.css";

import MovieList from "./MovieList";

export default function MainPage() {
  const [movieData, setMovieData] = useState([{}]);
  const { backdrop_path, title, overview } = movieData[0];

  return (
    <div className="main">
      <div
        className="mainBackDrop"
        style={{
          backgroundImage: `url(http://image.tmdb.org/t/p/w1280${backdrop_path}`,
        }}
      >
        <div className="backDropContent">
          <div className="mainBackDropText">
            <h1 className="backDropMovieTitle">{title}</h1>
            <p className="backDropMovieoOerview">{overview}</p>
          </div>
        </div>
      </div>
      <MovieList movieData={movieData} setMovieData={setMovieData} />
    </div>
  );
}
