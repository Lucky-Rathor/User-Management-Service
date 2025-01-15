import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: '',
        age: '',
        dob: '',
        image: null
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post('/api/users/register', data);
            alert('Account created successfully!');
            navigate('/');
        } catch (error) {
            alert('Error creating account.');
        }
    };

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" onChange={handleInputChange} required />
                <label>Email:</label>
                <input type="email" name="email" onChange={handleInputChange} required />
                <label>Password:</label>
                <input type="password" name="password" onChange={handleInputChange} required />
                <label>Company Name:</label>
                <input type="text" name="companyName" onChange={handleInputChange} required />
                <label>Age:</label>
                <input type="number" name="age" onChange={handleInputChange} required />
                <label>DOB:</label>
                <input type="date" name="dob" onChange={handleInputChange} required />
                <label>Upload Image:</label>
                <input type="file" name="image" onChange={handleImageChange} accept="image/png, image/jpg" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
