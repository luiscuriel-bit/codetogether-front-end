import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import Projects from './pages/Projects'
import ProjectForm from './components/ProjectForm';
import * as projectService from './services/projectService';
import * as authService from './services/authService';
import { useEffect, useState } from 'react';

function App() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    const [projects, setProjects] = useState([]);

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
        setProjects([...Projects, newProject]);
        navigate('/projects');
    };

    const handleLogout = () => {
		authService.logout();
		setToken(null);
	};

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/projects' element={<Projects projects={projects} />} />
            <Route path='/projects/new' element={<ProjectForm handleAddProject={handleAddProject} />} />
        </Routes>

    );
}

export default App;



