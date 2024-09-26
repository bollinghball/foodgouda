<!-- SearchBar.vue -->

<template>
    <div class="mb-4">
      <input
        type="text"
        v-model="inputValue"
        placeholder="Search recipes..."
        class="w-full p-2 border border-gray-300 rounded"
      />
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
      });
  
      return {
        inputValue,
      };
    },
  };
  </script>
  