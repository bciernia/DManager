import MenuOption from "./MenuOption";

import classes from './Menu.module.css'

const Menu = () => {
    return (
        <nav>
            <ul className={classes.menu}>
                <MenuOption optionName="Start session" linkTo="newSession"/>
                <MenuOption optionName="DM Facilities" linkTo="dm/"/>
                <MenuOption optionName="Contact us" linkTo="contact/"/>
            </ul>
        </nav>
    )
}

export default Menu;