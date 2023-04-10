<script setup>
/* eslint-disable */
import { computed } from 'vue';

const props = defineProps({
  selected: Boolean,
});

const classList = computed(() => {
  return {
    'de-page': true,
    'de-page_active': props.selected,
  }
});
</script>

<template>
  <div :class="classList">
    <slot />
  </div>
</template>

<style scoped>
.de-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  cursor: default;
  border-radius: 50%;
}

.de-page:hover {
  cursor: pointer;
  background: rgba(139, 195, 74, 0.5);
}

.de-page_active {
  border-radius: 50%;
  background: #8BC34A;
}

.de-page_active:hover {
  background: #8BC34A;
  box-shadow: 0px 4px 4px rgb
}
</style>
