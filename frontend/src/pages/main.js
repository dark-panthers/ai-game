import React from 'react';
import GameBox from './components/GameBox';
import "./main.css"

const Main = () => {

    const games =[{name:"CITIES",desc:"Siema siema cos tam cos tam",img:""},{name:"DOGS",desc:"Naaajak",img:""},{name:"GEO",desc:"Ltso go",img:""}]

    const getPath= ()=>{
        return process.env.PUBLIC_URL + "logo.png"
    }

    return ( <div className='main'>
        <div>
        <img className="main-logo" src={getPath()}></img>
        </div>
        

        <div className='main-games'>
            { games.map(game=>
                    <GameBox game={game}/>
                )
            }
        </div> 
    </div>);
}
 
export default Main;