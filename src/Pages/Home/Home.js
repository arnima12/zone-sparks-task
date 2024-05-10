import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Summer Field</h1>
                    <p className="mt-8">Discover the latest trends and exclusive deals</p>
                    <Link to="/products" className="btn bg-indigo-400 mt-8 rounded-lg text-white">Shop Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;