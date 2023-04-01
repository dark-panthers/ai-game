import "./GameStartPage.css";

export default function GameStartPage({ game }) {
  console.log(game);

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
