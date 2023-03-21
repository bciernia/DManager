import classes from './MenuOption.module.css'

const MenuOption = (props) => {
    return (
        <li className={classes["menu-option"]}>{props.optionName}</li>
    )
}

export default MenuOption;