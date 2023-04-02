import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';
import './Counter.css';


const ShowCounter = ({ minutes, seconds }) => {
    if (minutes < 0 && seconds < 0) {
        return <div className="timerContainer">0</div>
    }
    if (minutes > 0 && seconds < 10) {
        seconds = '0' + seconds
    }
    
    return (
    <div className="show-counter timerContainer">
    {
        minutes > 0 ? (
            <>
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
            </>
        ) : <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={seconds < 10 && minutes === 0 } />
    }
        
    </div>
  );
};

const CountdownTimer = ({ targetDate, callback }) => {
    const [minutes, seconds] = useCountdown(targetDate, callback);

    return (

        <ShowCounter
            minutes={minutes}
            seconds={seconds}
            />

    );
  }


export default CountdownTimer;
