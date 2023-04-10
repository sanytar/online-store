<script setup>
/* eslint-disable */
import { computed, defineProps } from 'vue';

const props = defineProps({
  type: String,
  brand: String,
  name: String,
  image: String,
  rating: String,
  price: Number,
});

const imageSrc = computed(() => {
  return `http://localhost:7000/${props.image}`
});

</script>

<template>
  <div class="card">
    <span class="card__image">
      <img class="image"  :src='imageSrc' alt="device-image">
    </span>
    <div class="card__device-info">
      <span class="device-info__name">
        <p class="name__type"><strong>{{ props.type }}</strong> {{ props.brand }}</p>
        <p class="name__model">{{ props.name }}</p>
      </span>
      <div class="device-info__rating">
        <p>{{ props.rating }}</p>
        <img src="../../assets/icons/rating.svg" alt="rating-icon">
      </div>
    </div>
    <p class="card__price"><strong>Price:</strong> {{ props.price }} rub</p>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  gap: 16px;
  padding: 8px;
  width: 150px;
  box-shadow: 0px 4px 4px rgba(139, 195, 74, 0.3);
  background: white;
  border: 1px solid rgba(139, 195, 74, 0.6);
}

.card__image {
  height: 150px;
  width: 150px;
  border-radius: 4px;
}

.image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 4px;
  transition-duration: 200ms;
}

.card:hover {
  cursor: pointer;
  opacity: 0.7;
  transition-duration: 200ms;
}

.card__device-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.device-info__name {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 18px;
  max-width: 116px;
}

.name__type {
  font-size: 14px;
  color: #817D7D;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name__model {
  font-size: 16px;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.device-info__rating {
  display: flex;
  gap: 4px;
}

.card__price {
  font-size: 14px;
  color: #424040;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
