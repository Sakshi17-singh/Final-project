import { Link } from "react-router-dom";

function About() {
    return (
    <div className="main"> 
    <h2>About page</h2>
    <a href = "/event">Event</a>
    <Link to = {"/event"}>Event</Link>
    </div>
    )
}

export default About;