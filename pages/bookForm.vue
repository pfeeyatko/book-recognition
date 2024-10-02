<script setup>
import { ref } from 'vue'

const form = ref({
  title: '',
  author: '',
  published: '',
  isbn: '',
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/sendToSheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: form.value,
    })

    if (response.status === 'success') {
      successMessage.value = 'Book added successfully!'
      // Reset form
      form.value = {
        title: '',
        author: '',
        published: '',
        isbn: '',
      }
    } else {
      throw new Error(response.message || 'Unknown error occurred.')
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    errorMessage.value = 'Failed to submit the form. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Book</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Book Title -->
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-semibold mb-2">Book Title</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="Enter book title"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Author -->
        <div class="mb-4">
          <label for="author" class="block text-gray-700 font-semibold mb-2">Author</label>
          <input
            type="text"
            id="author"
            v-model="form.author"
            placeholder="Enter author's name"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Published Date -->
        <div class="mb-4">
          <label for="published" class="block text-gray-700 font-semibold mb-2">Published Date</label>
          <input
            type="date"
            id="published"
            v-model="form.published"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- ISBN -->
        <div class="mb-6">
          <label for="isbn" class="block text-gray-700 font-semibold mb-2">ISBN</label>
          <input
            type="text"
            id="isbn"
            v-model="form.isbn"
            placeholder="Enter ISBN number"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>