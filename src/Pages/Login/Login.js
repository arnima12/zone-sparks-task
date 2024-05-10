import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { handleLogin, error } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success } = handleLogin(formData);
        if (success) {
            alert('Login successful!');
            navigate('/')

        } else {
            alert('Invalid')
            setFormData({
                username: '',
                password: ''
            });
        }

    };

    return (
        <div className="flex flex-col items-center justify-center mt-8 ">
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form className="flex flex-col items-center justify-center my-12 w-[550px] h-[380px] bg-indigo-400 px-12 py-8 rounded-lg" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="flex items-center gap-2 w-32 text-2xl font-bold mb-4">Username:</label>
                    <input className="w-96 h-12 rounded-lg px-4" type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="flex items-center gap-2 w-32 text-2xl font-bold my-4">Password:</label>
                    <input className="w-96 h-12 rounded-lg px-4" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button className="btn w-32 text-2xl font-bold  text-indigo-600 my-8 rounded-lg" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;