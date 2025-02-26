function Projects({projects}) {
    return (
        <div>
            <h1>Projects</h1>
            {projects.map((project) => (
                <div key={project.id}>
                    <h2>{project.name}</h2>
                </div>
            ))}
        </div>
    );
}

export default Projects;
