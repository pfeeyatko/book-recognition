<script setup>


const isbn = ref("");
const barcodeId = ref("");
const openConfirmations = ref(false);
const book = ref(null)
const refreshBarcodeId = () => {
  barcodeId.value = useId()
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

const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}

const config = useRuntimeConfig()
const SHEET_URL = config.public.SHEET_URL;const openLibrary = useOpenLibrary();
    book.value = await openLibrary.search(bookIsbn);

    // show modal
    openConfirmations.value = true;
  }
}

const saveBookToSheet = () => {
  // save book to sheet
  openConfirmations.value = false;
  isbn.value = ""
  refreshBarcodeId();
}

onMounted(() => {
  refreshBarcodeId()
})

</script>

<style scoped>
#mobile-menu {
  transition: max-height 0.3s ease-out;
}
</style>
<template>
  <div class="container">
    <h1 class="text-4xl font-bold text-center">Welcome to the POS System</h1>
    <div class="flex justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Scan </button>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Checkout </button>
    </div>

    <ClientOnly>
      <div class="app max-w-[640px] mx-auto">
        <StreamBarcodeReader @decode="(a) => onDecode(a)" :key="barcodeId"/>
        Input Value: {{ isbn || "Nothing" }}
      </div>
    </ClientOnly>
    <LazyUIModal v-if="openConfirmations" :book="book" @save="saveBookToSheet"/>
  </div>
</template>
