<script setup>
/* eslint-disable */
import DeButton from '@/components/UI/DeButton.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const buttonContent = computed(() => {
  let result;
  if (store.state.isAuth) {
    result = 'Exit';
  } else if (router.currentRoute.value.name === 'login') {
    result = "Registration";
  } else {
    result = 'Login';
  }
  return result;
});

const clickOnButton = () => {
  if (store.state.isAuth) {
    store.dispatch('logOut');
    localStorage.removeItem('token')
  } else {
    router.currentRoute.value.name === 'login' ? router.push('/registration') : router.push('/login');
  }
}

</script>

<template>
  <div class="header">
    <div class="header__navigation">
      <div class="header__logo" @click="router.push('/')">
        <img src="../assets/icons/logo.svg" alt="logo">
        <p>DeviceX</p>
      </div>
      <div class="header__user-bar">
        <p v-if="store.state.user.role === 'ADMIN'" class="user-bar__user" @click="router.push({ name: 'admin' })">Admin</p>
        <span v-if="store.state.isAuth" class="user-bar__basket" @click="router.push({ name: 'basket' })">
          <img src="../assets/icons/basket.svg" alt="basket-icon" />
        </span>
        <de-button @click="clickOnButton">{{ buttonContent }}</de-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  padding: 0 12px;
  font-size: 18px;
  box-shadow: 0px 4px 4px rgba(139, 195, 74, 0.1);
  background: white;
}

.header__navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1078px;
  width: 100%;
  height: 48px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition-duration: 300ms;
}

.header__logo:hover {
  transition-duration: 300ms;
  transform: scale(0.99);
}

.header__logo:active {
  transition-duration: 300ms;
  transform: scale(0.97);
}

.header__user-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-bar__user {
  transition-duration: 300ms;
}

.user-bar__user:hover {
  cursor: pointer;
  color: #698E3E;
  text-shadow: 0px 4px 4px rgba(105, 142, 62, 0.3);
  transition-duration: 300ms;
}

.user-bar__user:active {
  transform: scale(0.97);
  transition-duration: 300ms;
}

.user-bar__basket:hover {
  cursor: pointer;
  transition-duration: 300ms;
}
</style>
