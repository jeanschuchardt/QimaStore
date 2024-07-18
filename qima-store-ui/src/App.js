import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './components/HomePage';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';

const AppContainer = styled.div`
  font-family: 'Arial, sans-serif';
  padding: 20px;
`;

const Navbar = styled.nav`
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

const App = () => {
    return (
        <Router>
            <AppContainer>
                <Navbar>
                    <Link to="/">Home</Link>
                    <Link to="/add-product">Add Product</Link>
                </Navbar>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add-product" element={<ProductForm />} />
                    <Route path="/edit-product/:id" element={<ProductForm />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            </AppContainer>
        </Router>
    );
};

export default App;
