<template>
  <nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <svg
              class="h-8 w-8 text-white mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="text-white text-xl font-bold">CRM System</span>
          </router-link>
        </div>
        <div class="flex space-x-4">
          <router-link
            to="/"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="isActive('/') ? 'bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'"
          >
            Customers
          </router-link>
          <router-link
            to="/add"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="isActive('/add') ? 'bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'"
          >
            Add Customer
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    isActive(path) {
      return this.$route.path === path
    }
  }
}
</script>