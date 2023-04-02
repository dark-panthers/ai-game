import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const imageBox = (box) => {
  return <div>
    <div>
      {box.prompt}
    </div>
    <img src={box.image} width={200} height={200} alt="not found"/>
  </div>
}

const renderRound = (round) => {
  return <div>
    {round.map(s => imageBox(s))}
  </div>
}


export const MultiplayerGame = () => {
  const { code, nick, type } = useParams();
  const ws = useRef(null);
  const [waiting, setWaiting] = useState(true);
  const [results, setResults] = useState(null);
  const [round, setRound] = useState(null);

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://localhost:8000/ws/game/${type}/${code}/${nick}/`
    );
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;

    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log("e", message);
      if (message.type === "round") {
        setRound(message.data);
        setWaiting(false);
      }
    };

    return () => {
      wsCurrent.close();
    };
  }, [code, nick, type]);

  const submit = (correct) => {
    const event = {
      type: "vote",
      data: {
        nick: nick,
        correct: correct,
      },
    };
    ws.current.send(JSON.stringify(event));
  };

  let content;
  if (waiting) {
    content = <div>Waiting...</div>;
  } else if (results) {
    content = <div>{JSON.stringify(results)}</div>;
  } else {
    content = <div>{renderRound(round)}</div>;
  }

  return (
    <div>
      <h1>Game</h1>
      <div>{code}</div>
      <div>
        Playing as {nick} ({type})
      </div>
      {content}
    </div>
  );
};
