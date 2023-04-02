import React, { useEffect, useState } from 'react';
import GameBox from './components/GameBox';
import "./Home.css"

const Home = () => {

    const [games,setGames] = useState([]);
    const [toggleRules,setToggleRules] = useState(false);

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
            GuessWhat
        </h1>

        <div className='home-games'>
            { games.map(game=>
                    <GameBox game={game} key={game.id}/>
                )}
        </div> 

        <div className="home-help" onClick={()=>setToggleRules(true)}>
            <img src={getPath("icons/help-icon.png")}></img>
        </div>
        <div className='home-rules' style={toggleRules?{right:"0"}:{}}>
                <h1>REGULY GRY:</h1>
                <h2>To oglnie chodzi o to zeby klikac w zdjecia a tutaj przykladowa gra:</h2>
                <img></img>
                <img onClick={()=>setToggleRules(false)} src={getPath("icons/close-icon.png")}></img>
            </div>
    </div>);
}
 
export default Home;

const getPath= (file)=>{
    return process.env.PUBLIC_URL + file;
}