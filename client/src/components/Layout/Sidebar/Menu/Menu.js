import MenuOption from "./MenuOption";

import classes from './Menu.module.css'

const Menu = () => {
    return (
        <ul className={classes.menu}>
            <MenuOption optionName="Test"/>
            <MenuOption optionName="Test"/>
            <MenuOption optionName="Test"/>
            <MenuOption optionName="Test"/>
        </ul>
    )
}

export default Menu;