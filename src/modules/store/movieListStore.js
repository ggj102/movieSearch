import { action, observable } from "mobx";

const MovieObservable = observable({
  movieData: [{}],
  currentPageNum: 0,
  currentTab: "popular",
  searchValue: "",
  totalPage: 0,
});

const setCurrentPageNum = action((num) => {
  MovieObservable.currentPageNum = num;
});

const setMovieData = action((data) => {
  MovieObservable.movieData = [...data];
});

const setCurrentTab = action((tab) => {
  MovieObservable.currentTab = tab;
});

const setSearchValue = action((value) => {
  MovieObservable.searchValue = value;
});

const setTotalPage = action((num) => {
  MovieObservable.totalPage = num;
});

export default {
  MovieObservable,
  setCurrentPageNum,
  setMovieData,
  setCurrentTab,
  setSearchValue,
  setTotalPage,
};
