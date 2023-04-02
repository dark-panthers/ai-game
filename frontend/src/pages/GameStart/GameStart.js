import "./GameStart.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Tutorial from "./components/Tutorial";
import GameShare from "./components/GameShare";
import GameSettings from "./components/GameSettings";

export default function GameStart() {

  const { id } = useParams();

  
  const [game,setGame] = useState(null);
  
  const [settings, setSettings] = useState({mode:'medium',duration:20});

    useEffect(() => {
        fetch("/api/games/?format=json")
        .then(response => {
          return response.json()
          
        })
        .then(data => {
          
          const data2  =data.filter((g)=>{
            return  g.id == id}).shift();
            console.log(data2);
          setGame(data2);
        })
       }, []);

  const [tutorialVisibility, setTutorialVisiility] = useState(false);
  const [GameShareVisibility, setGameShareVisiility] = useState(false);
  const [GameSettingsVisibility, setGameSettingsVisibility] = useState(false);
  


  function toggleTutorialVisibility(){
    if(tutorialVisibility === false){
      setTutorialVisiility(true);
    }
    else{
      setTutorialVisiility(false);
    }
  }

  function toggleGameShareVisibility(){
    if(GameShareVisibility === false){
      setGameShareVisiility(true);
    }
    else{
      setGameShareVisiility(false);
    }
  }

  function toggleGameSettingsVisibility(){
    if(GameSettingsVisibility === false){
      setGameSettingsVisibility(true);
    }
    else{
      setGameSettingsVisibility(false);
    }
  
  }

  const navigate = useNavigate();
  const handleOnClick = ()=>{
    console.log(settings)
    navigate(`/game/${id}`,{state:{duration:settings.duration, mode:settings.mode}})
  }


  return (
    <div className="outer">
      

    <div className="game-start-page">
      <div className="title-box">
        <h1 className="title">{game ? game.name : ""}</h1>
        {tutorialVisibility ? <Tutorial closeWindow={toggleTutorialVisibility} description={game.description} faq={game.faq}/> : ""}
        {GameShareVisibility ? <GameShare closeWindow={toggleGameShareVisibility} link={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} /> : ""}
        {GameSettingsVisibility ? <GameSettings 
        settings={settings}
        setSettings={setSettings}
        closeWindow={()=>{
          toggleGameSettingsVisibility();
        }}  />:""}
      </div>
      <div className="start-box">
      <button onClick={handleOnClick}>
          <h3>start</h3>
        </button>
    
      </div>
      <div className="settings-gear-box">
        <img onClick={toggleGameSettingsVisibility}
        src={process.env.PUBLIC_URL + "/icons/gear.svg"} 
        alt="ooops"></img>
      </div>
      <div className="top-right">
        <img onClick={toggleGameShareVisibility}
          src={process.env.PUBLIC_URL + "/icons/share.svg"}
          alt="ooops"
        ></img>
        <img onClick={toggleTutorialVisibility}
          src={process.env.PUBLIC_URL + "/icons/patch-question.svg"}
          alt="ooops"
        ></img>
      </div>
    </div>
    </div>
  );
}
