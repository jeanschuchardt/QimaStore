import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './components/HomePage';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import AddProductButton from './components/AddProductButton'; // Import the new component

const AppContainer = styled.div`
    font-family: 'Arial, sans-serif';
    padding: 20px;
`;

const App = () => {
    const username = localStorage.getItem('username');

    return (
        <Router>
            <AppContainer>
                <Navbar username={username} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add-product" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
                    <Route path="/edit-product/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <AddProductButton /> {/* Add the floating button */}
            </AppContainer>
        </Router>
    );
};

export default App;
