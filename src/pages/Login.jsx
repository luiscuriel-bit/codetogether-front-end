import { useState } from 'react';
import { login } from '../services/authService';

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const data = await login(form);
        console.log('Tokens:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' name='username' placeholder='Username' onChange={handleChange} />
            <input type='password' name='password' placeholder='Password' onChange={handleChange} />
            <button type='submit'>Login</button>
        </form>
    );
}

export default Login;