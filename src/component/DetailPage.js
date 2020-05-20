import React, { useState, useEffect } from 'react';
import ActorList from './ActorList';
import Header from './Header';
import Axios from 'axios';
import filmMark from '../img/filmMark.png'
import budgetImg from '../img/budget.png'
import timeImg from '../img/time.png'
import revenueImg from '../img/revenue.png'
import '../css/DetailPage.css';
import { NavLink } from 'react-router-dom';

function DetailPage({match})
{
    const [actorData, setActorData] = useState([])
    const [detailData, setDetailData] = useState([]);
    const [genres,setGenres] = useState([]);
    
    const {original_title,status,overview,backdrop_path,poster_path,runtime,revenue,budget,vote_average} = detailData;
    
    //detailPage로 가져오는 배우관련 data, 상세내용 data
    useEffect(()=>{
        Axios.get("https://api.themoviedb.org/3/movie/"+match.params.id+"/credits?api_key=1226d6349208c984366b4a0625201d6b&language=ko").then((response)=>{
            console.log("credits", response.data);
                setActorData(response.data.cast)})
        Axios.get("https://api.themoviedb.org/3/movie/"+match.params.id+"?api_key=1226d6349208c984366b4a0625201d6b&language=ko").then((response)=>{
            console.log("detail", response.data);
            setDetailData(response.data);
            setGenres(response.data.genres);
        })
    },[])

    // detailData에서 time값을 가져와 시간으로 환산함
    const timeCal = ()=>{
        let m = runtime;
        let h = 0;

        while(m > 60)
        {
            m-=60;
            h++;
        }
        return h+"h "+m+"m";
    }

    // score값을 가져와 %로 바꿔서 bg의 width 크기를 조절함
    const score = ()=>{
        let num = vote_average*10;
        return num+"%";
    }

    // score값 조건에 따라 bg의 color가 바뀜
    const scoreBgColor =()=>{
        let num = vote_average;

        if(num >= 7)
        {
            return "#16D47B"
        }
        else if(num <= 6.9 && num >= 5)
        {
            return "#FBB450"
        }
        else{
            return "#EE5F5B"
        }
    }
    
    // 장르 data를 가져와서 뿌려줌
    const genresMap = genres.map((a)=>{
        return <span className="genresText">{a.name}</span>
    })

    return(
        <div>
        <Header/>
        <div className="nav">
            <div className="navText">
             <NavLink to="/"><p>Home</p></NavLink>
             <p>/</p>
             <p>{original_title}</p>
            </div>
        </div>
        
        <div className="info"  style={{backgroundImage:"url(http://image.tmdb.org/t/p/w1280"+backdrop_path+")"}}>
            <div className = "movieIntroduce">
                <img className="poster" src={"http://image.tmdb.org/t/p/w500"+poster_path}/>
                <div className = "textPart">
                    <div className="movieTitle">{original_title}({status})</div>
                    <div>
                        <div className="text">PLOT</div> 
                        <div className="summary">{overview}</div>
                    </div>
                    <div>
                        <div className="text">GENRES</div> 
                        {genresMap}
                    </div>
                    <div>
                        <div className="text">IMDB RATING</div>
                        <div className="imdb">
                            <div className="imdbBar">
                                <div className="bar" style={{width:score() , background:scoreBgColor()} }></div>
                            </div>
                            <div className="imdbScore">{vote_average}</div>
                        </div>
                    </div>
                    <div>
                        <div className="text">DIRECTOR</div>
                        <div>디렉터명</div>
                    </div>
                </div>
                <img className="filmMark" src={filmMark}/>
            </div>
        </div>
        <div className="info2Position">
            <div className ="info2">
                <div className="info2Text">
                    <img className="info2Img" src={timeImg}/>
                    Running Time: {timeCal()}
                </div>
                <div className="info2Text">
                    <img className="info2Img" src={budgetImg}/>
                    Budget: ${budget}
                </div>
                <div className="info2Text">
                    <img className="info2Img" src={revenueImg}/>
                    Revenue: ${revenue}
                </div>
            </div>
        </div>
        <ActorList actorData={actorData}/>
        </div>
    )
}

export default DetailPage;
