import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/customers`;

class CustomerService {
  getAllCustomers() {
    return axios.get(API_BASE_URL);
  }

  getCustomerById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  }

  createCustomer(customer) {
    return axios.post(`${API_BASE_URL}/insert`, customer);
  }

  updateCustomer(id, customer) {
    // Backend expects PUT /api/customers with full customer object including id
    const customerWithId = { ...customer, id: parseInt(id) };
    return axios.put(API_BASE_URL, customerWithId);
  }

  deleteCustomer(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }

  insertMultipleCustomers(customers) {
    return axios.post(`${API_BASE_URL}/batch`, customers);
  }

  getCustomersByFirstName(firstName) {
    return axios.get(`${API_BASE_URL}/byname/${firstName}`);
  }

  getCustomersByLastName(lastName) {
    return axios.get(`${API_BASE_URL}/bylastName/${lastName}`);
  }

  getCustomersByEmail(email) {
    return axios.get(`${API_BASE_URL}/byemail/${email}`);
  }

  getCustomersByPhoneNumber(phoneNumber) {
    return axios.get(`${API_BASE_URL}/bymobile/${phoneNumber}`);
  }

  getCustomersByAge(age) {
    return axios.get(`${API_BASE_URL}/byage/${age}`);
  }

  getCustomersByLessThanAge(age) {
    return axios.get(`${API_BASE_URL}/bylessthanage/${age}`);
  }

  // Individual field update methods matching backend endpoints
  updateFirstName(id, firstName) {
    return axios.put(`${API_BASE_URL}/${id}`, { firstName });
  }

  updateLastName(id, lastName) {
    return axios.put(`${API_BASE_URL}/lname/${id}`, { lastName });
  }

  updateEmail(id, email) {
    return axios.put(`${API_BASE_URL}/email/${id}`, { email });
  }

  updatePhoneNumber(id, mobileNumber) {
    return axios.put(`${API_BASE_URL}/mobilenumber/${id}`, { mobileNumber });
  }

  updateAge(id, age) {
    return axios.put(`${API_BASE_URL}/age/${id}`, { age });
  }

  getAllFirstNames() {
    return axios.get(`${API_BASE_URL}/firstNames`);
  }
}

export default new CustomerService();
