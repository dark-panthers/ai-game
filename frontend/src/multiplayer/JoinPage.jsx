import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const JoinPage = () => {
  const [code, setCode] = useState("");
  const [nick, setNick] = useState("")
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/multiplayer/game/${code}/${nick}`)
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <h2>Join game</h2>
      <div>
        <label htmlFor="game">Enter join code</label>
        <input
          type="text"
          name="code"
          id="code"
          value={code}
          onChange={(v) => setCode(v.target.value)}
        />
      </div>
      <div>
        <label htmlFor="game">Enter nick</label>
        <input
          type="text"
          name="nick"
          id="nick"
          value={nick}
          onChange={(v) => setNick(v.target.value)}
        />
      </div>
      <button type="submit">
        Join game!
      </button>
    </form>
  );
};
