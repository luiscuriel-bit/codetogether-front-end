import { useState } from "react";
import { createProject } from "../services/projectService";

function ProjectForm() {
    const [form, setForm] = useState({ name: "", code: "" });
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (event) => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setErrorMessage(null);
            await createProject(form);
            setForm({ name: "", code: "" });
        } catch (error) {
            setErrorMessage(`Error creating project: ${error.message}`);
        }
    };

    return (
        <>
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Project Name:</label>
                <input id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={form.name}
                />

                <label htmlFor="code">Code:</label>
                <input id="code"
                    type="text"
                    name="code"
                    onChange={handleChange}
                    value={form.code}
                />
                <button type="submit">Create Project</button>
            </form>
        </>
    );
}

export default ProjectForm;
