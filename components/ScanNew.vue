<script setup>
    const audio = useAudio();
    const openLibrary = useOpenLibrary();
    const { postData, isLoading } = usePostData();

    const isbn = ref("");
    const openConfirmations = ref(false);
    const book = ref(null);

    const emit = defineEmits(['bookAdded'])

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

    const saveBookToSheet = async () => {
        // save book to sheet
        await postData({
          title: book.value?.title,
          isbn: isbn.value,
          author: book.value?.author,
          subject: book.value?.subject?.join(', '),
          published: book.value?.yearPublished.sort()[0]
        });
        emit('bookAdded');
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
        <LazyUIModal v-if="openConfirmations && book" :book="book" :isLoading="isLoading"  actionName="Add to Store" @save="saveBookToSheet"  @close="resetBarcode"/>
    </div>
</template>