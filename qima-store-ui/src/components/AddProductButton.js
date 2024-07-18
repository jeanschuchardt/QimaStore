import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 20px;
    font-size: 1rem;
    background-color: #1e90ff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background-color: #1c86ee;
    }
`;

const AddProductButton = () => {
    const username = localStorage.getItem('username');
    const roles = JSON.parse(localStorage.getItem('roles')) || [];
    const isAdmin = roles.includes('ROLE_ADMIN');

    useEffect(() => {
        console.log('Username:', username);
        console.log('Roles:', roles);
        console.log('Is Admin:', isAdmin);
    }, [username, roles, isAdmin]);

    if (!username || !isAdmin) {
        return null;
    }

    return (
        <Link to="/add-product">
            <FloatingButton>Add Product</FloatingButton>
        </Link>
    );
};

export default AddProductButton;
