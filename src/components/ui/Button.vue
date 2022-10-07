<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  styling: {
    type: String,
    default: () => 'primary',
  },
})
const classes = computed(() => {
  switch (props.styling) {
    case 'app':
      return 'inline-block px-6 leading-none border-2 rounded-md hover:bg-indigo-500 text-white border-indigo-600 mt-4 lg:mt-0 text-lg py-2'
    case 'login':
      return 'transform rounded-md bg-indigo-600 font-bold duration-300 hover:bg-indigo-400 mt-10 py-2'
    default:
      return ''
  }
})
</script>

<template>
  <button :class="classes">
    {{ props.text }}
  </button>
</template>
