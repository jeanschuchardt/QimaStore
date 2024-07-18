import React, { useState, useEffect } from 'react';
import { getProductById, deleteProduct } from '../services/api';
import './ProductDetail.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #1e90ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 10px;

    &:hover {
        background-color: #1c86ee;
    }

    &.delete {
        background-color: #ff4d4d;

        &:hover {
            background-color: #ff1a1a;
        }
    }
`;

const ProductDetail = () => {
    const { id } = useParams(); // Obtém o parâmetro 'id' da URL
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const roles = JSON.parse(localStorage.getItem('roles')) || [];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]); // Dependência para atualizar quando 'id' muda

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

    const handleDelete = async () => {
        try {
            await deleteProduct(id);
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    const isAdmin = roles.includes('ROLE_ADMIN');

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <p className="category">Category: {getCategoryPath(product.categoryChain)}</p>
            <p className="availability">Available: {product.available ? 'Yes' : 'No'}</p>
            {isAdmin && (
                <div>
                    <Link to={`/edit-product/${id}`}>
                        <Button>Edit</Button>
                    </Link>
                    <Button className="delete" onClick={handleDelete}>Delete</Button>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
