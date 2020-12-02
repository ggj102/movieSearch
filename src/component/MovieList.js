import React from 'react';
import '../css/MovieList.css';
import noImage from '../img/noImage.png';
import { NavLink } from 'react-router-dom';

function MovieList({movieData})
{
    // 영화의 리스트를 뿌려줌
    const movieImg = movieData.map((obj)=>{
        return(
            <li>
             <NavLink to={"/detail/"+obj.id}>
                <img  className="movieImg" src={obj.poster_path ? "http://image.tmdb.org/t/p/w500"+obj.poster_path : noImage} alt="img"/>
             </NavLink>    
            </li>
            
        )
    })

    return(
        <div className="movieList">
            <div className="listName">
                Popular Movies
            </div>
           <ul className = "movie"> {movieImg}</ul>
        </div>
    )
}

export default MovieList;
