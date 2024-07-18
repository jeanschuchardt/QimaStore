import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

const getToken = () => localStorage.getItem('token');

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 403) {
            alert('You do not have permission to perform this action.');
        }
        return Promise.reject(error);
    }
);

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const addProduct = (product) => api.post('/products', product, {
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});
export const updateProduct = (id, product) => api.put(`/products/${id}`, product, {
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});
export const deleteProduct = (id) => api.delete(`/products/${id}`, {
    headers: {
        'Authorization': `Bearer ${getToken()}`
    }
});
