<script setup>
const openLibrary = useOpenLibrary();

console.log(await openLibrary.search('9780553283396'));
</script>

<template>
  <div class="container">
    <h1 class="text-4xl font-bold text-center">Welcome to the POS System</h1>
    <div class="flex justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Scan </button>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Checkout </button>
    </div>
  </div>
</template>
