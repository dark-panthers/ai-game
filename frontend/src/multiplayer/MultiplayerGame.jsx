import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

function getRandomInt(max) {
  return Math.round(Math.random() * (max - 1)); // The maximum is exclusive and the minimum is inclusive
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

      if (message.type === "results") {
        setResults(JSON.parse(message.data));
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
    setWaiting(true);
  };

  const imageBox = (box, correct) => {
    return (
      <div onClick={() => submit(correct)}>
        <img src={box.image} width={200} height={200} alt="not found" />
      </div>
    );
  };

  let content;
  if (waiting) {
    content = <div>Waiting...</div>;
  } else if (results) {
    console.log(results)
    content = results.map((r) => (
      <div>
        {r.nick} {"->"} {r.score}
      </div>
    ));
  } else {
    const correct = getRandomInt(round.length);
    const prompt = round[correct].prompt;
    content = (
      <div>
        <div>{prompt}</div>
        <div>{round.map((s, i) => imageBox(s, i === correct))}</div>;
      </div>
    );
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
