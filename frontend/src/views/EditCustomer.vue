<template>
  <div class="container mx-auto px-4 py-8 animate-fadeIn">
    <div class="max-w-3xl mx-auto">
      <div v-if="loading" class="flex flex-col justify-center items-center h-64 bg-white rounded-2xl shadow-2xl">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0"></div>
        </div>
        <p class="mt-4 text-gray-600 font-medium">Loading customer details...</p>
      </div>

      <div v-else class="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 animate-scaleIn">
        <div class="flex items-center mb-8">
          <div class="bg-gradient-to-r from-green-600 to-teal-600 rounded-full p-3 mr-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Edit Customer</h2>
            <p class="text-gray-600 mt-1">Update customer information</p>
          </div>
        </div>

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {{ success }}
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">Customer ID</label>
            <input
              v-model="customer.id"
              type="text"
              disabled
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                First Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="customer.firstName"
                type="text"
                id="firstName"
                required
                class="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Last Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="customer.lastName"
                type="text"
                id="lastName"
                required
                class="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
                placeholder="Enter last name"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address <span class="text-red-500">*</span>
              </label>
              <input
                v-model="customer.email"
                type="email"
                id="email"
                required
                class="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-300"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Mobile Number <span class="text-red-500">*</span>
              </label>
              <input
                v-model="customer.mobileNumber"
                type="text"
                id="mobileNumber"
                required
                class="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 hover:border-pink-300"
                placeholder="Enter mobile number"
                maxlength="10"
              />
            </div>

            <div>
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Age <span class="text-red-500">*</span>
              </label>
              <input
                v-model="customer.age"
                type="number"
                id="age"
                required
                class="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-300"
                placeholder="Enter age"
                min="1"
                max="150"
              />
            </div>
          </div>

          <div class="flex gap-4 mt-10">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center"
            >
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Update Customer
            </button>
            <button
              type="button"
              @click="$router.push('/')"
              class="flex-1 bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg flex items-center justify-center"
            >
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from '../api/CustomerService'

export default {
  name: 'EditCustomer',
  data() {
    return {
      customer: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        age: ''
      },
      loading: true,
      error: '',
      success: ''
    }
  },
  mounted() {
    const id = this.$route.params.id
    CustomerService.getCustomerById(id)
      .then((response) => {
        this.customer = response.data
        this.loading = false
      })
      .catch((error) => {
        console.error('Error fetching customer:', error)
        this.error = 'Failed to fetch customer details. Please try again.'
        this.loading = false
      })
  },
  methods: {
    validateForm() {
      if (!this.customer.firstName.trim()) {
        this.error = 'First name is required'
        return false
      }
      if (!this.customer.lastName.trim()) {
        this.error = 'Last name is required'
        return false
      }
      if (!this.customer.email.trim()) {
        this.error = 'Email is required'
        return false
      }
      if (!/\S+@\S+\.\S+/.test(this.customer.email)) {
        this.error = 'Email is invalid'
        return false
      }
      if (!this.customer.mobileNumber.trim()) {
        this.error = 'Mobile number is required'
        return false
      }
      if (!/^\d{10}$/.test(this.customer.mobileNumber)) {
        this.error = 'Mobile number must be 10 digits'
        return false
      }
      if (!this.customer.age) {
        this.error = 'Age is required'
        return false
      }
      if (this.customer.age < 1 || this.customer.age > 150) {
        this.error = 'Age must be between 1 and 150'
        return false
      }
      return true
    },
    handleSubmit() {
      this.error = ''
      this.success = ''

      if (!this.validateForm()) {
        return
      }

      const customerData = {
        ...this.customer,
        age: parseInt(this.customer.age)
      }

      CustomerService.updateCustomer(customerData)
        .then((response) => {
          this.success = 'Customer updated successfully!'
          setTimeout(() => {
            this.$router.push('/')
          }, 1500)
        })
        .catch((error) => {
          console.error('Error updating customer:', error)
          this.error = 'Failed to update customer. Please try again.'
        })
    }
  }
}
</script>
