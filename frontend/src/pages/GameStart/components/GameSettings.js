import "./GameSettings.css";
import { useState } from "react";

export default function GameSettings({ closeWindow ,setSettings,settings}) {

  function handlePropagation(event) {
    event.stopPropagation();
  }

  function chooseEasy(){
    setSettings({...settings,mode:'easy'});
    console.log(settings.mode);

  }
  function chooseMedium(){
    setSettings({...settings,mode:'medium'});
    console.log(settings.mode);
  }
  function chooseHard(){
    setSettings({...settings,mode:'hard'});
    console.log(settings.mode);

  }
  console.log(settings.mode);

  function setTime(val){
    setSettings({...settings,duration:val});
    console.log(settings.duration);

  }

  

  return (
    <div className="window" onClick={()=>closeWindow(settings)}>
      <div className="inner" onClick={handlePropagation}>
        <header>
          <h3>Multiplayer</h3>
        </header>
        <div className="choice-mode">
          <div
            id="easy"
            className="choice-option"
            style={{ backgroundColor: settings.mode === 'easy' ? "green" : "white"}}
            onClick={chooseEasy}
          >
            Easy
          </div>
          <div
            id="medium"
            className="choice-option"
            style={{ backgroundColor: settings.mode === 'medium' ? "green" : "white" }}
            onClick={chooseMedium}>
            Medium
          </div>
          <div
            id="hard"
            className="choice-option"
            style={{ backgroundColor: settings.mode === 'hard' ? "green" : "white" }}
            onClick={chooseHard}>
            Hard
          </div>
          
        </div>

        <div className="choice-duration">
          <label for="duration">Choose length</label> 
          <input id="duration" type="number" onChange={(event)=>{setTime(event.target.value)}} value={settings.duration} />
        </div>

        
        <img
          src={process.env.PUBLIC_URL + "/icons/x.svg"}
          alt="ooppss"
          onClick={()=>closeWindow(settings)}
        ></img>
      </div>
    </div>
  );
}
