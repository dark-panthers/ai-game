import React from 'react';

const Game = () => {
    const { id } = useParams();

    const [game,setGame] = useState(null);


    useEffect(() => {
        fetch("/api/games/?format=json")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setGames(data)
        })
       }, []);

    return ( <div>
        <div></div>

    </div> );
}
 
export default Game;