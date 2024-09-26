<template>
  <div class="relative cursor-pointer mb-4" @click="navigateToDetail">
    <img :src="recipe.image" :alt="recipe.title" class="w-full h-64 object-cover rounded" />
    <div class="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-2">
      {{ recipe.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['recipe'],
  methods: {
    navigateToDetail() {
      this.$router.push({ name: 'Recipe', params: { id: this.recipe.id } });
    },
  },
};
</script>

<style scoped>
/* Add hover effects or transitions if desired */
</style>
