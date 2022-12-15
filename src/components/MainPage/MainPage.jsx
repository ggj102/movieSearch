import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "../../css/Main.css";
import indexStore from "../../modules";

import { axiosGetMovieData, axiosGetSearchMovieData } from "../../utils/axios";

import MovieList from "./MovieList";

export default function MainPage() {
  const [banner, setBanner] = useState({});
  const { MovieStore } = indexStore();
  const { MovieObservable, setMovieData, setTotalPage } = MovieStore;
  const { searchValue, currentTab, currentPageNum } = MovieObservable;

  useEffect(() => {
    const pageNum = currentPageNum + 1;

    const getData =
      searchValue === ""
        ? axiosGetMovieData(currentTab, pageNum)
        : axiosGetSearchMovieData(searchValue, pageNum);

    getData.then((res) => {
      setMovieData(res.data.results);
      setTotalPage(res.data.total_pages);
      setBanner(res.data.results[0]);
    });
  }, [currentPageNum, currentTab, searchValue, setMovieData, setTotalPage]);

  return (
    <div className="main">
      <div
        className="mainBackDrop"
        style={{
          backgroundImage: `${
            banner.backdrop_path
              ? `url(http://image.tmdb.org/t/p/w1280${banner.backdrop_path}`
              : ""
          }`,
        }}
      >
        <div className="backDropContent">
          <div className="mainBackDropText">
            <h1 className="backDropMovieTitle">{banner.title}</h1>
            <p className="backDropMovieoOerview">{banner.overview}</p>
          </div>
        </div>
      </div>
      <MovieList />
    </div>
  );
}
