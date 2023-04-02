import React, {useEffect, useState} from 'react';
import GameResult from "./GameResult";

function OrderingGame() {
    const [photos, setPhotos] = useState([]);
    const [prompts, setPrompts] = useState([]);
    const [selections, setSelections] = useState([]);
    const [promptOrders, setPromptOrder] = useState([]);
    const [gameState, setGameState] = useState("playing");


    useEffect(() => {
        loadGame();
    }, []);


    const loadGame = () => {
        console.log("loading game")
        fetch('/api/games/1') // assuming the data is fetched from an API
            .then(response => response.json())
            .then(data => {
                let photos = data.map(photo => photo.image);
                let prompts = data.map(photo => photo.prompt);

                prompts = shufflePrompts(prompts);
                setPrompts(prompts);
                setPhotos(photos);

                setGameState("playing");

                setSelections(new Array(photos.length).fill(-1));
            });
    }


    const shufflePrompts = (prompts) => {
        // shuffle the prompts and save the order
        const newPromptOrder = prompts.map((_, index) => index).sort(() => Math.random() - 0.5);
        setPromptOrder(newPromptOrder);
        // shuffle the prompts
        return newPromptOrder.map(index => prompts[index]);
    };

    const handleSelection = (event, index) => {
        const newSelections = [...selections];
        newSelections[index] = parseInt(event.target.value);
        setSelections(newSelections);
    };

    const isCorrect = () => {
        let correct = true;
        selections.forEach((selection, index) => {
            if (selection !== promptOrders[index]) {
                correct = false;
            }
        });
        return correct;
    }

    const checkIfSelectionsValid = () => {
        // check if all selections are made
        const allSelectionsMade = selections.every(selection => selection !== -1);
        if (!allSelectionsMade) {
            return false;
        }

        // check if there are any duplicates
        const uniqueSelections = new Set(selections);
        return uniqueSelections.size === selections.length;
    }

    return (
        <div className="container-xl my-5">
            <div className="row">
                <div className="col-md-5">
                    <div className="row">
                        {photos.map((photo, index) => (
                            <div className="col-6 my-2">
                                {index + 1}
                               <img src={photo} alt={`Photo`} className="img-fluid"/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-3">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Select Prompt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {photos.map((photo, index) => (
                            <tr key={photo.id}>
                                <td>
                                    <select value={selections[index]} onChange={(event) => handleSelection(event, index)}
                                            disabled={gameState === "finished"}
                                            >
                                        <option value={-1}>Select Description</option>
                                        {photos.map((photo, index) => (
                                            <option value={index} key={index}>Description {index + 1}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Number</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {prompts.map((prompt, index) => (
                            <tr key={prompt.id}>
                                <td>{index + 1}</td>
                                <td>{prompt}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="text-center m-2">
                {gameState === "playing" ? (
                        <button className="btn btn-primary btn-lg"
                            onClick={() => setGameState("finished")}
                            disabled={!checkIfSelectionsValid()}>
                            Done
                        </button>
                    ) : (
                        <GameResult is_good={isCorrect()} message={
                            isCorrect() ? "You got it right!" : "You got it wrong!"
                        }
                        />
                    )
                }
            </div>
            <div className="text-center">

                <button className="btn btn-secondary m-2"
                        onClick={() => loadGame()}
                        >Restart</button>
            </div>
            {/* eslint-disable-next-line react/style-prop-object */}
            <div className="text-center" style={{opacity: 0.05}}>
                { promptOrders.map((order, index) => (order + 1) + " ")}
            </div>


        </div>
    );
}

export default OrderingGame;