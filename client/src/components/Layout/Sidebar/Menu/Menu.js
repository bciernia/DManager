import MenuOption from "./MenuOption";

import classes from './Menu.module.css'

const Menu = () => {
    return (
        <nav>
            <ul className={classes.menu}>
                <MenuOption optionName="Start session" linkTo="session/newSession"/>
                <MenuOption optionName="Create new team" linkTo="teams/newTeam"/>
                <MenuOption optionName="All teams" linkTo="teams"/>
                <MenuOption optionName="Session history" linkTo="session/all"/>
                <MenuOption optionName="DM Facilities" linkTo="dm/"/>
            {/*TODO add Character options to menu when user is in teams context*/}
            </ul>
        </nav>
    )
}

export default Menu;