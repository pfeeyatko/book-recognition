<script setup>
const config = useRuntimeConfig();
const SHEET_URL = config.public.SHEET_URL;

const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
}
</script>

<style scoped>
#mobile-menu {
  transition: max-height 0.3s ease-out;
}
</style>
<template>
    <!-- Navbar -->
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo or Brand Name -->
          <div class="flex-shrink-0 flex items-center">
            <h2 class="text-2xl font-bold text-blue-600">BRARS</h2>
          </div>
          
          <!-- Desktop Menu -->
          <div class="hidden md:flex md:items-center">
            <a href="/" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Home</a>
            <a href="/bookForm" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Manual Entry</a>
            <a :href="SHEET_URL" target="_blank" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Inventory</a>
          </div>
          
          <!-- Mobile Menu Button -->
          <div class="flex items-center md:hidden">
            <button @click="isMenuOpen = !isMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed. -->
              <svg v-if="!isMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Icon when menu is open. -->
              <svg v-if="isMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Home</a>
          <a href="/bookForm" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Manual Entry</a>
          <a :href="SHEET_URL" target="_blank" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Inventory</a>
        </div>
      </div>
    </nav>
</template>