import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const stored = localStorage.getItem('shopkart_user');
  if (stored) {
    const user = JSON.parse(stored);
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data)
};

export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getOne: (id) => API.get(`/products/${id}`),
  seed: () => API.post('/products/seed')
};

export const cartAPI = {
  get: () => API.get('/cart'),
  add: (data) => API.post('/cart/add', data),
  update: (data) => API.put('/cart/update', data),
  remove: (productId) => API.delete(`/cart/remove/${productId}`),
  clear: () => API.delete('/cart/clear')
};

export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getMyOrders: () => API.get('/orders/myorders'),
  getOne: (id) => API.get(`/orders/${id}`)
};

export default API;
