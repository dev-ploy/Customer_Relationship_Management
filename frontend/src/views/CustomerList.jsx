import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomerService from '../api/CustomerService'
import ConfirmationModal from '../components/ConfirmationModal'
import { exportToCSV } from '../utils/helpers'

const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState(null)
  const itemsPerPage = 8
  const navigate = useNavigate()

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await CustomerService.getAllCustomers()
      setCustomers(response.data)
    } catch (err) {
      setError('Failed to load customers. Please try again later.')
      console.error('Error loading customers:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id) => {
    setCustomerToDelete(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (customerToDelete) {
      try {
        await CustomerService.deleteCustomer(customerToDelete)
        loadCustomers()
        setError(null)
      } catch (err) {
        setError('Failed to delete customer. Please try again.')
        console.error('Error deleting customer:', err)
      } finally {
        setIsModalOpen(false)
        setCustomerToDelete(null)
      }
    }
  }

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.mobileNumber?.includes(searchTerm)
    )
  }, [customers, searchTerm])

  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      const aValue = a[sortKey] || ''
      const bValue = b[sortKey] || ''
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredCustomers, sortKey, sortOrder])

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedCustomers.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedCustomers, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage)

  // Only allow delete when the user is actively searching by name
  const matchesName = (customer) => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return false
    const first = (customer.firstName || '').toLowerCase()
    const last = (customer.lastName || '').toLowerCase()
    return first.includes(q) || last.includes(q)
  }

  const SortableHeader = ({ children, sortKey: key }) => {
    const isSorted = sortKey === key
    return (
      <th 
        onClick={() => handleSort(key)}
        className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-purple-100 transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          <span>{children}</span>
          {isSorted && (
            <span className="text-indigo-600">
              {sortOrder === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </th>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-indigo-600 absolute top-0"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium text-lg">Loading customers...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Customer Management</h1>
            <p className="text-indigo-100 text-lg">Manage and organize your customer database</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl px-8 py-6 text-center">
              <p className="text-5xl font-bold">{customers.length}</p>
              <p className="text-indigo-100 mt-2">Total Customers</p>
            </div>
            <button
              onClick={() => exportToCSV(customers, 'customers-export.csv')}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-md animate-fadeIn" role="alert">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="ml-auto">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-14 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-lg"
          />
          <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {paginatedCustomers.length} of {sortedCustomers.length} customers</span>
          {searchTerm && (
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
              Filtered results
            </span>
          )}
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-16 text-center animate-scaleIn">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Customers Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding your first customer'}
          </p>
          <button
            onClick={() => navigate('/add')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold"
          >
            Add Customer
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <SortableHeader sortKey="id" onSort={handleSort} currentSortKey={sortKey} sortOrder={sortOrder}>ID</SortableHeader>
                  <SortableHeader sortKey="firstName" onSort={handleSort} currentSortKey={sortKey} sortOrder={sortOrder}>Customer</SortableHeader>
                  <SortableHeader sortKey="email" onSort={handleSort} currentSortKey={sortKey} sortOrder={sortOrder}>Contact</SortableHeader>
                  <th className="px-8 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">#{customer.id}</div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                          {customer.firstName?.charAt(0)}{customer.lastName?.charAt(0)}
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{customer.firstName} {customer.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.mobileNumber}</div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="px-4 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => navigate(`/view/${customer.id}`)} 
                          className="inline-flex items-center px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all duration-200 transform hover:scale-105 font-semibold"
                          title="View Details"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View
                        </button>
                        <button 
                          onClick={() => navigate(`/edit/${customer.id}`)} 
                          className="inline-flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-200 transform hover:scale-105 font-semibold"
                          title="Edit Customer"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        {matchesName(customer) && (
                          <button 
                            onClick={() => handleDeleteClick(customer.id)} 
                            className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200 transform hover:scale-105 font-semibold"
                            title="Delete Customer"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between bg-white rounded-2xl shadow-xl p-6">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          currentPage === pageNumber
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="px-2 text-gray-400">...</span>
                  }
                  return null
                })}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Last
                </button>
              </div>
              <div className="text-sm text-gray-600">
                {sortedCustomers.length} total results
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  )
}

export default CustomerList
