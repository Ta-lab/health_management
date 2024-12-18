import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
            dispatch(login({ user: response.data.user, token: response.data.token, isAuthenticated: response.data.isAuthenticated }));
            alert('Login successful!');
            // navigate('/post-list');
            navigate('/health');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0">Don't have an account?</p>
                    <Link to="/register" className="text-decoration-none">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
