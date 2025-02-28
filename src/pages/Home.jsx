import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b pt-` from-gray-900 to-gray-800 text-white">
            <section className="min-h-screen flex items-center">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                        Collaborate in Real-Time, <span className="text-indigo-400">Code Together</span> Effortlessly
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Experience seamless coding collaboration with CodeTogether. Work alongside your team in real-time, enhancing productivity and creativity like never before.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link
                            to="/signup"
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/features"
                            className="bg-transparent border-2 border-indigo-600 text-indigo-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 hover:text-white transition-colors"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>


            <section className="min-h-screen bg-gray-800 flex items-center py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Unlock the Power of Real-Time Collaboration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Collaborate</h3>
                            <p className="text-gray-300">CodeTogether enables seamless teamwork by allowing developers to edit code together in real-time.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Instant</h3>
                            <p className="text-gray-300">Edit code live with your teammates, with no delays or interruptions.</p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Integrated</h3>
                            <p className="text-gray-300">Connect directly with your team easy and efficient project management.</p>
                        </div>
                    </div>
                </div>
            </section>


            <div className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Start Collaborating Effortlessly Today</h2>
                    <p className="text-xl text-gray-300 mb-8">Experience seamless coding collaboration with CodeTogether. Join us and elevate your projects!</p>
                    <Link
                        to="/signup"
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Sign Up Now
                    </Link>
                </div>
            </div>


            <footer className="bg-gray-900 py-10 mt-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="text-2xl font-bold mb-4">
                        <span className="text-indigo-400">Code</span>Together
                    </div>

                    <p className="text-gray-400">&copy; {new Date().getFullYear()} CodeTogether. All rights reserved.</p>
                </div>
            </footer>
        </div >
    );
}

export default Home;
