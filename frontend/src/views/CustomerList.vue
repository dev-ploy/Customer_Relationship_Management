<template>
  <div class="container mx-auto px-4 py-8 animate-fadeIn">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Customer Management
          </h1>
          <p class="text-gray-600">Manage and organize your customer relationships</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="bg-white rounded-lg shadow-lg px-6 py-3 border-l-4 border-indigo-600">
            <p class="text-sm text-gray-600">Total Customers</p>
            <p class="text-2xl font-bold text-indigo-600">{{ customers.length }}</p>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div class="bg-white rounded-xl shadow-xl p-6 mb-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-700">Search Customers</h3>
        </div>
        <div class="flex flex-col md:flex-row gap-4">
          <select
            v-model="searchType"
            class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
          >
            <option value="firstName">👤 First Name</option>
            <option value="lastName">👤 Last Name</option>
            <option value="email">📧 Email</option>
            <option value="phoneNumber">📱 Phone Number</option>
            <option value="age">🎂 Age</option>
          </select>
          <div class="relative flex-1">
            <input
              v-model="searchTerm"
              type="text"
              :placeholder="`Search by ${searchType}...`"
              class="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              @keypress.enter="handleSearch"
            />
            <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            @click="handleSearch"
            class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
          >
            Search
          </button>
          <button
            @click="fetchCustomers"
            class="px-8 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Messages -->
      <transition name="slide-fade">
        <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-4 shadow-lg flex items-center animate-slideDown">
          <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">{{ error }}</span>
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="deleteMessage" class="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-4 shadow-lg flex items-center animate-slideDown">
          <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="font-medium">{{ deleteMessage }}</span>
        </div>
      </transition>

      <!-- Loading Spinner -->
      <div v-if="loading" class="flex flex-col justify-center items-center h-64 bg-white rounded-xl shadow-xl">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0"></div>
        </div>
        <p class="mt-4 text-gray-600 font-medium">Loading customers...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="customers.length === 0" class="bg-white rounded-xl shadow-xl p-12 text-center">
        <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="text-2xl font-bold text-gray-700 mb-2">No customers found</h3>
        <p class="text-gray-500 mb-6">Start by adding your first customer to the system</p>
        <button @click="$router.push('/add')" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
          Add First Customer
        </button>
      </div>

      <!-- Customer Table -->
      <div v-else class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">ID</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">First Name</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Last Name</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Phone</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Age</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="customer in customers" :key="customer.id" class="hover:bg-indigo-50 transition-all duration-200 transform hover:scale-[1.01]">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full">
                    #{{ customer.id }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">{{ customer.firstName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">{{ customer.lastName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center text-sm text-gray-700">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ customer.email }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center text-sm text-gray-700">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ customer.mobileNumber }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
                    {{ customer.age }} years
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button 
                    @click="handleView(customer.id)" 
                    class="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button 
                    @click="handleEdit(customer.id)" 
                    class="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click="handleDelete(customer.id)" 
                    class="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from '../api/CustomerService'

export default {
  name: 'CustomerList',
  data() {
    return {
      customers: [],
      loading: true,
      error: '',
      searchTerm: '',
      searchType: 'firstName',
      deleteMessage: ''
    }
  },
  mounted() {
    this.fetchCustomers()
  },
  methods: {
    fetchCustomers() {
      this.loading = true
      this.error = ''
      CustomerService.getAllCustomers()
        .then((response) => {
          this.customers = response.data
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching customers:', error)
          this.error = 'Failed to fetch customers. Please try again.'
          this.loading = false
        })
    },
    handleSearch() {
      if (!this.searchTerm) {
        this.fetchCustomers()
        return
      }

      this.loading = true
      this.error = ''

      let searchPromise

      switch (this.searchType) {
        case 'firstName':
          searchPromise = CustomerService.getCustomersByFirstName(this.searchTerm)
          break
        case 'lastName':
          searchPromise = CustomerService.getCustomersByLastName(this.searchTerm)
          break
        case 'email':
          searchPromise = CustomerService.getCustomersByEmail(this.searchTerm)
          break
        case 'phoneNumber':
          searchPromise = CustomerService.getCustomersByPhoneNumber(this.searchTerm)
          break
        case 'age':
          searchPromise = CustomerService.getCustomersByAge(parseInt(this.searchTerm))
          break
        default:
          searchPromise = CustomerService.getAllCustomers()
      }

      searchPromise
        .then((response) => {
          this.customers = response.data
          this.loading = false
        })
        .catch((error) => {
          console.error('Error searching customers:', error)
          this.error = 'Failed to search customers. Please try again.'
          this.loading = false
        })
    },
    handleDelete(id) {
      if (confirm('Are you sure you want to delete this customer?')) {
        CustomerService.deleteCustomer(id)
          .then((response) => {
            this.deleteMessage = response.data
            this.fetchCustomers()
            setTimeout(() => {
              this.deleteMessage = ''
            }, 3000)
          })
          .catch((error) => {
            console.error('Error deleting customer:', error)
            this.error = 'Failed to delete customer. Please try again.'
          })
      }
    },
    handleEdit(id) {
      this.$router.push(`/edit/${id}`)
    },
    handleView(id) {
      this.$router.push(`/view/${id}`)
    }
  }
}
</script>
