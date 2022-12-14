import Axios from "axios";

Axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const mainPageKey = "?api_key=1226d6349208c984366b4a0625201d6b&language=ko";
const detailPageKey = "?api_key=1226d6349208c984366b4a0625201d6b&language=ko";

export const axiosGetMovieData = (tab, page) => {
  return Axios.get(`movie/${tab}${mainPageKey}&page=${page}`);
};

export const axiosGetSearchMovieData = (value, page) => {
  return Axios.get(`search/movie${mainPageKey}&query=${value}&page=${page}`);
};

export const axiosGetActorData = (id) => {
  return Axios.get(`movie/${id}/credits${detailPageKey}`);
};

export const axiosGetDetailData = (id) => {
  return Axios.get(`movie/${id}${detailPageKey}`);
};
