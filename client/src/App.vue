<script setup>
/* eslint-disable */
import HeaderBar from '@/components/HeaderBar.vue';
import { ref, watchEffect } from 'vue';
import { check } from '@/http/userAPI';
import { useStore } from 'vuex';

const store = useStore();
const loading = ref(true);

watchEffect(() => {
  check().then(data => {
    store.dispatch('checkLogIn', data);
  }).finally(() => loading.value = false)
});

</script>

<template>
  <div v-if="loading" class="loading">
    <div class="loading__header"></div>
    <div class="loading__page">
      <div class="first__block">
        <div class="line1"></div>
        <div class="line1"></div>
        <div class="line1"></div>
      </div>
      <div class="second__block">
        <div class="line2"></div>
        <div class="line2"></div>
        <div class="line2"></div>
        <div class="line2"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <header-bar />
    <router-view />
  </div>
</template>

<style>
body {
  background: rgba(211, 234, 184, 0.2);
}

.loading {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.loading__header {
  height: 48px;
  background: #b7b7b7;
}

.loading__page {
  margin-top: 24px;
  margin-left: 64px;
  display: flex;
  gap: 24px;
}

.first__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 280px;
  height: 180px;
  background: #b7b7b7;
  border-radius: 4px;
}

.second__block {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 800px;
  height: 260px;
  background: #b7b7b7;
  border-radius: 4px;
}

.line1 {
  height: 46px;
  width: 250px;
  background: gray;
  border-radius: 4px;
}

.line2 {
  height: 180px;
  width: 180px;
  background: gray;
  border-radius: 4px;
}
</style>
