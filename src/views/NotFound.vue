<!-- src/views/NotFound.vue -->
<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <router-link to="/" class="text-blue-500 hover:underline">Go to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>
  