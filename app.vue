<script setup>
useHead({
  titleTemplate: (title) => {
    return title ? `${title} - BRARS` : 'BRARS';
  }
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
  </div>
  <NuxtPage />
</template>
