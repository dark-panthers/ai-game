
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/NoPage';
import GameStart from './pages/GameStart/GameStart';
import Game from './pages/GameStart/GameStart';
import React, { Component }  from 'react';
import MatchGame from './pages/BlurGame/MatchGame';
import OrderingGame from "./pages/OrderingGame/OrderingGame";

const game={
  title:"game title"
}

function App() {
  return (
    
    <div className="App">

       <BrowserRouter>
       
      <Routes>
          <Route index element={<Home />} />
          <Route path="/gamestart/:id" element={<GameStart />} />
          <Route path="/game/1" element={<MatchGame />} />
          <Route path="/game/2" element={<OrderingGame />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;
