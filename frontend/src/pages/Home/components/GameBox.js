import React from 'react';
import { Link } from 'react-router-dom';
import "./GameBox.css"

const GameBox = ({game}) => {
    return (
        <Link  style={{ color: 'inherit', textDecoration: 'inherit'}}to={"/game/"+game.id}>
        <div className='gamebox bcolor-gray' >
            <div className='image'>
            <img src={getPath(game.image)} alt="gameimg"></img>
            </div>
           
            <h1 className='color-black' >{game.name.toUpperCase()}</h1>
        </div>
        </Link>
      );
}
 
export default GameBox;

const getPath= (file)=>{
    return process.env.PUBLIC_URL + file;
}