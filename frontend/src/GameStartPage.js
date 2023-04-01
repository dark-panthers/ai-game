import "./GameStartPage.css";
import {useState} from "react"
import Tutorial from "./Tutorial";

export default function GameStartPage({ game }) {
  console.log(game);

  const [tutorialVisibility, setTutorialVisiility] = useState(false);

  function toggleTutorialVisibility(){
    if(tutorialVisibility === false){
      setTutorialVisiility(true);
    }
    else{
      setTutorialVisiility(false);
    }
    console.log(tutorialVisibility);
  }

  return (
    <div className="game-start-page">
      <div className="title-box">
        <h1 className="title">{game.title}</h1>
        {tutorialVisibility ? <Tutorial onclick={toggleTutorialVisibility} /> : ""}
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
        <img onClick={toggleTutorialVisibility}
          src={process.env.PUBLIC_URL + "/icons/patch-question.svg"}
          alt="ooops"
        ></img>
      </div>
    </div>
  );
}
