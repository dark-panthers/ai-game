import React from 'react';
import "./GameBox.css"

const GameBox = ({game}) => {
    return (
        <div className='gamebox bcolor-gray' >
            <div className='image'>
            <img src={getPath(game.image)} alt="gameimg"></img>
            </div>
           
            <h1 className='color-black'>{game.name.toUpperCase()}</h1>
        </div>
      );
}
 
export default GameBox;

const getPath= (file)=>{
    return process.env.PUBLIC_URL + file;
}