<script setup>
/* eslint-disable */
import DeButton from '@/components/UI/DeButton.vue';
import { fetchBrands, fetchOneDevice } from '@/http/deviceAPI';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const { currentRoute } = useRouter();
const { state, dispatch } = useStore();
const device = ref({});
watchEffect(() => {
  fetchOneDevice(currentRoute.value.params.id).then(data => {
    device.value = data;
  })
  fetchBrands().then(data => {
    dispatch('setBrands', data);
    brand.value = state.brands.find(el => el.id === device.value.brandId).name;
  })
})

const brand = ref('')
const isDeviceInBasket = computed(() => {
  return !!state.basket.find(el => el.id === device.value.id)
})

const characteristicClasses = (char) => {
  return {
    characteristic: true,
    characteristic_odd: char.id % 2 !== 0,
  }
};

const imageSrc = computed(() => {
  return `http://localhost:7000/${device.value.img}`;
})

const addToCart = () => {
  dispatch('addDeviceToBasket', {...device.value, quantity: 1})
};
const incrementDevice = () => {
  dispatch('addDeviceToBasket', device.value)
};
const removeDevice = () => {
  dispatch('removeDeviceFromBasket', device.value.id)
};
</script>

<template>
  <div class="device">
    <div class="device__info">
      <span class="info__image">
        <img class="image" :src="imageSrc" alt="device-image">
      </span>
      <div class="info__text">
        <h1 class="text__header">{{ brand }} {{ device.name }}</h1>
        <div class="text__rating">
          <div class="rating">
            <img v-for="item in 5" src="../assets/icons/star.svg" alt="rating-star">
            <p>{{ device.rating }}/5</p>
          </div>
        </div>
      </div>
      <div class="info__price">
        <p class="price">{{ device.price }} rub</p>
        <de-button v-if="!isDeviceInBasket" class="button" @click="addToCart">Add to cart</de-button>
        <div v-else class="button_added">
          <button class="added__active" @click="removeDevice">-</button>
          <input class="input" :value="state.basket.find(el => el.id === device.id).quantity" type="number" />
          <button class="added__active" @click="incrementDevice">+</button>
        </div>
      </div>
    </div>
    <div class="device__characteristics">
      <h2>Characteristics:</h2>
      <ul class="characteristics-list">
        <li
          v-for="info in device.info"
          :key="info.id"
          :class="characteristicClasses(info)"
        >
          {{ info.title }}: {{ info.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.device {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-top: 64px;
}

.device__info {
  display: flex;
  align-items: flex-start;
  gap: 64px;
  height: 320px;
}

.info__image {
  width: 300px;
  height: 300px;
  height: inherit;
}

.image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  border-radius: 4px;
  transition-duration: 200ms;
  border: 1px solid #698E3E;
}

.info__text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 360px;
}

.text__header {
  font-weight: 500;
  font-size: 32px;
}

.text__rating {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: flex-start;
  user-select: none;
}

.rating {
  display: flex;
  gap: 8px;
}

.info__price {
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 219px;
  height: 132px;
  background: white;
  border: 1px solid #698E3E;
  box-shadow: 0px 4px 4px rgba(217, 242, 188, 0.3);
  border-radius: 4px;
}

.price {
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
}

.button {
  width: 96px;
}

.device__characteristics {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  width: 1010px;
  cursor: default;
}

.characteristics-list {
  padding: 0;
  list-style-type: none;
}

.characteristic {
  width: 1000px;
  padding: 10px 12px;
}

.characteristic_odd {
  background: white;
  border-radius: 4px;
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
