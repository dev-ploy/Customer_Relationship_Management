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

      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-lg flex items-center">
        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error }}
      </div>

      <div v-else class="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 animate-scaleIn">
        <div class="flex items-center mb-8">
          <div class="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full p-3 mr-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Customer Details</h2>
            <p class="text-gray-600 mt-1">View customer information</p>
          </div>
        </div>

        <div v-if="customer" class="space-y-6">
          <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-600">
            <label class="block text-blue-600 text-sm font-bold mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              Customer ID
            </label>
            <p class="text-gray-800 text-2xl font-bold">#{{ customer.id }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-l-4 border-indigo-600">
              <label class="block text-indigo-600 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                First Name
              </label>
              <p class="text-gray-800 text-xl font-semibold">{{ customer.firstName }}</p>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-l-4 border-purple-600">
              <label class="block text-purple-600 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Last Name
              </label>
              <p class="text-gray-800 text-xl font-semibold">{{ customer.lastName }}</p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border-l-4 border-green-600">
            <label class="block text-green-600 text-sm font-bold mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address
            </label>
            <p class="text-gray-800 text-xl font-semibold">{{ customer.email }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 border-l-4 border-pink-600">
              <label class="block text-pink-600 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Mobile Number
              </label>
              <p class="text-gray-800 text-xl font-semibold">{{ customer.mobileNumber }}</p>
            </div>

            <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-600">
              <label class="block text-yellow-600 text-sm font-bold mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Age
              </label>
              <p class="text-gray-800 text-xl font-semibold">{{ customer.age }} years</p>
            </div>
          </div>

          <div class="flex gap-4 mt-10">
            <button
              @click="$router.push(`/edit/${customer.id}`)"
              class="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center"
            >
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Customer
            </button>
            <button
              @click="$router.push('/')"
              class="flex-1 bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold text-lg flex items-center justify-center"
            >
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from '../api/CustomerService'

export default {
  name: 'ViewCustomer',
  data() {
    return {
      customer: null,
      loading: true,
      error: ''
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
  }
}
</script>
