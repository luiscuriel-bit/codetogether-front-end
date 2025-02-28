import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Welcome to <span className="text-indigo-400">CodeTogether</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Collaborate in real-time with your team. Write code, manage projects, and build amazing things together.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/login"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
}

export default Home;