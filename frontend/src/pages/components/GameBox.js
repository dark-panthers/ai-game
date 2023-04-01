import React from 'react';
import "./GameBox.css"

const GameBox = ({game}) => {
    return (
        <div className='gamebox bcolor-gray'>
            <img src={getPath(game.img)} alt="gameimg"></img>
            <h1>{game.name}</h1>
            <h2>{game.description}</h2>
        </div>
      );
}
 
export default GameBox;

const getPath= (file)=>{
    return process.env.PUBLIC_URL + file;
}