<script setup>
const { postData } = usePostData();

const form = ref({
  title: '',
  author: '',
  published: '',
  isbn: '',
  subject: '',
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  const response = await postData(form.value);

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
    errorMessage.value = 'Unknown error occurred.';
  }

  isSubmitting.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Head>
      <Title>Manual Entry</Title>
    </Head>

    <Menu/>

    <div class="bg-gray-100 flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="py-3 text-center">
          <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
          <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
        </div>
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Book</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Book Title -->
          <div class="mb-4">
            <label for="title" class="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              v-model="form.title"
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
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Published Date -->
          <div class="mb-4">
            <label for="published" class="block text-gray-700 font-semibold mb-2">Year Published</label>
            <input
              type="number"
              id="published"
              v-model="form.published"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <!-- Subject -->
          <div class="mb-6">
            <label for="subject" class="block text-gray-700 font-semibold mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              v-model="form.subject"
              placeholder="Subject/genre(s), comma-separated"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  </div>
</template>