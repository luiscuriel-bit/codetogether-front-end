import { useEffect, useState } from "react";
import { login, signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

function AuthForm({ isLogin = true, setToken }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
    });
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
            const userData = isLogin ? await login(form) : await signup(form);
            if (userData) {
                setToken(userData);
                navigate("/");
            } else {
                setErrorMessage("Wrong credentials");
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
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

            if (!isLogin && !form.email?.trim()) {
                validations.email = "Email is required";
            }

            if (!form.password) {
                validations.password = "Password is required";
            }

            setInvalidFields(validations);
        }
    };

    useEffect(isFormInvalid, [form, isLogin]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && <>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-2 border rounded"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {touchedFields.email && invalidFields.email && (
                                <p className="text-red-500 text-sm mt-1">{invalidFields.email}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                className="w-full p-2 border rounded"
                                value={form.first_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                className="w-full p-2 border rounded"
                                value={form.last_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </>}
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full p-2 border rounded"
                            value={form.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {touchedFields.username && invalidFields.username && (
                            <p className="text-red-500 text-sm mt-1">{invalidFields.username}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {touchedFields.password && invalidFields.password && (
                            <p className="text-red-500 text-sm mt-1">{invalidFields.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
                        disabled={isSubmitting}
                    >
                        {isLogin ? "Sign In" : "Create Account"}
                    </button>
                </form>

                {errorMessage && <ErrorMessage message={errorMessage} />}

            </div>
        </div>

    );
}

export default AuthForm;
