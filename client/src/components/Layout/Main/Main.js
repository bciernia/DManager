import classes from "./Main.module.css";
import Timer from "./Timer/Timer";

const Main = props => {

    const time = new Date();

    time.setSeconds(time.getSeconds() + 600);

    return (
        <div className={classes.container}>
            <Timer />
        </div>
    )
}

export default Main;