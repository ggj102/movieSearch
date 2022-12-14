import React from "react";
import { NavLink } from "react-router-dom";

import filmMark from "../../../img/filmMark.png";
import budgetImg from "../../../img/budget.png";
import timeImg from "../../../img/time.png";
import revenueImg from "../../../img/revenue.png";

export default function MovieInfo({ genres, data }) {
  const {
    original_title,
    backdrop_path,
    poster_path,
    status,
    overview,
    vote_average,
    runtime,
    budget,
    revenue,
  } = data;

  const scoreBgColor = () => {
    let num = vote_average;

    if (num >= 7) return "#16D47B";
    else if (num <= 6.9 && num >= 5) return "#FBB450";
    else return "#EE5F5B";
  };

  return (
    <>
      <div className="nav">
        <div className="navText">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <p>/</p>
          <p>{original_title}</p>
        </div>
      </div>
      <div
        className="info"
        style={{
          backgroundImage: `url(http://image.tmdb.org/t/p/w1280${backdrop_path}`,
        }}
      >
        <div className="movieIntroduce">
          <img
            className="poster"
            src={`http://image.tmdb.org/t/p/w500${poster_path}`}
            alt="img"
          />
          <div className="textPart">
            <div className="movieTitle">
              {original_title}({status})
            </div>
            <div>
              <div className="text">PLOT</div>
              <div className="summary">{overview}</div>
            </div>
            <div>
              <div className="text">GENRES</div>
              {genres.map((val, idx) => {
                return (
                  <span key={idx} className="genresText">
                    {val.name}
                  </span>
                );
              })}
            </div>
            <div>
              <div className="text">IMDB RATING</div>
              <div className="imdb">
                <div className="imdbBar">
                  <div
                    className="bar"
                    style={{
                      width: `${vote_average * 10}%`,
                      background: scoreBgColor(),
                    }}
                  ></div>
                </div>
                <div className="imdbScore">{vote_average}</div>
              </div>
            </div>
            <div>
              <div className="text">DIRECTOR</div>
              <div>디렉터명</div>
            </div>
          </div>
          <img className="filmMark" src={filmMark} alt="img" />
        </div>
      </div>
      <div className="info2Position">
        <div className="info2">
          <div className="info2Text">
            <img className="info2Img" src={timeImg} alt="img" />
            Running Time:{" "}
            {`${(runtime - (runtime % 60)) / 60}h ${runtime % 60}m`}
          </div>
          <div className="info2Text">
            <img className="info2Img" src={budgetImg} alt="img" />
            Budget: ${budget}
          </div>
          <div className="info2Text">
            <img className="info2Img" src={revenueImg} alt="img" />
            Revenue: ${revenue}
          </div>
        </div>
      </div>
    </>
  );
}
