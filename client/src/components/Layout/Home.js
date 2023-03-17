import classes from './Home.module.css'

const Home = props => {
    return (
        <div className={classes.test}>
            {props.children}
        </div>
    )
}

export default Home;