import React, { useState, useEffect } from "react";
import ActorList from "./ActorList/ActorList";
import "../../css/DetailPage.css";

import { axiosGetActorData, axiosGetDetailData } from "../../utils/axios";
import MovieInfo from "./MovieInfo";

export default function DetailPage({ match }) {
  const [actorData, setActorData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const { id } = match.params;

    axiosGetActorData(id).then((response) => {
      setActorData(response.data.cast);
    });

    axiosGetDetailData(id).then((response) => {
      setDetailData(response.data);
      setGenres(response.data.genres);
    });
  }, [match.params, match.params.id]);

  return (
    <div>
      <MovieInfo genres={genres} data={detailData} />
      <ActorList data={actorData} />
    </div>
  );
}
