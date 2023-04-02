import { useParams } from "react-router-dom";

export const MultiplayerGame = () => {
  const { code, nick } = useParams();

  return (
    <div>
      <h1>Game</h1>
      <div>{code}</div>
      <div>Playing as {nick}</div>
    </div>
  );
};
