<script setup>
import { ref } from 'vue'

<<<<<<< HEAD

const isbn = ref("");
const barcodeId = ref("");
const openConfirmations = ref(false);
const book = ref(null);

const refreshBarcodeId = () => {
  barcodeId.value = useId();
}

let StreamBarcodeReader

if (process.client) {
  StreamBarcodeReader = (await import('vue-barcode-reader')).StreamBarcodeReader
}

const onDecode = async (bookIsbn) => {
  if(bookIsbn) {
    openConfirmations.value = true;
    isbn.value = bookIsbn;
    // get book details from library
    import { ref } from 'vue'

=======
>>>>>>> 4a549ef (Added hamburger menu)
const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}

const config = useRuntimeConfig()
<<<<<<< HEAD
const SHEET_URL = config.public.SHEET_URL;const openLibrary = useOpenLibrary();
    book.value = await openLibrary.search(bookIsbn);
    // show modal
    openConfirmations.value = true;
  }
}

const saveBookToSheet = () => {
  // save book to sheet
  resetBarcode();
}

const resetBarcode = () => {
  openConfirmations.value = false;
  isbn.value = ""
  book.value = null;
  refreshBarcodeId();
}

onMounted(() => {
  refreshBarcodeId()
})

=======
const SHEET_URL = config.public.SHEET_URL;
>>>>>>> 4a549ef (Added hamburger menu)
</script>

<style scoped>
#mobile-menu {
  transition: max-height 0.3s ease-out;
}
</style>
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo or Brand Name -->
          <div class="flex-shrink-0 flex items-center">
            <h2 class="text-2xl font-bold text-blue-600">POS System</h2>
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
          <a :href="SHEET_URL" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Inventory</a>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">Welcome to the POS System</h1>
      <div class="flex justify-center space-x-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Scan</button>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Checkout</button>
      </div>
    </div>

    <ClientOnly>
      <div class="app max-w-[640px] mx-auto">
        <StreamBarcodeReader @decode="(a) => onDecode(a)" :key="barcodeId"/>
        Input Value: {{ isbn || "Nothing" }}
      </div>
    </ClientOnly>
    <LazyUIModal v-if="openConfirmations && book" :book="book" @save="saveBookToSheet" @cancel="resetBarcode"/>
  </div>
</template>