import { useState } from 'react';
import { login } from '../services/authService';

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async event => {
        try {
            event.preventDefault();
            const data = await login(form);
            console.log('Tokens:', data);
        } catch (error) {
            setError('Error logging in. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={form.username}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default Login;