import {useStopwatch} from "react-timer-hook";
import {useState} from "react";
import classes from './Timer.module.css';

const Timer = () => {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({autoStart: false});

    const timerBackground = isRunning ? classes["timer__stopwatch--running"] : classes["timer__stopwatch--stopped"];

    return (
        <div className={classes.timer}>
            <span className={`${classes.timer__stopwatch} ${timerBackground}`}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </span>
            <div>
                <button className={classes.timer__btn} onClick={start}>Start</button>
                <button className={classes.timer__btn} onClick={pause}>Pause</button>
                <button className={classes.timer__btn} onClick={() => {
                    reset(undefined, false);
                }}>Reset
                </button>
            </div>
        </div>
    );
}

export default Timer;