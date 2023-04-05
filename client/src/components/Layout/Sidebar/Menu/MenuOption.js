import classes from './MenuOption.module.css'

const MenuOption = (props) => {
    return (
        <li className={classes["menu-option"]}>
            <a href={props.linkTo}>{props.optionName}</a>
        </li>
    )
}

export default MenuOption;