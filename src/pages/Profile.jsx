import { useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";
import AuthedUserContext from "../context/AuthedUserContext";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const token = useContext(AuthedUserContext);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await authService.getUser();
                setUser(userData);
            } catch (error) {
                setErrorMessage(`Error: ${error.message}`);
            }
        };
        if (token) fetchUserData();
    }, [token]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                {errorMessage && <ErrorMessage message={errorMessage} />}


                {user ? (
                    <div className="space-y-4">
                        <div>
                            <label className="font-medium">Username:</label>
                            <p>{user.username}</p>
                        </div>

                        {user.first_name && (<div>
                            <label className="font-medium">First Name:</label>
                            <p>{user.first_name}</p>
                        </div>)}

                        {user.last_name && (<div>
                            <label className="font-medium">Last Name:</label>
                            <p>{user.last_name}</p>
                        </div>)}

                        <div>
                            <label className="font-medium">Email:</label>
                            <p>{user.email}</p>
                        </div>

                        <Link
                            to={`/profile/edit`}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Edit Profile
                        </Link>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
}

export default Profile;