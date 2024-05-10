import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logOut } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut()
        navigate('/')
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl text-indigo-700">Summer Field</Link>
            </div>
            <div className="flex gap-8 font-bold text-2xl text-indigo-700">
                <Link to="/products">Product</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/cart">Cart</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/registration">Registration</Link>
                    </>
                )}
            </div>
        </div >
    );
};

export default Navbar;