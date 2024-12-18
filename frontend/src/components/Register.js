import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { name, email, password });
            alert('User Registered Successfully');
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error.response.data);
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg" style={{ width: '400px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center">Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <p className="mb-0">Already have an account?</p>
                        <Link to="/" className="text-decoration-none">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
