import MenuOption from "./MenuOption";

import classes from './Menu.module.css'

const Menu = () => {
    return (
        <ul className={classes.menu}>
            <MenuOption optionName="Your teams" linkTo="/api"/>
            <MenuOption optionName="Test" />
            <MenuOption optionName="Test"/>
            <MenuOption optionName="Test"/>
            <MenuOption optionName="Test"/>
        </ul>
    )
}

export default Menu;