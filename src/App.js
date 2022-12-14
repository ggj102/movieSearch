import React from "react";
import "./App.css";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import MainPage from "./components/MainPage";
import DetailPage from "./components/DetailPage";

function App() {
  return (
    <>
      <Header />
      <Route exact path="/" component={MainPage} />
      <Route exact path="/detail/:id" component={DetailPage} />
    </>
  );
}

export default App;
