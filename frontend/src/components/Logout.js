import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="btn btn-sm btn-danger">
            Logout
        </button>
    );
};

export default Logout;
