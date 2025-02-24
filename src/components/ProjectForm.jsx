import { useState } from 'react';
import axios from 'axios';
import { createProject } from '../services/projectService';

function ProjectForm({ setProject }) {
    const [form, setForm] = useState({ name: '', description: '' });
    const [error, setError] = useState('');

    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async event => {
        try {
            event.preventDefault();
            setError(null)
            const data = await createProject(form);
            setProject(data);
            setForm({ name: '', description: '' });
        } catch (error) {
            setError('Error creating project. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Project Name"
                onChange={handleChange}
                value={form.name}
            />
            <input
                type="text"
                name="description"
                placeholder="Project Description"
                onChange={handleChange}
                value={form.description}
            />
            <button type="submit">Create Project</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default ProjectForm;