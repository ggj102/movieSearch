import React, { useEffect, useState } from "react";
import noImage from "../../../img/noImage.png";
import "../../../css/ActorList.css";

function ActorList({ data }) {
  const [isShowAll, setIsShowAll] = useState(false);
  const [actorList, setActorList] = useState([]);

  const onClickShowAll = () => setIsShowAll(!isShowAll);

  useEffect(() => {
    if (isShowAll) setActorList(data);
    else {
      const copyData = [...data];
      setActorList(copyData.slice(0, 4));
    }
  }, [data, isShowAll]);

  return (
    <div className="actorList">
      <div>
        <div className="listName">Actors</div>
        <div>
          <div className="showAll">
            <span>showAll</span>
            <input
              onClick={onClickShowAll}
              disabled={data.length < 4}
              type="checkbox"
            />
          </div>
        </div>
      </div>
      <ul className="actorUi">
        {actorList.map((val, idx) => {
          const { profile_path, name, character } = val;

          return (
            <li key={`actorList${idx}`}>
              <img
                className="actorImg"
                src={
                  profile_path
                    ? `http://image.tmdb.org/t/p/w154${profile_path}`
                    : noImage
                }
                alt="img"
              />
              <span className="actorName">{name}</span>
              <span className="actorCharacter">{character}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ActorList;
