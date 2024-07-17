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

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <p className="description">{product.description}</p>
            <p className="price">Price: ${product.price}</p>
            <p className="category">Category: {getCategoryPath(product.categoryChain)}</p>
            <p className="availability">Available: {product.available ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default ProductDetail;
