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
    {{ activeComponent }}
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">Book Recognition & Retrieval System</h1>
      <div class="flex justify-center space-x-4">
        <button class="text-white font-bold py-2 px-4 rounded" :class="activeComponent['__name'] === 'ScanNew' ? 'text-white bg-blue-500' : 'text-black border-black'" @click="setActiveComponent(ScanNew)">Scan</button>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="setActiveComponent(Checkout)">Checkout</button>
      </div>
    </div>
    <component :is="activeComponent" @bookAdded="activeComponent = null"/>
  </div>
</template>