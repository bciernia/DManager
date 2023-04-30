import classes from "./Footer.module.css";
import Card from "../../UI/Card/Card";
import Timer from "../Main/SessionStarter/Timer/Timer";
import {useState} from "react";
import {Grid} from "@mui/material";
import Logo from "../Navbar/Logo";
import Menu from "../Navbar/Menu/Menu";
import MenuOption from "../Navbar/Menu/MenuOption";
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <div className={classes.container}>
            <Grid container spacing={2} sx={{alignItems: "center"}}>
                <Grid item md={10}>

                </Grid>
                <Grid item md={2}>
                    <NavLink to={'administration/contact'}
                             className={(isActive) =>
                                 isActive ? classes["contact-us__link"] : undefined}>
                        Contact us!
                    </NavLink>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer;