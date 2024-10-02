<script setup>
const audio = useAudio();
const openLibrary = useOpenLibrary();
const postData = usePostData();

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
  audio.beep();

  if (bookIsbn) {
    openConfirmations.value = true;
    isbn.value = bookIsbn;
    // get book details from library

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
  import ScanNew from '~/components/ScanNew';
  import Checkout from '~/components/Checkout';

  const activeComponent = shallowRef(null);

  const setActiveComponent = (component) => {
    activeComponent.value = component;
  }
</script>
<template>
  <div class="min-h-screen bg-gray-100">
    <Menu/>
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">Welcome to the POS System</h1>
      <div class="flex justify-center space-x-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="setActiveComponent(ScanNew)">Scan</button>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="setActiveComponent(Checkout)">Checkout</button>
      </div>
    </div>
    <component :is="activeComponent"/>
  </div>
</template>