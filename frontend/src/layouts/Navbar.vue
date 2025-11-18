<template>
  <nav class="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-8">
          <router-link to="/" class="flex items-center group">
            <div class="relative">
              <svg
                class="h-10 w-10 text-white transform group-hover:scale-110 transition-transform duration-300"
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
              <div class="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div class="ml-3">
              <span class="text-white text-2xl font-bold tracking-tight">CRM Pro</span>
              <p class="text-blue-100 text-xs">Customer Management</p>
            </div>
          </router-link>
        </div>
        <div class="flex space-x-2">
          <router-link
            to="/"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            :class="isActive('/') 
              ? 'bg-white text-indigo-600 shadow-lg' 
              : 'text-white hover:bg-white hover:bg-opacity-20'"
          >
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Customers</span>
            </div>
          </router-link>
          <router-link
            to="/add"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            :class="isActive('/add') 
              ? 'bg-white text-indigo-600 shadow-lg' 
              : 'text-white hover:bg-white hover:bg-opacity-20'"
          >
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Customer</span>
            </div>
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
