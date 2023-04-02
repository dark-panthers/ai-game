import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePage = () => {
  const [code, setCode] = useState("");
  const [nick, setNick] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // todo ask for join code
    setCode("FLAS8DF73");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/multiplayer/game/${code}/${nick}`);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <h2>Create game</h2>
      <div>Share this code with fiends to play together</div>
      <h2>{code}</h2>
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
        Create game!
      </button>
    </form>
  );
};
