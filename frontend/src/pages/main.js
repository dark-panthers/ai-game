import React, { useEffect, useState } from 'react';
import GameBox from './components/GameBox';
import "./main.css"

const Main = () => {

    const [games,setGames] = useState([]);

    useEffect(() => {
        fetch("/api/games/?format=json")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setGames(data)
        })
       }, []);

       
    const getPath= ()=>{
        return process.env.PUBLIC_URL + "logo.png"
    }

    return ( <div className='main'>
        <div  className="main-logo" >
        <img src={getPath()} alt="logo"></img>
        </div>

        <div className='main-games'>
            { games.map(game=>
                    <GameBox game={game} key={game.id}/>
                )}
        </div> 
    </div>);
}
 
export default Main;