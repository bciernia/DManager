import {useStopwatch} from "react-timer-hook";
import {useState} from "react";
import classes from './Timer.module.css';

const Timer = () => {
    const [isStarted, setIsStarted] = useState(false);

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    return (
        <div style={{textAlign: 'center'}}>
            <div className={classes.timer}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={() => {
                setIsStarted(true);
                start();
            }}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={() => {
                reset();
                setIsStarted(false);
            }}>Reset</button>
        </div>
    );
}

export default Timer;