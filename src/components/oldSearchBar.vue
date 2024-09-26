<template>
  <div class="flex justify-center my-4">
    <input
      v-model="query"
      @keyup.enter="onSearch"
      type="text"
      placeholder="Search for recipes..."
      class="border rounded-l px-4 py-2 w-2/3"
    />
    <button @click="onSearch" class="bg-fgYellow hover:bg-fgBlue text-fgBlue hover:text-white px-4 py-2 font-bold rounded-r">
      Search
    </button>
  </div>
</template>

<script>
export default {
  props: ['onSearchEvent'],
  data() {
    return {
      query: '',
    };
  },
  methods: {
    onSearch() {
      this.onSearchEvent(this.query);
    },
  },
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
