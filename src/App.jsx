import { Route, Routes, useNavigate } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import ProjectForm from "./components/ProjectForm";
import * as projectService from "./services/projectService";
import * as authService from "./services/authService";
import { useEffect, useState } from "react";
import AuthedUserContext from "./context/AuthedUserContext.js";
import ProjectDetail from "./components/ProjectDetail";
import NavBar from "./components/NavBar";
import CodeEditor from "./components/CodeEditor";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Features from "./pages/Features.jsx";

function App() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const projectsData = await projectService.fetchProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error(error);
            }
        };
        if (token) fetchUserProjects();
    }, [token]);

    const handleLogout = () => {
        authService.logout();
        setToken(null);
        navigate("");
    };

    return (
        <>
            <AuthedUserContext.Provider value={token}>
                <NavBar handleLogout={handleLogout} />
                <Routes>
                    {token ? (
                        <>
                            <Route path="/" element={<Dashboard projects={projects} />} />
                            <Route path="/projects/new" element={<ProjectForm />} />
                            <Route
                                path="/projects/:id"
                                element={<ProjectDetail />}
                            />
                            <Route
                                path="/projects/:id/edit"
                                element={<CodeEditor />}
                            />
                            <Route
                                path="/profile"
                                element={<Profile />}
                            />
                            <Route
                                path="/profile/edit"
                                element={<EditProfile />}
                            />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<AuthForm setToken={setToken} isLogin={true} />} />
                            <Route path="/signup" element={<AuthForm setToken={setToken} isLogin={false} />} />
                        </>
                    )}
                    <Route path="/features" element={<Features />} />
                </Routes>
            </AuthedUserContext.Provider>
        </>
    );
}

export default App;
