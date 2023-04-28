import {Link} from "react-router-dom";
import classes from './ErrorPage.module.css';
import errorImg from '../assets/images/errorpageimg.png';

const ErrorPage = () => {
    //TODO error page is displayed t

    return (
        <div>
            <div className={classes.test}>
                <h1>Something gone wrong</h1>
                <p>Page does not exist.</p>
                <img src={errorImg} />
                <Link to="/" >Go back</Link>
            </div>
        </div>
    )
}

export default ErrorPage;