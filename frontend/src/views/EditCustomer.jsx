import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CustomerService from '../api/CustomerService'

const EditCustomer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    age: ''
  })

  useEffect(() => {
    loadCustomer()
  }, [id])

  const loadCustomer = async () => {
    try {
      setLoading(true)
      console.log('Loading customer with ID:', id)
      const response = await CustomerService.getCustomerById(id)
      console.log('Loaded customer data:', response.data)
      setCustomer(response.data)
    } catch (err) {
      console.error('Error loading customer:', err)
      setError('Error loading customer')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate form data
    if (!customer.firstName || !customer.lastName || !customer.email || !customer.mobileNumber || !customer.age) {
      setError('Please fill in all fields')
      return
    }

    const updatingToast = document.createElement('div')
    updatingToast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    updatingToast.textContent = 'Updating customer...'
    document.body.appendChild(updatingToast)

    try {
      console.log('Updating customer with ID:', id)
      console.log('Customer data being sent:', customer)
      console.log('API URL:', `http://localhost:8080/api/customers/${id}`)
      
      const response = await CustomerService.updateCustomer(id, customer)
      console.log('Update response status:', response.status)
      console.log('Update response data:', response.data)
      
      document.body.removeChild(updatingToast)
      
      const successToast = document.createElement('div')
      successToast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
      successToast.textContent = '✓ Customer updated successfully!'
      document.body.appendChild(successToast)
      
      setTimeout(() => {
        document.body.removeChild(successToast)
        navigate('/customers')
      }, 1500)
      
    } catch (err) {
      console.error('Update error:', err)
      console.error('Error response:', err.response)
      
      if (updatingToast.parentNode) {
        document.body.removeChild(updatingToast)
      }
      
      setError(err.response?.data?.message || err.message || 'Error updating customer. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-200"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-green-600 absolute top-0"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium text-lg">Loading customer details...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 animate-scaleIn">
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-full p-3 mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Edit Customer</h2>
              <p className="text-gray-600 mt-1">Update customer information</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-center shadow-lg animate-slideDown">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={customer.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={customer.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-300"
                placeholder="Enter email address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={customer.mobileNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 hover:border-pink-300"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={customer.age}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                  placeholder="Enter age"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Update Customer
              </button>
              <button
                type="button"
                onClick={() => navigate('/customers')}
                className="flex-1 bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCustomer
