import classes from "./Main.module.css";
import Team from "../../Teams/Team";

const Main = () => {
    return (
        <div className={classes["main-container"]}>
            <Team/>
        </div>
    )
}

export default Main;