import React, { useState, useEffect } from "react";

export default function Pagination({
  currentPageNum,
  totalPage,
  setCurrentPageNum,
}) {
  const [pageNumArr, setPageNumArr] = useState([]);

  const nextBtn = () => {
    if (currentPageNum < totalPage) {
      setCurrentPageNum(currentPageNum + 1);
    }
  };

  const previewBtn = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1);
    }
  };

  const tenNextBtn = () => {
    const pageRange = Math.floor(currentPageNum / 10) * 10;
    const num = pageRange + 10;
    if (num > totalPage) {
      return setCurrentPageNum(totalPage - 1);
    }
    setCurrentPageNum(num);
  };

  const tenpreviewBtn = () => {
    const pageRange = Math.floor(currentPageNum / 10) * 10;
    let num = 0;

    if (pageRange > 0) {
      num = pageRange - 10;
      return setCurrentPageNum(num);
    }
    setCurrentPageNum(0);
  };

  useEffect(() => {
    const numArr = [];
    const startNum = Math.floor(currentPageNum / 10) * 10;
    let lastNum = startNum + 10;

    if (totalPage < lastNum) lastNum = totalPage;

    for (let i = startNum; i < lastNum; i++) {
      numArr.push(i);
    }

    setPageNumArr(numArr);
  }, [currentPageNum, totalPage]);

  return (
    <div className="paging">
      <a href="#pageBtn" className="pageBtn" onClick={tenpreviewBtn}>
        {"<<"}
      </a>
      <a href="#pageBtn" className="pageBtn" onClick={previewBtn}>
        {"<"}
      </a>
      {pageNumArr.map((val, idx) => {
        return (
          <a
            key={`pageNum${idx}`}
            href="#pageBtn"
            className={`page${currentPageNum === val ? "Focus" : "Btn"}`}
            onClick={() => setCurrentPageNum(val)}
          >
            {val + 1}
          </a>
        );
      })}
      <a href="#pageBtn" className="pageBtn" onClick={nextBtn}>
        {">"}
      </a>
      <a href="#pageBtn" className="pageBtn" onClick={tenNextBtn}>
        {">>"}
      </a>
    </div>
  );
}
