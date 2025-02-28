import { Link } from "react-router-dom";

function Features() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 pt-22">
            <div className="max-w-4xl mx-auto text-center py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Core Features
                </h1>
                <p className="text-gray-600">
                    Everything you need for efficient code collaboration
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    
                    <h3 className="text-xl font-semibold mb-2">Real-Time Editing</h3>
                    <p className="text-gray-600">
                        Collaborate simultaneously with your team in the same code editor.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    
                    <h3 className="text-xl font-semibold mb-2">Access Control</h3>
                    <p className="text-gray-600">
                        Manage permissions and roles for each team member.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-2">Change History</h3>
                    <p className="text-gray-600">
                        Review and restore previous code versions.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-2">Security</h3>
                    <p className="text-gray-600">
                        Secure authentication and data encryption.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-2">Code Visualization</h3>
                    <p className="text-gray-600">
                        Syntax highlighting for multiple languages.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-2">Integrations</h3>
                    <p className="text-gray-600">
                        Connect with GitHub and other tools.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Ready to Start?</h2>
                <Link
                    to="/signup"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-indigo-700"
                >
                    Create Free Account
                </Link>
            </div>
        </div>
    );
}

export default Features;