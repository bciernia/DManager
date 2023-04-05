import classes from "./Footer.module.css";
import Card from "../../UI/Card/Card";
import Timer from "../Main/SessionStarter/Timer/Timer";
import {useState} from "react";

const Footer = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const timerBackground = isFooterVisible || classes.footer__hidden;
    const changeFooterVisibilityBtnTitle = isFooterVisible ? 'Hide' : 'Show';

    const changeVisibilityHandler = () => {
        setIsFooterVisible(isFooterVisible => !isFooterVisible);
    }

    return (
        <div className={`${classes.container} ${timerBackground}`}>
            <button className={classes["footer__btn--changeVisibility"]} onClick={changeVisibilityHandler}>{changeFooterVisibilityBtnTitle}</button>
            <Card>
                <Timer />
            </Card>
        </div>
    )
}

export default Footer;