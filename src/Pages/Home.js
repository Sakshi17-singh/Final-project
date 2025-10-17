import { Link } from "react-router-dom";

function Home() {
    return (
    <div className="main"> 
    <h2>Home page</h2>
    <Link to = {"/about"}>About</Link>
    <Link to = {"/event"}>Event</Link>
    </div>
    )
}

export default Home;