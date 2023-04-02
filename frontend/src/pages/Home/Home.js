import React, { useEffect, useState } from 'react';
import GameBox from './components/GameBox';
import "./Home.css"

const Home = () => {

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


    return ( <div className='home'>
        <h1  className="home-logo" >
          <b>GuessWhat</b>  
        </h1>

        <div className='home-games'>
            { games.map(game=>
                    <GameBox game={game} key={game.id}/>
                )}
        </div> 
    </div>);
}
 
export default Home;