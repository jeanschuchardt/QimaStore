import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getProductById, addProduct, updateProduct } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
    padding: 20px;
    width: 400px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    color: #333;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 90%;
`;

const Select = styled.select`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 95%;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: #333;
    font-weight: bold;
`;

const CheckboxInput = styled.input`
    margin-right: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #1e90ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #1c86ee;
    }
`;

const ProductForm = () => {
    const [product, setProduct] = useState({ name: '', description: '', price: '', categoryChain: { id: '' }, available: false });
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "categoryChain.id") {
            setProduct(prevProduct => ({
                ...prevProduct,
                categoryChain: {
                    ...prevProduct.categoryChain,
                    id: value
                }
            }));
        } else {
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            categoryId: product.categoryChain.id,
            price: parseFloat(product.price)  // Ensuring the price is a decimal number
        };

        const submitFunction = id ? updateProduct : addProduct;
        const submitArgs = id ? [id, updatedProduct] : [updatedProduct];

        submitFunction(...submitArgs)
            .then(() => navigate('/'))
            .catch(error => console.error('Error saving product:', error));
    };

    return (
        <FormContainer>
            <FormTitle>{id ? 'Edit Product' : 'Add Product'}</FormTitle>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type="text" name="name" value={product.name} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Description:</Label>
                    <Input type="text" name="description" value={product.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Price:</Label>
                    <Input type="number" step="0.01" name="price" value={product.price} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Category:</Label>
                    <Select name="categoryChain.id" value={product.categoryChain.id} onChange={handleChange}>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <CheckboxLabel>
                        <CheckboxInput type="checkbox" name="available" checked={product.available} onChange={handleChange} />
                        Available
                    </CheckboxLabel>
                </FormGroup>
                <Button type="submit">{id ? 'Update' : 'Save'}</Button>
            </Form>
        </FormContainer>
    );
};

export default ProductForm;
