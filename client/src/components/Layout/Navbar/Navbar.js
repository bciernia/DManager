import classes from "./Navbar.module.css";
import Menu from "./Menu/Menu";
import Logo from "./Logo";
import {Grid} from "@mui/material";
import {useState} from "react";

const Navbar = (props) => {
    //TODO secondary menu which will appear under main menu
    const [secondaryMenu, setSecondaryMenu] = useState(false);

    return (
        <div className={classes.container}>
            <Grid container spacing={2} sx={{alignItems: "center"}}>
                <Grid item md={2}>
                    <Logo/>
                </Grid>
                <Grid item md={8}>
                    <Menu/>
                </Grid>
                <Grid item md={2}>
                </Grid>
            </Grid>
        </div>
    );
}

export default Navbar;