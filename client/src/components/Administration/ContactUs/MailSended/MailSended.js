import classes from './MailSended.module.css';
import {Link} from "react-router-dom";

const MailSended = () => {
    return (
        <div className={classes.container}>
            Thanks for contacting us, we will reply soon!
            <Link to="/administration/contact" >Send one more</Link>
            <Link to="/" >Go back</Link>
        </div>
    )
}

export default MailSended;