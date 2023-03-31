import classes from "./Main.module.css";
import Timer from "./Timer/Timer";
import Card from "../../UI/Card/Card";

const Main = props => {

    const time = new Date();

    time.setSeconds(time.getSeconds() + 600);

    return (
        <div className={classes.container}>
            <Card>
                <Timer />
            </Card>
        </div>
    )
}

export default Main;