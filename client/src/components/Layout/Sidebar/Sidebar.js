import classes from "./Sidebar.module.css";
import Menu from "./Menu/Menu";
import Logo from "./Logo";

const Sidebar = (props) => {
    return (
        <div className={classes.container}>
            <Logo />
            <Menu />
        </div>
    );
}

export default Sidebar;