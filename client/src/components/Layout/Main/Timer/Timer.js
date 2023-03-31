import {useStopwatch} from "react-timer-hook";
import {useState} from "react";
import classes from './Timer.module.css';
import Card from "../../../UI/Card/Card";

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
    } = useStopwatch({autoStart: false});

    const timerBackground = isRunning ? classes.running : classes.stopped;

    return (
        <div>
            <span className={`${classes.timer} ${timerBackground}`}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </span>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={() => {
                reset(undefined, false);
            }}>Reset
            </button>
        </div>
    );
}

export default Timer;