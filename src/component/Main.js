import React, { useState, useEffect} from 'react';
import Header from './Header';
import SearchImg from '../img/searchImg.png';
import MovieList from './MovieList';
import Axios from 'axios';
import '../css/Main.css';

function Main()
{
    const [input, setInput] = useState('');
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum]= useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [menuState, setMenuState] = useState("popular");
    const [backdropData,setBackdropData] = useState({});

    const {backdrop_path,title,overview}= backdropData

    // input에 검색을 하면 이벤트가 작동하며 pageNum과 movieData를 초기화 함
    const onChange = (e)=>{
        setInput(e.target.value);
        setMovieData([]);
        setPageNum(0);
    }

    // 기본 mainData와 searchData를 조건에 따라 가져오게 함
    useEffect(()=>{
        setLoading(true);
        console.log(input);
        if(input === "")
        {
            Axios.get("https://api.themoviedb.org/3/movie/"+menuState+"?api_key=1226d6349208c984366b4a0625201d6b&language=ko&page="+(pageNum+1)).then((response)=>{
                console.log(response.data);
                    setMovieData(response.data.results)
                    setTotalPage(response.data.total_pages);
                    setBackdropData(response.data.results[0])
                    }).then(()=>{setLoading(false)});
        }
        else
        {
            Axios.get("https://api.themoviedb.org/3/search/movie?api_key=1226d6349208c984366b4a0625201d6b&language=ko&query="+input+"&page="+(pageNum+1)).then((response)=>{
            console.log(response.data);
                setMovieData(response.data.results)
                setTotalPage(response.data.total_pages);
                }).then(()=>{setLoading(false)});
        }
    },[input,pageNum,menuState])

    // pagination button (다음페이지)
   const nextBtn = ()=>{
        if(pageNum < totalPage)
        {
            setPageNum(pageNum+1);
        }
   }

   // pagination button (이전페이지)
   const previewBtn = ()=>{
       if(pageNum > 1)
       {
            setPageNum(pageNum-1);
       }
    }

    // pagination button (10페이지 다음)
    const tenNextBtn = ()=>{
        const pageRange = Math.floor(pageNum/10)*10;
        const num = pageRange+10
        if(num > totalPage){
            return setPageNum(totalPage-1)
        }
        setPageNum(num);
    }

   // pagination button (10페이지 이전)
    const tenpreviewBtn = ()=>{
        const pageRange = Math.floor(pageNum/10)*10;
        let num = 0;

        if(pageRange > 0)
        {
            num = pageRange-10;
            return setPageNum(num);
        }
        setPageNum(0);
    }

    // pagination button (숫자)
   const pageNumBtn = (num)=>{
        setPageNum(num);
   }

   // pagination의 숫자 button을 활성화 함
   // pageNum(State)을 기준으로 페이지의 범위를 결정함
   const pageTag = ()=>{
        const tagArr =[];
        const startNum = Math.floor(pageNum/10)*10;
        let lastNum =  startNum+10;

        if(totalPage < lastNum)
        {
            lastNum = totalPage;
        }
        console.log(totalPage);
        console.log(lastNum);
        for(let i = startNum; i< lastNum; i++)
        {   
            tagArr.push(<a href="#" className={pageNum === i ?"pageFocus" :"pageBtn"} onClick={()=>{pageNumBtn(i)}}>{i+1}</a>)
        }
        return tagArr;
    }

   // pagination에 쓰이는 화살표
   const arrowArr = ["<<","<",">",">>"];

   // pagination Tag
   const pagination = ()=>{
       return(
        <div className="paging">
            <a href="#" className="pageBtn"  onClick={tenpreviewBtn}>{arrowArr[0]}</a>
            <a href="#" className="pageBtn" onClick={previewBtn}>{arrowArr[1]}</a>
            {pageTag()}
            <a href="#" className="pageBtn" onClick={nextBtn}>{arrowArr[2]}</a>
            <a href="#" className="pageBtn" onClick={tenNextBtn} >{arrowArr[3]}</a>
        </div>
       )
   }

    // 이벤트가 작동하면 menuState의 값을 갱신해 새로운 movieList를 뿌려줌
    const onClickMenuTab = (menu)=>{
        setPageNum(0);
        setMenuState(menu);
    }

    // menuTab Tag
    const menuTab = ()=>{
        if(input === "")
        {
            return(        
         <div className="menuTab">
             <a href="#" className={menuState === "popular" ?"tabTextFocus" : "tabText"} onClick={()=>{onClickMenuTab("popular")}}>Popular</a>
             <a href="#" className={menuState === "now_playing" ?"tabTextFocus" : "tabText"} onClick={()=>{onClickMenuTab("now_playing")}}>Now playing</a>
             <a href="#" className={menuState === "top_rated" ?"tabTextFocus" : "tabText"} onClick={()=>{onClickMenuTab("top_rated")}}>Top rated</a>
             <a href="#" className={menuState === "upcoming" ?"tabTextFocus" : "tabText"} onClick={()=>{onClickMenuTab("upcoming")}}>Upcoming</a>
         </div>)
        }
    }

    return(
    <div className="main">
        <Header/>
        {console.log(backdrop_path)}
        <div className="mainBackDrop" style={{backgroundImage:"url(http://image.tmdb.org/t/p/w1280"+backdrop_path+")"}}>
            <div className="backDropContent">
                <div className="mainBackDropText">
                    <h1 className="backDropMovieTitle">{title}</h1>
                    <p className="backDropMovieoOerview">{overview}</p>
                </div>
            </div>
        </div>
        <div className="searchBar">
            <div className="searchBarContent">
                <img className="searchImg" src={SearchImg}/>
                <input className="searchInput" placeholder="Search" onChange={onChange} value={input}/>
            </div>
        </div>
        {menuTab()}
        {pagination()}
        <MovieList movieData={movieData} nextBtn = {nextBtn} previewBtn={previewBtn}/>
    </div>
    )
}

export default Main;
