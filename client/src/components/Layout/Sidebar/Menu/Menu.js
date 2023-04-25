import MenuOption from "./MenuOption";

import classes from './Menu.module.css'

const Menu = () => {
    return (
        <nav>
            {/* TODO change this list to Nested list from MUI */}
            <ul className={classes.menu}>
                <MenuOption optionName="Start session" linkTo="newSession"/>
                <MenuOption optionName="Session history" linkTo="session/all"/>
                <MenuOption optionName="DM Facilities" linkTo="dm/"/>
            {/*TODO add Character options to menu when user is in teams context*/}
            </ul>
        </nav>
    )
}

export default Menu;