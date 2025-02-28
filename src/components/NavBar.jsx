import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell.jsx";
import { useContext } from "react";
import AuthedUserContext from "../context/AuthedUserContext.js";

function NavBar({ handleLogout }) {
    const token = useContext(AuthedUserContext);
    const isHomePage = window.location.pathname === "/";

    return (
        <nav className={`fixed w-full top-0 z-50 ${isHomePage ? "bg-transparent" : "bg-white shadow-sm"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className={`text-2xl font-bold ${isHomePage ? "text-white" : "text-gray-800"}`}>
                            Code<span className="text-indigo-500">Together</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {token && (
                            <Link
                                to="/projects"
                                className={`hover:text-indigo-500 transition-colors ${isHomePage ? "text-white" : "text-gray-600"
                                    }`}
                            >
                                Projects
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {token && <NotificationBell />}

                        {token ? (
                            <button
                                onClick={handleLogout}
                                className={`hover:text-indigo-500 ${isHomePage ? "text-white" : "text-gray-600"
                                    }`}
                            >
                                Logout
                            </button>
                        ) : (
                                <Link
                                    to="/login"
                                    className={`hover:text-indigo-500 ${isHomePage ? "text-white" : "text-gray-600"
                                        }`}
                                >
                                    Sign In
                                </Link>
                            
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );

}

export default NavBar;
