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
                // navigate("/projects");
            } else {
                setErrorMessage("Wrong credentials");
            }
        } catch (error) {
            setErrorMessage(error.message);
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

    return (
        <>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    className={`form-control ${touchedFields.password && invalidFields.password ? "is-invalid" : ""}`}
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={form.username}
                    required
                />
                <input
                    type="password"
                    name="password"
                    className={`form-control ${touchedFields.password && invalidFields.password ? "is-invalid" : ""}`}
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={form.password}
                    required
                />
                {touchedFields.password && invalidFields.password && (
                    <div className="invalid-feedback">{invalidFields.password}</div>
                )}
                <div>
                    <button
                        type="submit"
                        disabled={Object.keys(invalidFields).length || isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                    <Link to="/">Cancel</Link>
                </div>
            </form>
        </>
    );
}

export default Login;
