import React, { useState } from 'react';
import noImage from '../img/noImage.png';
import '../css/ActorList.css';

function ActorList({actorData})
{
    // 배우정보 펼치기 기능 state
    const [showAll, setShowAll] = useState(false); 

    // 배우이미지 
    const actorImg = actorData.map((obj)=>{
        return(
            <li>
                <img  className="actorImg" src={obj.profile_path ? "http://image.tmdb.org/t/p/w154"+obj.profile_path : noImage } alt="img"/>
                    <span className="actorName">{obj.name}</span>
                    <span className="actorCharacter">{obj.character}</span>
            </li>
        )
    })

    // 배우가 4명 이하일 경우 펼치기 기능 비활성화
    const noShowAll = ()=>{
        if(actorImg.length < 4)
        {
            return actorImg;
        }
        else return actorImg.slice(0,4);
    } 

    // 펼치기 버튼
    const showBtn = ()=>{
        if(actorImg.length < 4)
        {
            return ''
        }
        else
        {
            return <a  onClick={onShowAll}>showAll</a>
        }
    }

    // 펼치기 toggle
    const onShowAll = ()=>{
        if(!showAll){
            setShowAll(true);
        }
        else
            setShowAll(false);
    }

    return(
        <div className="actorList">
            <div>
                <div className="listName">
                    Actors
                </div>
                <div>
                    {showBtn()}
                </div>
            </div>
            
            <ul className = "actorUi">
            {!showAll ? noShowAll() : actorImg}
            </ul>
        </div>
    )
}

export default ActorList;
