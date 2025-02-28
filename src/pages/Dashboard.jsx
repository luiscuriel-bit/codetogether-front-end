import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthedUserContext from '../context/AuthedUserContext';
import { getUser } from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';

function Dashboard({ projects }) {
    const token = useContext(AuthedUserContext);
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUser();
                setUserData(user);
            } catch (error) {
                setErrorMessage(`Error: ${error.message}`);
            }
        };
        if (token) fetchUserData();
    }, [token]);

    if (!userData) return <p>Loading...</p>;

    return (

        <div className="min-h-screen bg-gray-50 pt-12" >
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome Back{`${userData?.first_name ? `, ${userData.first_name}` : ''}`}!
                    </h1>
                    <p className="text-xl text-gray-600">
                        Connect and Collaborate Effectively
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg min-h-[200px] flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-gray-500 mb-4">Active Projects</h3>
                        <p className="text-5xl font-bold text-indigo-600">{projects.length}</p>
                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">Your Active Projects</h2>
                            <p className="text-lg text-gray-600">
                                Collaborate and innovate with your coding projects.
                            </p>
                        </div>
                        <Link
                            to="/projects/new"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 text-lg font-semibold whitespace-nowrap"
                        >
                            + New Project
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map(project => (
                            <div
                                key={project.id}
                                className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{project.name}</h3>
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                                >
                                    Open Project
                                </Link>
                            </div>
                        ))}

                        {projects.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 space-y-6">
                                <div className="text-6xl text-gray-300">⌨️</div>
                                <p className="text-xl text-gray-500">No projects found</p>
                                <Link
                                    to="/projects/new"
                                    className="text-indigo-600 hover:text-indigo-700 font-medium text-lg flex items-center gap-2"
                                >
                                    Start your first project
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;