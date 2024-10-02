<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

defineProps({
  book: {
    type: Object,
    default: () => ({})
  },
  isLoading: false,
  actionName: '',
})

const emit = defineEmits(['save', 'close'])

const closeModal = () => {
  emit('close')
}

</script>

<template>
  <TransitionRoot as="div" :show="true">
    <Dialog class="relative z-10" @close="emit('close')" :open="true">
      <TransitionChild as="div" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="div" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10" :class="book.error ? 'bg-red-100' : 'bg-green-100'">
                    <ExclamationTriangleIcon v-if="book.error" class="h-6 w-6 text-red-600" aria-hidden="true" />
                    <CheckCircleIcon v-else class="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Book Details</DialogTitle>
                    <div class="mt-2">
                      <p v-if="book.error">
                        {{ book.message }}
                      </p>
                      <p v-else class="text-sm text-gray-500" >
                        <strong>Title: </strong>{{ book.title }}<br/>
                        <strong>Author: </strong>{{ book.author?.join(', ') }}<br/>
                        <strong>Published: </strong>{{ book.yearPublished?.sort()[0] }}<br/>
                        <strong>Genre: </strong>{{ book.subject?.join(', ') }}<br/>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <template v-if="book.error">
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeModal">Ok</button>
              </template>
                <template v-else>
                  <button type="button" class="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto" @click="emit('save')" :class="isLoading ? 'opacity-50 cursor-not-allowed': ''" :disabled="isLoading">{{ isLoading ? 'saving...' : actionName }}</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeModal" ref="cancelButtonRef">Cancel</button>
                </template>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>