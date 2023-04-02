import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const Game = () => {
    const { id } = useParams();

    const [game,setGame] = useState(null);

    useEffect(() => {
        fetch("/api/games/"+id+"?format=json")
        .then(response => {
          return response.json()
        })
        .then(data => {
            console.log(data)
          setGame(data)
        })
       }, []);

    return ( <div>
        <div></div>

    </div> );
}
 
export default Game;