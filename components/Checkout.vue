<script setup>
    const audio = useAudio();
    const openLibrary = useOpenLibrary();
    const { postData, isLoading } = usePostData();

    const isbn = ref("");
    const openConfirmations = ref(false);
    const book = ref(null);

    const emit = defineEmits(['sold'])

    let StreamBarcodeReader

    if (process.client) {
        StreamBarcodeReader = (await import('vue-barcode-reader')).StreamBarcodeReader
    }

    const onDecode = async (bookIsbn) => {
        await audio.beep();

        if(bookIsbn) {
          isbn.value = bookIsbn;
          book.value = await openLibrary.search(bookIsbn);
          openConfirmations.value = true;
        }
    }

    const markAsSold = async () => {
        // mark as sold
        await postData({
          title: book.value?.title,
          isbn: isbn.value,
          author: book.value?.author,
          published: book.value?.yearPublished?.join(', '),
          status: 'sold',
        });
        emit('sold');
        resetBarcode();
    }

    const resetBarcode = () => {
        openConfirmations.value = false;
        isbn.value = ""
        book.value = null;
    }
</script>
<template>
    <div>
        <ClientOnly>
        <div class="app max-w-[640px] mx-auto">
            <StreamBarcodeReader @decode="(a) => onDecode(a)" />
            <p class="text-center">Input Value: {{ isbn || "Nothing" }}</p>
        </div>
        </ClientOnly>
        <LazyUIModal v-if="openConfirmations && book" :book="book" :isLoading="isLoading" @save="markAsSold" actionName="Mark as Sold" @close="resetBarcode"/>
    </div>
</template>