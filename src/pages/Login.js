import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errs = {};
        if (!email) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email format';
        if (!password) errs.password = 'Password is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        axios.post('http://localhost:5000/login', { email, password })
            .then((res) => {
                console.log(res)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userid', res.data.userID);
                localStorage.setItem('username', res.data.username);
                navigate('/dashboard');
            })
            .catch((err) => {
                alert('Login failed. Please check your credentials.');
            })
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg border border-blue-500 shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-2 p-2 rounded bg-gray-700 text-white border border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full mb-2 p-2 rounded bg-gray-700 text-white border border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="absolute right-3 top-2 text-sm text-blue-300 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded">
                    Login
                </button>
                <button
                    type="button"
                    className="w-full border border-blue-500 hover:bg-blue-700 text-blue-300 hover:text-white py-2 rounded mt-2"
                    onClick={() => navigate('/register')}
                >
                    Register
                </button>
            </motion.form>
        </div>
    );
}

export default Login;
