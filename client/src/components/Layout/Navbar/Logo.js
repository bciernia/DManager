import classes from './Logo.module.css'
import logoImg from '../../../assets/images/logo.png'
import {NavLink} from "react-router-dom";

const Logo = props => {
    //
    // <NavLink to={`${props.linkTo}`}
    //          className={(({isActive}) => isActive ? (classes.link, classes.active) : (classes.link))}
    //          end>{props.optionName}</NavLink>
    return (
        <NavLink to={"/"}>
            <img className={classes.logo} src={logoImg} alt="Logo"/>
        </NavLink>
    )
}

export default Logo;