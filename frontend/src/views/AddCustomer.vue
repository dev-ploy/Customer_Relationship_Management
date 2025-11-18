<template>
  <div class="container mx-auto px-4 py-8 animate-fadeIn">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 animate-scaleIn">
        <div class="flex items-center mb-8">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-3 mr-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Add New Customer</h2>
            <p class="text-gray-600 mt-1">Fill in the customer details below</p>
          </div>
        </div>

        <transition name="slide-fade">
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-lg flex items-center animate-slideDown">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="font-medium">{{ error }}</span>
          </div>
        </transition>

        <transition name="slide-fade">
          <div v-if="success" class="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-6 shadow-lg flex items-center animate-slideDown">
            <svg class="w-6 h-6 mr-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="font-medium">{{ success }}</span>
          </div>
        </transition>

        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="group">
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center" for="firstName">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                First Name <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                v-model="customer.firstName"
                type="text"
                id="firstName"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                placeholder="Enter first name"
              />
            </div>

            <div class="group">
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center" for="lastName">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Last Name <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                v-model="customer.lastName"
                type="text"
                id="lastName"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                placeholder="Enter last name"
              />
            </div>

            <div class="md:col-span-2 group">
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center" for="email">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                v-model="customer.email"
                type="email"
                id="email"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                placeholder="customer@example.com"
              />
            </div>

            <div class="group">
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center" for="mobileNumber">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Mobile Number <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                v-model="customer.mobileNumber"
                type="text"
                id="mobileNumber"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                placeholder="1234567890"
                maxlength="10"
              />
            </div>

            <div class="group">
              <label class="block text-gray-700 text-sm font-bold mb-3 flex items-center" for="age">
                <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Age <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                v-model="customer.age"
                type="number"
                id="age"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                placeholder="Enter age"
                min="1"
                max="150"
              />
            </div>
          </div>

          <div class="flex gap-4 mt-10">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center"
            >
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Customer
            </button>
            <button
              type="button"
              @click="handleReset"
              class="flex-1 bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg flex items-center justify-center"
            >
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <button
              type="button"
              @click="$router.push('/')"
              class="flex-1 bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg flex items-center justify-center"
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
  name: 'AddCustomer',
  data() {
    return {
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        age: ''
      },
      error: '',
      success: ''
    }
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

      CustomerService.createCustomer(customerData)
        .then((response) => {
          this.success = 'Customer added successfully!'
          setTimeout(() => {
            this.$router.push('/')
          }, 1500)
        })
        .catch((error) => {
          console.error('Error creating customer:', error)
          this.error = 'Failed to add customer. Please try again.'
        })
    },
    handleReset() {
      this.customer = {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        age: ''
      }
      this.error = ''
      this.success = ''
    }
  }
}
</script>
