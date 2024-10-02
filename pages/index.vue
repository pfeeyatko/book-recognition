<script setup>
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
      <h1 class="text-4xl font-bold text-center mb-8">Book Recognition & Retrieval System</h1>

      <div class="flex justify-center space-x-4 py-4">
        <!-- Scan Button -->
        <button
            class="py-2 px-6 font-medium rounded-lg focus:outline-none transition-colors duration-300"
            :class="activeComponent && activeComponent['__name'] === 'ScanNew'
      ? 'bg-blue-500 text-white'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
            @click="setActiveComponent(ScanNew)"
        >
          Scan
        </button>

        <!-- Checkout Button -->
        <button
            class="py-2 px-6 font-medium rounded-lg focus:outline-none transition-colors duration-300"
            :class="activeComponent && activeComponent['__name'] === 'Checkout'
      ? 'bg-blue-500 text-white'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
            @click="setActiveComponent(Checkout)"
        >
          Checkout
        </button>
      </div>


    </div>
    <component :is="activeComponent" @sold="activeComponent = null" @bookAdded="activeComponent = null"/>
  </div>
</template>