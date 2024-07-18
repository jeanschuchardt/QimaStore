import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    color: #333;
`;

const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f1f1f1;
    }
`;

const ActionLinks = styled.div`
    a {
        margin-right: 10px;
        color: #1e90ff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const roles = JSON.parse(localStorage.getItem('roles')) || [];
    const isAdmin = roles.includes('ROLE_ADMIN');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const getCategoryPath = (categoryChain) => {
        let path = [];
        let currentCategory = categoryChain;

        while (currentCategory) {
            path.unshift(currentCategory.name);
            if (currentCategory.subcategories.length > 0) {
                currentCategory = currentCategory.subcategories[0];
            } else {
                currentCategory = null;
            }
        }

        return path.join(' > ');
    };

    return (
        <Container>
            <Title>Product List</Title>
            <ProductTable>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Available</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{getCategoryPath(product.categoryChain)}</td>
                        <td>{product.available ? 'Yes' : 'No'}</td>
                        <td>
                            <ActionLinks>
                                <Link to={`/product/${product.id}`}>View</Link>
                                {isAdmin && <Link to={`/edit-product/${product.id}`}>Edit</Link>}

                            </ActionLinks>
                        </td>
                    </tr>
                ))}
                </tbody>
            </ProductTable>
        </Container>
    );
};

export default HomePage;
