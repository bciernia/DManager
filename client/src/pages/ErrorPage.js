import Home from "../components/Layout/Home/Home";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <Home isError={true}/>
            <h1>Something gone wrong</h1>
            <p>Page does not exist.</p>
            <Link >Go back</Link>
        </div>
    )
}

export default ErrorPage;