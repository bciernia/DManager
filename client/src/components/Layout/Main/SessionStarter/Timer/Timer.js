import {useStopwatch} from "react-timer-hook";
import classes from './Timer.module.css';
import startBtnImg from '../../../../../assets/buttons/play_button.png'
import stopBtnImg from '../../../../../assets/buttons/stop_button.png'
import pauseBtnImg from '../../../../../assets/buttons/pause_button.png'
import {useState} from "react";

const Timer = () => {
    const [latestTime, setLatestTime] = useState([]);

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

    return (
        <div className={classes.timer}>
            <span className={`${classes.timer__stopwatch} ${timerBackground}`}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </span>
            <div>
                <button className={classes.timer__btn} onClick={start}>
                    <img src={startBtnImg}/>
                </button>
                <button className={classes.timer__btn} onClick={pause}>
                    <img src={pauseBtnImg}/>
                </button>
                <button className={classes.timer__btn} onClick={() => {
                    saveTime(hours, minutes, seconds);
                    reset(undefined, false);
                }}>
                    <img src={stopBtnImg}/>
                </button>
            </div>
        </div>
    );
}

export default Timer;