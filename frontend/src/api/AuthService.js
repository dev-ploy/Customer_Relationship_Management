import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/auth`;

class AuthService {
  // User login
  login(credentials) {
    return axios.post(`${API_BASE_URL}/login`, credentials);
  }

  // User signup/registration
  signup(userData) {
    return axios.post(`${API_BASE_URL}/signup`, userData);
  }

  // User logout
  logout() {
    return axios.post(`${API_BASE_URL}/logout`);
  }

  // Get current user
  getCurrentUser() {
    return axios.get(`${API_BASE_URL}/me`);
  }

  // Store token in localStorage
  setToken(token) {
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Store user info
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get user info
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Remove user info
  removeUser() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
