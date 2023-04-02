import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JoinPage } from "./multiplayer/JoinPage";
import { CreatePage } from "./multiplayer/CratePage";
import { ModePage } from "./multiplayer/ModePage";
import { MultiplayerGame } from "./multiplayer/MultiplayerGame";
import NoPage from "./pages/NoPage";
import GameStart from "./pages/GameStart/GameStart";
import React from "react";
import MatchGame from "./pages/BlurGame/MatchGame";
import OrderingGame from "./pages/OrderingGame/OrderingGame";

const game = {
  title: "game title",
};

function App() {
  return (
    <div className="App flex">
      <BrowserRouter>
        <Routes className="flex">
          <Route index element={<Home />} />
          <Route path="/gamestart/:id" element={<GameStart />} />
          <Route
            className="flex-centered"
            path="/game/1"
            element={<MatchGame />}
          />
          <Route path="/game/2" element={<OrderingGame />} />
          <Route path="/multiplayer" element={<ModePage />} />
          <Route path="/multiplayer/join" element={<JoinPage />} />
          <Route path="/multiplayer/create" element={<CreatePage />} />
          <Route
            path="/multiplayer/game/:code/:nick/:type"
            element={<MultiplayerGame />}
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
