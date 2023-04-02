import "./GameSettings.css";

export default function GameSettings({ closeWindow, settings, setSettings }) {
  function handlePropagation(event) {
    event.stopPropagation();
  }

  function chooseEasy(){
    const newSettings = settings;
    newSettings.level = 1;
    setSettings(newSettings);
  }
  function chooseMedium(){
    const newSettings = settings;
    newSettings.level = 2;
    setSettings(newSettings);
  }
  function chooseHard(){
    const newSettings = settings;
    newSettings.level = 3;
    setSettings(newSettings);
  }

  return (
    <div className="window" onClick={closeWindow}>
      <div className="inner" onClick={handlePropagation}>
        <header>
          <h3>Multiplayer</h3>
        </header>
        <div>
          <div
            id="left"
            class="choice-option"
            style={{
              backgroundColor: settings.level === 1 ? "green" : "white",
            }}
            onClick={chooseEasy}
          >
            Easy
          </div>
          <div
            id="easy"
            class="choice-option"
            style={{
              backgroundColor: settings.level === 2 ? "green" : "white",
            }}
            onClick={chooseMedium}
          >
            Medium
          </div>
          <div
            id="medium"
            class="choice-option"
            style={{
              backgroundColor: settings.level === 3 ? "green" : "white",
            }}
            onClick={chooseHard}
          >
            Medium
          </div>
          
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
