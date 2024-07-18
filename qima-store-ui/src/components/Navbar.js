import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    background-color: #333;
    padding: 10px;
    border-radius: 5px;

    a {
        color: white;
        text-decoration: none;
        padding: 0 10px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const UsernameDisplay = styled.div`
    color: white;
`;

const Navbar = ({ username }) => {
    const navigate = useNavigate();
    const roles = JSON.parse(localStorage.getItem('roles')) || [];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('roles');
        navigate('/login');
    };

    return (
        <NavbarContainer>
            <div>
                <Link to="/">Home</Link>
                {!username && <Link to="/login">Login</Link>}
            </div>
            {username && (
                <div>
                    <UsernameDisplay>
                        Welcome, {username} ({roles.join(', ')})
                    </UsernameDisplay>
                    <button
                        onClick={handleLogout}
                        style={{
                            marginLeft: '10px',
                            color: 'white',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </NavbarContainer>
    );
};

export default Navbar;
