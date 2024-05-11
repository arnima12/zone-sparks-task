import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(true);
    };
    const handleLogout = () => {
        logOut()
        navigate('/')
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl text-indigo-700">Summer Field</Link>
            </div>
            <div className="flex gap-8 font-bold text-2xl text-indigo-700 md:hidden">

                {isMenuOpen ? (
                    <div className="dropdown dropdown-hover dropdown-end">
                        <div tabIndex={0} role="button" className="m-1" onClick={toggleMenu}>☰</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex gap-4">
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
                        </ul>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className={`hidden md:flex md:gap-8 md:font-bold md:text-2xl md:text-indigo-700 ${isMenuOpen ? 'flex' : 'hidden'}`}>
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