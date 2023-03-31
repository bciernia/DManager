import {useStopwatch} from "react-timer-hook";
import classes from './Timer.module.css';
import startBtnImg from '../../../../../assets/buttons/play_button.png'
import stopBtnImg from '../../../../../assets/buttons/stop_button.png'
import pauseBtnImg from '../../../../../assets/buttons/pause_button.png'
import {useState} from "react";

const Timer = () => {
    const [latestTime, setLatestTime] = useState([]);
    const [isSessionStarted, setIsSessionStarted] = useState(false);
    const [isSessionPaused, setIsSessionPaused] = useState(false);

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

    const saveTime = (hours, minutes, seconds) => {
        const newTime = `${hours}:${minutes}:${seconds}`;

        setLatestTime([...latestTime, newTime])
    }

    const startSessionHandler = () => {
        start();
        setIsSessionStarted(true);
    }

    const pauseSessionHandler = () => {
        isSessionPaused ? start() : pause();
        setIsSessionPaused(isSessionPaused => !isSessionPaused);
    }

    const finishSessionHandler = () => {
        saveTime(hours, minutes, seconds);
        reset(undefined, false);
        setIsSessionStarted(false);
        setIsSessionPaused(false);
    }

    return (
        <div className={classes.timer}>
            <span className={`${classes.timer__stopwatch} ${timerBackground}`}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </span>
            <div>
                {!isSessionStarted ?
                    (<button className={classes.timer__btn} onClick={startSessionHandler}>
                        <img src={startBtnImg}/>
                    </button>) :
                    (
                        <div>
                            <button className={classes.timer__btn} onClick={pauseSessionHandler}>
                                {isSessionPaused ? ( <img src={startBtnImg}/>) : ( <img src={pauseBtnImg}/>)}
                            </button>
                            <button className={classes.timer__btn} onClick={finishSessionHandler}>
                                <img src={stopBtnImg}/>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Timer;