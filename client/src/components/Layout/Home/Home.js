import classes from './Home.module.css'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Outlet} from "react-router-dom";

const Home = props => {
    return (
        <section>
            <div>
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </section>
    )
}

export default Home;

