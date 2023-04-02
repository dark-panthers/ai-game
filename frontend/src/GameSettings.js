import "./GameSettings.css";
import { useState } from "react";

export default function GameSettings({ closeWindow }) {

  const [settings, setSettings] = useState({level:2,time:20});

  function handlePropagation(event) {
    event.stopPropagation();
  }

  function chooseEasy(){
    // let newSettings = settings;
    // newSettings.level = 1;
    setSettings({...settings,level:1});
    console.log(settings.level);

  }
  function chooseMedium(){
    // let newSettings = settings;
    // newSettings.level = 2;
    setSettings({...settings,level:2});
    console.log(settings.level);
  }
  function chooseHard(){
    // let newSettings = settings;
    // newSettings.level = 3;
    setSettings({...settings,level:3});
    console.log(settings.level);

  }
  console.log(settings.level);

  function setTime(val){
    // let newSettings = settings;
    // newSettings.time = val;
    setSettings({...settings,time:val});
    console.log(settings.time);

  }

  

  return (
    <div className="window" onClick={closeWindow}>
      <div className="inner" onClick={handlePropagation}>
        <header>
          <h3>Multiplayer</h3>
        </header>
        <div className="choice-level">
          <div
            id="easy"
            className="choice-option"
            style={{ backgroundColor: settings.level === 1 ? "green" : "white"}}
            onClick={chooseEasy}
          >
            Easy
          </div>
          <div
            id="medium"
            className="choice-option"
            style={{ backgroundColor: settings.level === 2 ? "green" : "white" }}
            onClick={chooseMedium}>
            Medium
          </div>
          <div
            id="hard"
            className="choice-option"
            style={{ backgroundColor: settings.level === 3 ? "green" : "white" }}
            onClick={chooseHard}>
            Hard
          </div>
          
        </div>

        <div className="choice-time">
          <label for="time">Choose length</label> 
          <input id="time" type="number" onChange={(event)=>{setTime(event.target.value)}} value={settings.time} />
        </div>

        
        <img
          src={process.env.PUBLIC_URL + "/icons/x.svg"}
          alt="ooppss"
          onClick={closeWindow}
        ></img>
      </div>
    </div>
  );
}
