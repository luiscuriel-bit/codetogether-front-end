import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell.jsx";

const NavBar = ({ handleLogout }) => {
    return (
        <nav>
            <div>
                <Link to="/">Home</Link>
                <Link to="/projects" aria-label="Projects">Projects</Link>
            </div>
            <div>
                <NotificationBell />
                <button onClick={handleLogout} aria-label="Logout">Logout</button>
            </div>
        </nav>
    );
};

export default NavBar;
