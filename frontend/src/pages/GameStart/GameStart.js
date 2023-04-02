import "./GameStart.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Game() {

  const { id } = useParams();

  const [game,setGame] = useState(null);

    useEffect(() => {
        fetch("/api/game/"+id+"/?format=json")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setGame(data)
        })
       }, []);

  return (
    <div className="game-start-page">
      <div className="title-box">
        <h1 className="title">{game.title}</h1>
      </div>
      <div className="start-box">
        <button>
          <h3>start</h3>
        </button>
      </div>
      <div className="settings-gear-box">
        <img src={process.env.PUBLIC_URL + "/icons/gear.svg"} alt="ooops"></img>
      </div>
      <div className="top-right">
        <img
          src={process.env.PUBLIC_URL + "/icons/share.svg"}
          alt="ooops"
        ></img>
        <img
          src={process.env.PUBLIC_URL + "/icons/patch-question.svg"}
          alt="ooops"
        ></img>
      </div>
    </div>
  );
}
