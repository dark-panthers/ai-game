import React, { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
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
        <h2 className='multi-link'>
          <Link to={"/multiplayer/"}>
            Multiplayer
          </Link>
        </h2>
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