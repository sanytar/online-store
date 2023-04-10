<script setup>
/* eslint-disable */
import DeviceCard from '@/components/UI/DeviceCard.vue';
import router from '@/router';
import { computed, effect, onMounted, ref, watchEffect } from "vue";
import { useStore } from 'vuex';
import { fetchTypes, fetchBrands, fetchDevices } from '@/http/deviceAPI';
import DePage from "@/components/UI/DePage.vue";

const store = useStore();
watchEffect(() => {
  fetchTypes().then(data => {
    store.dispatch('setTypes', data);
    typeList.value = store.state.types;
  })
  fetchBrands().then(data => {
    store.dispatch('setBrands', data);
    brandList.value = store.state.brands;
  })
  fetchDevices(store.state.selectedType, store.state.selectedBrand, store.state.page, store.state.limit).then(data => {
    store.dispatch('setDevices', data.rows);
    store.dispatch('setTotalCount', data.count)
    deviceList.value = store.state.devices;
  })
});


const typeList = ref([]);
const brandList = ref([]);
const deviceList = ref([]);

const pageCount = computed(() => {
  return Math.ceil(store.state.totalCount / store.state.limit)
})

const pages = computed(() => {
  const result = [];
  for (let i = 0; i < pageCount.value; i++) {
    result.push(i + 1)
  }
  return result
});
const goToDevicePage = (id) => {
  router.push({
    name: 'device',
    params: { id },
  });
};

const findBrandName = (deviceId) => {
  return brandList.value.find(el => el.id === deviceId).name;
}

const findType = (deviceId) => {
  const wordsArray = typeList.value.find(el => el.id === deviceId).name.split('')
  return wordsArray.filter((el, index) => index !== wordsArray.length - 1).join('');
}

const typeClasses = (typeId) => {
  return {
    navigation__item: true,
    navigation__item_selected: store.state.selectedType === typeId,
  }
};
const brandClasses = (brandId) => {
  return {
    'brand-list__brand-item': true,
    'brand-list__brand-item_active': store.state.selectedBrand === brandId,
  }
};

const selectType = (id) => {
  if(store.state.selectedType === id) {
    store.dispatch('selectType', null)
  } else {
    store.dispatch('selectType', id)
    store.dispatch('setPage', 1)
  }
};
const selectBrand = (id) => {
  if(store.state.selectedBrand === id) {
    store.dispatch('selectBrand', null)
  } else {
    store.dispatch('selectBrand', id)
    store.dispatch('setPage', 1)
  }
};
const isPageSelected = (page) => {
  return page === store.state.page
}

</script>

<template>
  <div class="shop">
    <ul class="shop__navigation">
      <li
        v-for="item in typeList"
        :key="item.id"
        :class="typeClasses(item.id)"
        @click="selectType(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="shop__devices">
      <ul class="devices__brand-list">
        <li
          v-for="brand in brandList"
          :key="brand.id"
          :class="brandClasses(brand.id)"
          @click="selectBrand(brand.id)"
        >
          {{ brand.name }}
        </li>
      </ul>
      <ul class="devices__list">
        <device-card
          v-for="device in deviceList"
          :key="device.id"
          :type="findType(device.typeId)"
          :brand="findBrandName(device.brandId)"
          :name="device.name"
          :rating="device.rating"
          :image="device.img"
          :price="device.price"
          @click="goToDevicePage(device.id)"
        />
      </ul>
      <div class="pagination">
        <de-page
          v-for="(page, index) in pages"
          :key="index"
          :selected="isPageSelected(page)"
          @click="store.dispatch('setPage', page)"
        >
          {{ page }}
        </de-page>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shop {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  padding: 28px 0;
}

.shop__navigation {
  display: flex;
  flex-direction: column;
  width: 200px;
  cursor: default;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(139, 195, 74, 0.3);
  padding: 0;
  border: 1px solid rgba(139, 195, 74, 0.6);
}

.navigation__item {
  list-style-type: none;
  height: 28px;
  padding: 4px 12px 0;
  border-radius: 4px;
  transition-duration: 200ms;
}

.navigation__item:hover {
  cursor: pointer;
  background: #8BC34A;
  color: white;
  transition-duration: 200ms;
}

.navigation__item:active {
  cursor: pointer;
  background: #9ac966;
  transition-duration: 200ms;
}

.navigation__item_selected {
  background: #8BC34A;
  color: white;
  transition-duration: 200ms;
}

.navigation__item_selected:hover {
  cursor: pointer;
  background: #8da476;
  transition-duration: 200ms;
}

.shop__devices {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.devices__brand-list {
  width: 840px;
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0;
}

.brand-list__brand-item {
  list-style-type: none;
  padding: 6px 12px;
  border: 1px solid rgba(139, 195, 74, 0.6);
  background: white;
  border-radius: 4px;
  text-align: center;
  transition-duration: 200ms;
}

.brand-list__brand-item:hover {
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(139, 195, 74, 0.3);
  transition-duration: 200ms;
}

.brand-list__brand-item_active {
  background: #8BC34A;
  transition-duration: 200ms;
}

.brand-list__brand-item_selected {
  background: #8BC34A;
  color: white;
  transition-duration: 200ms;
}

.brand-list__brand-item_selected:hover {
  cursor: pointer;
  background: #8da476;
  transition-duration: 200ms;
}

.devices__list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 840px;
  gap: 40px;
  padding: 0;
}

.pagination {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  width: 840px;
}
</style>
