<script setup>
/* eslint-disable */
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const props = defineProps({
  device: Object,
});

const brand = computed(() => {
  return store.state.brands.find(el => el.id === props.device.value.brandId).name;
})


</script>

<template>
  <div class="card">
    <span class="card__image">
      <img src="../../assets/images/A54_1_large_large.jpg" alt="device-image">
    </span>
    <h2>Apple iPhone 14 Pro Max</h2>
    <p>112 000 rub</p>
    <div class="card__buttons">
      <div class="button_added">
        <button class="added__active">-</button>
        <input class="input" value="2" type="number" />
        <button class="added__active">+</button>
      </div>
      <button class="button">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 736px;
  background: #FFFFFF;
  border: 1px solid #8BC34A;
  box-shadow: 0px 4px 4px rgba(139, 195, 74, 0.1);
  border-radius: 4px;
}

.card h2 {
  font-size: 16px;
}

.card__image img {
  width: 120px;
  height: 120px;
}

.card__buttons {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.button {
  width: 165px;
  height: 30px;
  background: #f2bcbc;
  border: 1px solid #c34a4a;
  border-radius: 4px;
  transition-duration: 300ms;
}

.button:hover {
  cursor: pointer;
  background: #c34a4a;
  transition-duration: 300ms;
  box-shadow: 0px 0px 4px rgba(137, 142, 62, 0.3);
  color: white;
}

.button:active {
  transition-duration: 300ms;
  transform: scale(0.97);
}

.button_added {
  display: flex;
  width: 165px;
  height: 30px;
  background: #D9F2BC;
  border: 1px solid #8BC34A;
  border-radius: 4px;
}

.added__active {
  border: none;
  background: none;
  width: 33%;
  font-size: 20px;
  transition-duration: 300ms;
}

.added__active:hover {
  cursor: pointer;
  background: #8BC34A;
  transition-duration: 300ms;
  box-shadow: 0px 0px 4px rgba(105, 142, 62, 0.3);
  color: white;
}

.input {
  border: none;
  width: 33%;
  text-align: center;
  outline:none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
