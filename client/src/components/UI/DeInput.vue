<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  placeholder: String,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

</script>

<template>
  <input
    :placeholder="props.placeholder"
    class="de-input"
    type="text"
    aria-labelledby="input"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
.de-input {
  height: 47px;
  width: 382px;
  padding-left: 13px;
  background: #E8F2DC;
  border: 1px solid #8BC34A;
  border-radius: 4px;
  font-size: 16px;
  transition-duration: 300ms;
}

.de-input:focus {
  box-shadow: 0px 4px 4px rgba(217, 242, 188, 0.3);
  border-radius: 4px;
  outline: none;
  border: 1px solid #6f9b3c;
  transition-duration: 300ms;
}
</style>
