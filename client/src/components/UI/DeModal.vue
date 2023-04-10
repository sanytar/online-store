<script setup>
/* eslint-disable */
import {
  computed,
  defineProps,
  defineEmits,
  ref,
} from 'vue';
import DeInput from '@/components/UI/DeInput.vue';
import DeButton from '@/components/UI/DeButton.vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  changedType: String,
});

const emit = defineEmits(['closeModal', 'addTypeOrBrand', 'newDevice']);

const types = ref(store.state.types);

const brands = ref(store.state.brands);

const propertyList = ref([]);

const newDevice = ref({
  typeId: '',
  brandId: '',
  name: '',
  price: '',
  image: null,
  properties: [],
});

const previewImage = ref('');
const addProperty = () => {
  if (propertyList.value[0]) {
    propertyList.value.push({
      id: propertyList.value[propertyList.value.length - 1].id + 1,
      title: '',
      description: '',
    });
  } else {
    propertyList.value.push({
      id: 1,
      title: '',
      description: '',
    });
  }
};

const createNewDevice = () => {
  newDevice.value.name = inputValue.value;
  newDevice.value.properties = propertyList.value;
  let result = true
  for(let key in newDevice.value) {
    if (!newDevice.value[key] || !newDevice.value.properties[0] || !propertyList.value.find(el => !!el.title && !!el.description)) {
      result = false;
    }
  }
  if (result) {
    emit('newDevice', newDevice.value);
  } else {
    alert('Заполните все поля');
  }
};
const changeType = (value) => {
  newDevice.value.typeId = (types.value.find(el => el.name === value).id).toString()
};
const changeBrand = (value) => {
  newDevice.value.brandId = (brands.value.find(el => el.name === value).id).toString()
};
const deleteProperty = (id) => {
  propertyList.value = propertyList.value.filter(el => el.id !== id)
};

const headerText = computed(() => {
  let result;
  if (props.changedType === 'type') {
    result = 'Add new type';
  } else if (props.changedType === 'brand') {
    result = 'Add new brand';
  } else {
    result = 'Add new device';
  }
  return result;
});

const placeholderText = computed(() => {
  let result;
  if (props.changedType === 'type') {
    result = 'Enter type names';
  } else if (props.changedType === 'brand') {
    result = 'Enter brand names';
  } else {
    result = 'Enter device names';
  }
  return result;
});

const inputValue = ref('');

const uploadImage = (e) => {
  newDevice.value.image = e.target.files[0];
  const url = URL.createObjectURL(e.target.files[0])
  previewImage.value = url;
}


</script>

<template>
    <div class="de-modal">
      <div v-if="props.changedType !== 'device'" class="modal-window">
        <h2>{{ headerText }}</h2>
        <de-input v-model="inputValue" :placeholder="placeholderText"/>
        <div class="buttons">
          <de-button class="button_red" @click="emit('closeModal')">Close</de-button>
          <de-button @click="emit('addTypeOrBrand', inputValue)">Add</de-button>
        </div>
      </div>
      <div v-else class="modal-window">
        <h2>{{ headerText }}</h2>
        <select class="select" @change="changeType($event.target.value)">
          <option selected disabled>Choose type</option>
          <option
            v-for="option in types"
          >
            {{ option.name }}
          </option>
        </select>
        <select class="select" @change="changeBrand($event.target.value)">
          <option
            v-for="option in brands"
          >
            {{ option.name }}
          </option>
          <option selected disabled>Choose brand</option>
        </select>
        <de-input v-model="inputValue" :placeholder="placeholderText" />
        <de-input v-model="newDevice.price" type="number" placeholder="Enter device price" />
        <input type="file" @change="uploadImage" />
        <div v-if="previewImage" class="preview">
          <img :src="previewImage" class="preview__image">
        </div>
        <de-button style="width: 160px" @click="addProperty">Add new property</de-button>
        <div v-for="item in propertyList" :key="item.id" class="inputs">
          <de-input v-model="item.title" style="width: 50%" placeholder="Enter property name" />
          <de-input v-model="item.description" style="width: 35%" placeholder="Enter property value" />
          <button class="cancel-button" @click="deleteProperty(item.id)">X</button>
        </div>
        <div class="buttons">
          <de-button class="button_red" @click="emit('closeModal')">Close</de-button>
          <de-button @click="createNewDevice">Add</de-button>
        </div>
      </div>
    </div>
</template>

<style scoped>
.de-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-window {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 4px;
  background: white;
}

.buttons {
  display: flex;
  gap: 8px;
  align-self: flex-end;
}

.button_red {
  background: #9b3c3c;
  color: white;
  border: #732a2a;
}

.button_red:hover {
  background: #671515;
}

.select {
  padding: 12px 0;
  font-size: 18px;
  border-radius: 4px;
}

.inputs {
  display: flex;
  gap: 8px;
}

.cancel-button {
  background: #c34a4a;
  border-radius: 4px;
  border: 1px solid darkred;
  color: white;
  font-weight: bold;
  transition-duration: 300ms;
}

.cancel-button:hover {
  cursor: pointer;
  background: white;
  color: #c34a4a;
  transition-duration: 300ms;
}

.preview {
  width: 120px;
  border-radius: 4px;
}

.preview__image {
  width: 100%;
}
</style>s
