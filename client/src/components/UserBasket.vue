<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BasketCard from '@/components/UI/BasketCard.vue';

const store = useStore();
const router = useRouter();

const { basket } = store.state;

</script>

<template>
  <div v-if="store.state.basket[0]" class="basket">
    <basket-card v-for="item in basket" :key="item.id" :device="item" />
  </div>
  <div v-else class="basket__empty">
    <h2>Basket is empty</h2>
    <button class="basket__button" @click="router.push('/')">Go shopping</button>
  </div>
</template>

<style scoped>
.basket {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

.basket__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  height: 40vh;
  font-size: 24px;
}

.basket__button {
  background: #D9F2BC;
  border: 1px solid #8BC34A;
  border-radius: 4px;
  width: 331px;
  height: 64px;
  font-size: 24px;
}

.basket__button:hover {
  cursor: pointer;
  background: #8BC34A;
  transition-duration: 300ms;
  box-shadow: 0px 0px 4px rgba(105, 142, 62, 0.3);
  color: white;
}

.basket__button:active {
  transition-duration: 300ms;
  transform: scale(0.97);
}
</style>
