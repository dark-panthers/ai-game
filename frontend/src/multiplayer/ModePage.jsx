import { Link } from "react-router-dom";

export const ModePage = () => {
  return (
    <div>
      <div>Play with friends in multiplayer mode!</div>
      <Link to={"/multiplayer/join"}>
        <h2>Join</h2>
      </Link>
      <Link to={"/multiplayer/create"}>
        <h2>Create</h2>
      </Link>
    </div>
  );
};
