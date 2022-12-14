import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../../css/MovieList.css";

import {
  axiosGetMovieData,
  axiosGetSearchMovieData,
} from "../../../utils/axios";

import noImage from "../../../img/noImage.png";
import SearchImg from "../../../img/searchImg.png";

import Pagination from "../Pagination";
import CategoryTab from "../CategoryTab";

function MovieList({ movieData, setMovieData }) {
  const [searchValue, setSearchValue] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentTab, setCurrentTab] = useState("popular");

  const CategoryNameConv = (tabName) => {
    const underbar = tabName.replace("_", " ");
    const name = underbar.replace(underbar[0], underbar[0].toUpperCase());
    setCategoryName(name);
  };

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
    setMovieData([]);
    setCurrentPageNum(0);
  };

  const onClickCategoryTab = (name) => {
    setCurrentPageNum(0);
    setCurrentTab(name);
    CategoryNameConv(name);
  };

  useEffect(() => {
    const pageNum = currentPageNum + 1;

    const getData =
      searchValue === ""
        ? axiosGetMovieData(currentTab, pageNum)
        : axiosGetSearchMovieData(searchValue, pageNum);

    getData.then((res) => {
      setMovieData(res.data.results);
      setTotalPage(res.data.total_pages);
    });
  }, [searchValue, currentPageNum, currentTab, setMovieData]);

  return (
    <>
      <div className="searchBar">
        <div className="searchBarContent">
          <img className="searchImg" src={SearchImg} alt="img" />
          <input
            className="searchInput"
            placeholder="Search"
            onChange={onChangeSearchValue}
            value={searchValue}
          />
        </div>
      </div>
      <CategoryTab
        searchValue={searchValue}
        currentTab={currentTab}
        onClick={onClickCategoryTab}
      />
      <Pagination
        currentPageNum={currentPageNum}
        totalPage={totalPage}
        setCurrentPageNum={setCurrentPageNum}
      />
      <div className="movieList">
        <div className="listName">{`${categoryName} Movies`}</div>
        <ul className="movie">
          {movieData.map((val, idx) => {
            const { id, poster_path } = val;

            return (
              <li key={idx}>
                <NavLink to={"/detail/" + id}>
                  <img
                    className="movieImg"
                    src={
                      poster_path
                        ? `http://image.tmdb.org/t/p/w500${poster_path}`
                        : noImage
                    }
                    alt="img"
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MovieList;
