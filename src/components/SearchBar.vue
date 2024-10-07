<!-- SearchBar.vue -->

<template>
    <div class="flex justify-center my-4">
      <input
        type="text"
        v-model="inputValue"
        placeholder="Search for a recipe"
        class="w-full md:w-1/2 p-2 border border-gray-300 rounded"
      />
      <button @click="onSearch" class="bg-fgYellow hover:bg-fgBlue text-fgBlue hover:text-white px-4 py-2 font-bold rounded-r">
      Search
    </button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    props: {
      modelValue: {
        type: String,
        default: '',
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const inputValue = computed({
        get() {
          return props.modelValue;
        },
        set(value) {
          emit('update:modelValue', value);
        },
        methods: {
          onSearch() {
            this.onSearchEvent(this.query);
          },
        },
      });
  
      return {
        inputValue,
      };
    },
  };
  </script>
  