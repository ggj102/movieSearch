import React from "react";

export default function CategoryTab({ searchValue, currentTab, onClick }) {
  return (
    !searchValue && (
      <div className="menuTab">
        <a
          href="#category"
          className={`tabText${currentTab === "popular" ? "Focus" : ""}`}
          onClick={() => onClick("popular")}
        >
          Popular
        </a>
        <a
          href="#category"
          className={`tabText${currentTab === "now_playing" ? "Focus" : ""}`}
          onClick={() => onClick("now_playing")}
        >
          Now playing
        </a>
        <a
          href="#category"
          className={`tabText${currentTab === "top_rated" ? "Focus" : ""}`}
          onClick={() => onClick("top_rated")}
        >
          Top rated
        </a>
        <a
          href="#category"
          className={`tabText${currentTab === "upcoming" ? "Focus" : ""}`}
          onClick={() => onClick("upcoming")}
        >
          Upcoming
        </a>
      </div>
    )
  );
}
