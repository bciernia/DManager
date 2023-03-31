import classes from "./Main.module.css";
import Card from "../../UI/Card/Card";

const Main = props => {

    return (
        <div className={classes.container}>
            <div className={classes.session}>
                <Card className={classes.session__schedule}>
                    SCHEDULE
                </Card>
                <Card className={classes.session__notes}>
                    NOTES
                </Card>
            </div>
        </div>
    )
}

export default Main;