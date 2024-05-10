import React, { useState } from 'react';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        fetch('http://localhost:3000/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });


        setFormData({
            username: '',
            email: '',
            password: ''
        });


        localStorage.setItem('formData', JSON.stringify(formData));
        alert("Registration Successful")
    };

    return (
        <div className="flex flex-col items-center justify-center mt-8 ">
            <form className="flex flex-col items-center justify-center my-12 w-[550px] h-[550px] bg-indigo-400 px-12 rounded-lg" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="flex items-center gap-2 w-32 text-2xl font-bold mb-4">Username:</label>
                    <input className="w-96 h-12 rounded-lg px-4" type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email" className="flex items-center gap-2 w-32 text-2xl font-bold my-4">Email:</label>
                    <input className="w-96 h-12 rounded-lg px-4" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="flex items-center gap-2 w-32 text-2xl font-bold my-4">Password:</label>
                    <input className="w-96 h-12 rounded-lg px-4" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button className="btn w-32 text-2xl font-bold  text-indigo-600 my-8 rounded-lg" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;