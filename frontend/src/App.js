import './App.css'
import GameStartPage from './GameStartPage';


const game ={
  title: "game name",
  desc: "tutorial tutorial",
  instruction_image:{
    imgs:[]
  },
  instruction_text: ""
}



function App() {
  return (
    <>
      <GameStartPage game={game} />
    </>
  );
}


export default App;
