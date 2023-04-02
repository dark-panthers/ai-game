import "./GameSettings.css";

export default function GameSettings({ closeWindow }) {
    function handlePropagation(event){
        event.stopPropagation();
    }


  return (
    <div className="window" onClick={closeWindow}>
      <div className="inner" onClick={handlePropagation}>
        <header>
          <h3>Multiplayer</h3>
        </header>
        <img src={process.env.PUBLIC_URL + "/icons/x.svg"} alt="ooppss" onClick={closeWindow}></img>
      </div>
    </div>
  );
}
