import classes from './Logo.module.css'
import logoImg from '../../../assets/logo/logo.png'

const Logo = props => {
    return (
            <img className={classes.logo} src={logoImg} alt="Logo"/>
    )
}

export default Logo;