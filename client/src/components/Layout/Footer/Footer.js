import classes from "./Footer.module.css";
import Card from "../../UI/Card/Card";
import Timer from "../Main/SessionStarter/Timer/Timer";

const Footer = () => {
    return (
        <div className={classes.container}>
            <Card>
                <Timer />
            </Card>
        </div>
    )
}

export default Footer;