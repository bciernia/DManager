import classes from "./Main.module.css";
import Team from "../../Teams/Team";
import AddCharacter from "../../Teams/Character/AddCharacter/AddCharacter";

const Main = () => {
    return (
        <div className={classes["main-container"]}>
            <AddCharacter/>
            <Team/>
        </div>
    )
}

export default Main;