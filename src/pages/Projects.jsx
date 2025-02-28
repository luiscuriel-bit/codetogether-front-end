import { Link } from "react-router-dom";

function Projects({projects}) {
    // return (
    //     <div>
    //         <h1>Projects</h1>
    //         {projects.map((project) => (
    //             <div key={project.id}>
    //                 <h2>{project.name}</h2>
    //             </div>
    //         ))}
    //     </div>
    // );
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
                    <Link 
                        to="/projects/new" 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                    >
                        New Project
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div 
                            key={project.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                            <Link 
                                to={`/projects/${project.id}`}
                                className="text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Open Project →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;
