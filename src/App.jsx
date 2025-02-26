import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectForm from "./components/ProjectForm";
import * as projectService from "./services/projectService";
import * as authService from "./services/authService";
import { useEffect, useState } from "react";
import AuthedUserContext from "./context/AuthedUserContext.js";
import ProjectDetail from "./components/ProjectDetail";
import NavBar from "./components/NavBar";
import CodeEditor from "./components/CodeEditor";


function App() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const projectsData = await projectService.fetchProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, []);

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
        navigate("/");
    };
    return (
        <>
            <AuthedUserContext.Provider value={token}>
                {token && <NavBar handleLogout={handleLogout} />}
                <Routes>
                    {token ? (
                        <>
                            <Route path="/projects" element={<Projects projects={projects} />} />
                            <Route path="/projects/new" element={<ProjectForm />} />
                            <Route
                                path="/projects/:id"
                                element={<ProjectDetail />}
                            />
                            <Route
                                path="/projects/:id/edit"
                                element={<CodeEditor />}
                            />
                        </>
                    ) : (
                        <Route path="/login" element={<Login setToken={setToken} />} />
                    )}
                    <Route path="/" element={<Home />} />
                </Routes>
            </AuthedUserContext.Provider>
        </>
    );
}

export default App;
