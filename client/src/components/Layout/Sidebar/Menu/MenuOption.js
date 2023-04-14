import classes from './MenuOption.module.css'
import {NavLink} from "react-router-dom";

const MenuOption = (props) => {
    return (
        <li className={classes["menu-option"]}>
            <NavLink to={`${props.linkTo}`}
                     className={({isActive}) => isActive ? classes.active : undefined}
                     >{props.optionName}</NavLink>
        </li>
    )
}

export default MenuOption;