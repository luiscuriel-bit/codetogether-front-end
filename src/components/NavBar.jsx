import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell.jsx";
import { useContext } from "react";
import AuthedUserContext from "../context/AuthedUserContext.js";

function NavBar({ handleLogout }) {
    const token = useContext(AuthedUserContext);

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
                <div className="space-x-4">
                    <Link to="/projects" className="text-gray-700 hover:text-blue-500">
                        Projects
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <NotificationBell />
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Logout
                        </button>

                    ) : (
                        <Link to="/login" className="text-gray-700 hover:text-blue-500">Sign In</Link>

                    )}

                </div>
            </div>
        </nav>
    );
};

export default NavBar;
