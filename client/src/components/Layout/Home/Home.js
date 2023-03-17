import classes from './Home.module.css'
import Menu from "../Menu/Menu";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

const Home = props => {
    return (
        <section className={classes.layout}>
            <div className={classes["layout-sidebar"]}>
                <Menu />
            </div>
            <div className={classes["layout-main"]}>
                <Main />
            </div>
            <div className={classes["layout-footer"]}>
                <Footer />
            </div>
        </section>
    )
}

export default Home;