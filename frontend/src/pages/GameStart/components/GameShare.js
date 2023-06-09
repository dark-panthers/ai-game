import "./GameShare.css"
import {useState} from "react"

export default function GameShare({closeWindow,link}){
    const [choiceMulti,setChoiceMulti] = useState(-1);
    const [multiSettings, setMultiSettings] = useState({nick:"",token:"",list:[]})
    
    function handlePropagation(event){
        event.stopPropagation();
    }

    function chooseLeft(){
        console.log("left");
        setChoiceMulti(-1);
    }

    function chooseRight(){
        console.log("right");
        setChoiceMulti(1);
    }

    function setNick(val){
        setMultiSettings({...multiSettings,nick:val});
    }
    function setToken(val){
        setMultiSettings({...multiSettings,token:val});
    }
    function reqMulit(){
        //load from server

    }

    return (
        <div className="window" onClick={closeWindow}>
            <div className="inner" onClick={handlePropagation} >
                <header>
                    <h3>Multiplayer</h3>
                </header>
                <div className="multi-choice">
                    {/* <div id="left" class="choice-option" style={choiceMulti === -1 ? {backgroundColor: 'green'} : {backgroundColor: 'white'}} onClick={chooseLeft}>
                    
                        Create your room
                    </div> */}
                    <div id="left" class="choice-option" style={{ backgroundColor: choiceMulti === -1 ?  "green" : "white"}} onClick={chooseLeft}>
                    
                        Create your room
                    </div>
                    
                    <div id="right" class="choice-option" style={{ backgroundColor: choiceMulti === 1 ?  "green" : "white"}}  onClick={chooseRight}>
                        Join existing room
                    </div>
                </div>
                {choiceMulti === -1 ? <OwnRoom link={link}/> : <SomeonesRooms />}

                <div className="multi-form">
                    <label for="nick">Nick</label>
                    <input id="nick" onChange={(event)=>{setNick(event.target.value)}} /> 
                    <br />
                    <label for="token" onChange={(event)=>{setToken(event.target.value)}} >Token</label>
                    <input id="token" />
                    <br />
                    <p>Player list</p>
                    
                    <SomeonesRooms players={[]} />
                </div>
                <img src={process.env.PUBLIC_URL + "/icons/x.svg"} alt="ooppss" onClick={closeWindow}></img>
                
            </div>

        </div>
    )
}



function OwnRoom({link}){
    return (
        <div>
             <a href={link} className="linkToShare">{link}</a>
        </div>
    )
}

function SomeonesRooms({}){
    return(
        <div>
            <ol>
                <li>
                    <h5 className="room-name"></h5>
                </li>
            </ol>
        </div>
    )
}

function playersList({players}){
    const htmlList = players.map((player)=>{
        <li>{player.name}</li>
    })

    return(
        <ul>
        {htmlList}
        </ul>
    )
}