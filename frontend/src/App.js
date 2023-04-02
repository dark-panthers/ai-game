
import './App.css';
import GameStartPage from './GameStartPage.js';

const game={
  title:"game title"
}

function App() {
  return (
    <div className="App">
      <GameStartPage game={game}/>  
    </div>
  );
}


export default App;
