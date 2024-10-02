<script setup>
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
        if(bookIsbn) {
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
</script>
<template>
    <div>
        <ClientOnly>
        <div class="app max-w-[640px] mx-auto">
            <StreamBarcodeReader @decode="(a) => onDecode(a)" :key="barcodeId"/>
            Input Value: {{ isbn || "Nothing" }}
        </div>
        </ClientOnly>
        <LazyUIModal v-if="openConfirmations && book" :book="book" @save="saveBookToSheet" @cancel="resetBarcode"/>
    </div>
</template>