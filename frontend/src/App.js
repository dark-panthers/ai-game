import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import GameStart from "./pages/GameStart/GameStart";
import Game from "./pages/GameStart/GameStart";
import { JoinPage } from "./multiplayer/JoinPage";
import { CreatePage } from "./multiplayer/CratePage";
import { ModePage } from "./multiplayer/ModePage";
import { MultiplayerGame } from "./multiplayer/MultiplayerGame";

const game = {
  title: "game title",
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/gamestart/:id" element={<GameStart />} />
          <Route path="/game/:id" element={<Game />} />
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
