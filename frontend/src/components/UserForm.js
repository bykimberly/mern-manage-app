import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserForm = ({ onUserAdded, onUserUpdated, selectedUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (selectedUser) {
        setName(selectedUser.name || '');
        setEmail(selectedUser.email || '');
        } else {
        setName('');
        setEmail('');
        }
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                name,
                email,
            });
            console.log(response.data);
            setName('');    // wipes name & email after successful submission
            setEmail('');
            if (onUserAdded) onUserAdded();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedUser || !selectedUser._id) {
            console.warn('No user selected to update');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:5000/api/users/' + selectedUser._id,
                { name, email }
            );
            console.log('User updated:', response.data);
        if (onUserUpdated) onUserUpdated();
        setName('');
        setEmail('');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <form id='userform' onSubmit={handleSubmit}>
            <div className='form-row'>
                <div className='form-input'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        placeholder='Enter name'
                        autoComplete='off'
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='form-input'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder='Enter email'
                        autoComplete='off'
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit">Add</button>
            <button type="button" onClick={handleUpdate} disabled={!selectedUser}>
                Update
            </button>
        </form>
    );
};

export default UserForm;