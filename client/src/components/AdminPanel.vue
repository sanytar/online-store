<script setup>
/* eslint-disable */
import { ref } from 'vue';
import DeModal from "@/components/UI/DeModal.vue";
import { createType, createBrand, createDevice } from '@/http/deviceAPI';
import axios from 'axios';

const buttons = [
  {
    id: 1,
    name: 'type',
    value: 'Add new type',
  },
  {
    id: 2,
    name: 'brand',
    value: 'Add new brand',
  },
  {
    id: 3,
    name: 'device',
    value: 'Add new device',
  },
];

const changedType = ref('');

const isModalActive = ref(false);
const openModal = (name) => {
  changedType.value = name;
  isModalActive.value = true;
}
const closeModal = () => {
  isModalActive.value = false;
  changedType.value = '';
};

const addTypeOrBrand = (newValue) => {
  if (newValue) {
    if (changedType.value === 'type') {
      createType({ name: newValue }).then(data => {
        isModalActive.value = false;
      })
    } else {
      createBrand({ name: newValue }).then(data => {
        isModalActive.value = false;
      })
    }
  } else {
    alert('Enter name')
  }
};

const addNewDevice = (newDevice) => {
  const formData = new FormData();
  formData.append('name', newDevice.name)
  formData.append('price', newDevice.price)
  formData.append('img', newDevice.image)
  formData.append('brandId', `${newDevice.brandId}`)
  formData.append('typeId', `${newDevice.typeId}`)
  formData.append('info', JSON.stringify(newDevice.properties))
  createDevice(formData).then(data => isModalActive.value = false)
}

</script>

<template>
  <div class="buttons-list">
    <button
      v-for="button in buttons"
      :key="button.id"
      class="button"
      @click="openModal(button.name)"
    >
      {{ button.value }}
    </button>
  </div>
  <de-modal
    v-if="isModalActive"
    :changed-type="changedType"
    @close-modal="closeModal"
    @add-type-or-brand="addTypeOrBrand"
    @new-device="addNewDevice"
  />
</template>

<style scoped>
.buttons-list {
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.button {
  width: 331px;
  padding: 17px 0;
  background: #D9F2BC;
  border: 1px solid #8BC34A;
  border-radius: 4px;
  font-size: 24px;
  transition-duration: 300ms;
}

.button:hover {
  cursor: pointer;
  background: #8BC34A;
  transition-duration: 300ms;
}

.button:active {
  transition-duration: 300ms;
  transform: scale(0.97);
}
</style>
