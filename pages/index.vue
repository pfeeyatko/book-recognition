<script setup>

const isbn = ref("");

const barcodeId = ref("");
const openConfirmations = ref(false);

const refreshBarcodeId = () => {
  barcodeId.value = useId()
}

let StreamBarcodeReader

if (process.client) {
  StreamBarcodeReader = (await import('vue-barcode-reader')).StreamBarcodeReader
}

const onDecode =(bookIsbn) => {
  if(bookIsbn) {
    openConfirmations.value = true;
    isbn.value = bookIsbn;
    // get book details from library
    // show modal
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

<template>

  <div class="container mx-auto">

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
    <LazyUIModal v-if="openConfirmations" @save="saveBookToSheet"/>
  </div>
</template>

<style scoped>
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
