import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import './MatchGame.css'
import MatchGameRound from './components/MatchGameRound'
import CountdownTimer from '../Components/Counter/CountdownTimer'
import { useLocation } from 'react-router-dom'

function MatchGame() {
    let NOW_IN_MS = new Date().getTime();

    const location = useLocation();
    const {duration, mode} = location.state;


    const [endTime, setEndTime] = useState(NOW_IN_MS + duration*1000)

    let gameId = 1
    const maxImageId = 5
    // const api = 'http://localhost:8000'
    const [currentRoundId, setCurrentRoundId] = useState(0)
    const [rounds, setRounds] = useState([]);
    const score = useRef(0)
    let shufflePromts = (data) => {
        // Shuffle prompts
        let n = data.length
        data = data.map((item) => item.prompt)
        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        return data
    }


    let getGameSet = async() => {
        // Replace with your server API to fetch images and prompts
        let data = await fetch(`/api/games/${gameId}`).then((res) => res.json())
        const n = data.length
        const chosen = Math.floor(Math.random() * n)
        setRounds(rounds => [...rounds, {image: data[chosen].image, answer: data[chosen].prompt, prompts: shufflePromts(data)}])
    }
    useEffect(() => {
        if (rounds.length > 0) return
        for (let i = 0; i < maxImageId; i++) {
            getGameSet()
        }
    }, [rounds])

    let reset = () => {
        setCurrentRoundId(0)
        score.current = 0
        setRounds([])
        setEndTime(new Date().getTime() + duration*1000)
    }

    let onSubmitAnswer = (currentAnswer) => {
        let answer = rounds[currentRoundId].answer
        setCurrentRoundId(currentRoundId + 1)
        if (currentAnswer === answer) {
            console.log("Correct")
            score.current += 1
        }else{
            console.log("Wrong")
        }
        if (currentRoundId === maxImageId - 1) {
            alert("Game Over with score: " + score.current + " out of " + maxImageId)	
            reset()
            return
        }
        
    }

    let onTimeUp = () => {
        alert("Time is up! Game Over with score: " + score.current + " out of " + maxImageId)
        reset()
    }

    return (<>

        <CountdownTimer targetDate={endTime} callback={onTimeUp} />
        <div className="outer">
            <div className='blurGameContainer'>
                { rounds.length > 0 ? (
                    <MatchGameRound
                    image={rounds[currentRoundId].image}
                    prompts={rounds[currentRoundId].prompts}
                    answer={rounds[currentRoundId].answer}
                    mode={mode}
                    onSubmitAnswer={onSubmitAnswer} />
                    ) : (
                        <div>Loading...</div>
                        )}

                
            </div>
        </div>
    </>

    )
}

export default MatchGame