import { useEffect, useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

function Login({ setToken }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidFields, setInvalidFields] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    const handleChange = (event) => {
        setForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleBlur = (event) =>
        setTouchedFields({ ...touchedFields, [event.target.name]: true });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.keys(invalidFields).length) return;
        setIsSubmitting(true);

        try {
            const userData = await login(form);
            if (userData) {
                setToken(userData);
                navigate("/projects");
            } else {
                setErrorMessage("Wrong credentials");
            }
        } catch (error) {
            setErrorMessage("Error logging in:", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormInvalid = () => {
        if (Object.keys(form).length) {
            const validations = {};

            if (!form.username?.trim()) {
                validations.username = "Username is required";
            }

            if (!form.password) {
                validations.password = "Password is required";
            }

            setInvalidFields(validations);
        }
    };

    useEffect(isFormInvalid, [form]);

    // return (
    //     <>
    //         {errorMessage && <ErrorMessage message={errorMessage} />}
            
    //         <form onSubmit={handleSubmit}>
    //             <input
    //                 type="text"
    //                 name="username"
    //                 className={`form-control ${touchedFields.password && invalidFields.password ? "is-invalid" : ""}`}
    //                 placeholder="Username"
    //                 onChange={handleChange}
    //                 onBlur={handleBlur}
    //                 value={form.username}
    //                 required
    //             />
    //             <input
    //                 type="password"
    //                 name="password"
    //                 className={`form-control ${touchedFields.password && invalidFields.password ? "is-invalid" : ""}`}
    //                 placeholder="Password"
    //                 onChange={handleChange}
    //                 onBlur={handleBlur}
    //                 value={form.password}
    //                 required
    //             />
    //             {touchedFields.password && invalidFields.password && (
    //                 <div className="invalid-feedback">{invalidFields.password}</div>
    //             )}
    //             <div>
    //                 <button
    //                     type="submit"
    //                     disabled={Object.keys(invalidFields).length || isSubmitting}
    //                 >
    //                     {isSubmitting ? "Signing in..." : "Sign In"}
    //                 </button>
    //                 <Link to="/">Cancel</Link>
    //             </div>
    //         </form>
    //     </>
    // );
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sign In</h2>
                
                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className={`w-full px-4 py-3 border ${
                                touchedFields.username && invalidFields.username 
                                    ? "border-red-500" 
                                    : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="Enter your username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.username}
                        />
                        {touchedFields.username && invalidFields.username && (
                            <p className="mt-1 text-sm text-red-600">{invalidFields.username}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className={`w-full px-4 py-3 border ${
                                touchedFields.password && invalidFields.password 
                                    ? "border-red-500" 
                                    : "border-gray-300"
                            } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.password}
                        />
                        {touchedFields.password && invalidFields.password && (
                            <p className="mt-1 text-sm text-red-600">{invalidFields.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={Object.keys(invalidFields).length || isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Signing in...
                            </div>
                        ) : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
