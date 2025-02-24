import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import Projects from './pages/Projects'
import ProjectForm from './components/ProjectForm';
import * as projectService from './services/projectService';
import * as authService from './services/authService';
import { createContext, useEffect, useState } from 'react';
import ProjectDetail from './components/ProjectDetail';
import NavBar from './components/NavBar';

export const AuthedUserContext = createContext(null);

function App() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const savedToken = localStorage.getItem("access_token");
        if (savedToken) setToken(savedToken);
    }, []);


    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const projectsData = await projectService.fetchProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error(error);
            }
        }
        if (token) fetchUserProjects();
    }, [token]);

    const handleAddProject = async projectFormData => {
        const newProject = await projectService.createProject(projectFormData);
        setProjects([...projects, newProject]);
        navigate('/projects');
    };

    const handleLogout = () => {
        authService.logout();
        setToken(null);
        navigate('/');
    };

    return <>
        <AuthedUserContext.Provider value={token}>
            {token && <NavBar handleLogout={handleLogout} />}
            <Routes>
                {token ? (
                    <>
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/new" element={<ProjectForm />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                    </>
                ) : (
                    <Route path="/login" element={<Login />} />
                )}
                <Route path="/" element={<Home />} />
            </Routes>
        </AuthedUserContext.Provider>


    </>;
}

export default App;



