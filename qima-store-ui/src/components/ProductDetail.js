import React, { useState, useEffect } from 'react';
import { getProductById } from '../services/api';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams(); // Obtém o parâmetro 'id' da URL
    const [product, setProduct] = useState(null);

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

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <p className="category">Category: {product.category.name}</p>
            <p className="availability">Available: {product.available ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default ProductDetail;
