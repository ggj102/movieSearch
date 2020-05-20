import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Main from './component/Main';
import DetailPage from './component/DetailPage';

function App() {
  return (
    <>
      <Route exact path="/" component = {Main}/>
      <Route exact path="/detail/:id" component = {DetailPage}/>
    </>
  );
}

export default App;
