<script setup>
</script>

<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  min-width: 86px;
  height: 30px;
  background: #D9F2BC;
  font-size: 16px;
  border: 1px solid #8BC34A;
  border-radius: 4px;
  transition-duration: 300ms;
  padding-bottom: 3px;
}

.button:hover {
  cursor: pointer;
  background: #8BC34A;
  transition-duration: 300ms;
  box-shadow: 0px 0px 4px rgba(105, 142, 62, 0.3);
  color: white;
}

.button:active {
  transition-duration: 300ms;
  transform: scale(0.97);
}
</style>
