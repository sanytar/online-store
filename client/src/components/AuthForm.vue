<script setup>
/* eslint-disable */
import DeInput from '@/components/UI/DeInput.vue';
import DeButton from '@/components/UI/DeButton.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, registration } from "@/http/userAPI";
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const isLoginPage = computed(() => router.currentRoute.value.path === '/login');

const headerContent = computed(() => (isLoginPage.value ? 'Authorization' : 'Registration'));
const buttonContent = computed(() => (isLoginPage.value ? 'Login' : 'Register'));
const passwordPlaceholder = computed(() => (isLoginPage.value ? 'Enter your password' : 'Create a password'));

const inputLogin = ref('');
const password = ref('');

const auth = async () => {
  try {
    let user;
    if(isLoginPage.value) {
      user = await login(inputLogin.value, password.value);
    } else {
      user = await registration(inputLogin.value, password.value);
    }
    await store.dispatch('logIn', user);
    await router.push('/');
  } catch (e) {
    alert(e.response.data.massage)
  }
};

</script>

<template>
  <div class="modal">
    <div class="modal__form">
      <h2 class="form__header">{{ headerContent }}</h2>
      <de-input v-model="inputLogin" placeholder="Enter your e-mail" />
      <de-input v-model="password" :placeholder="passwordPlaceholder" type="password" />
      <div class="form__buttons">
        <p v-if="isLoginPage">
          Don't have an account?
          <a class="buttons__link" @click="router.push('/registration')">Register</a>
        </p>
        <de-button @click="auth">{{ buttonContent }}</de-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.modal__form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 283px;
  padding: 24px;
  background: white;
  border: 1px solid #8BC34A;
  border-radius: 4px;
}

.form__header {
  font-size: 36px;
  font-weight: 300;
  color: #698E3E;
  text-shadow: 0px 4px 4px rgba(139, 195, 74, 0.3);
  cursor: default;
  user-select: none;
}

.form__buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 14px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: default;
  user-select: none;
}

.buttons__link {
  color: #698E3E;
  cursor: pointer;
  transition-duration: 300ms;
}

.buttons__link:hover {
  color: #4b652c;
  cursor: pointer;
  transition-duration: 300ms;
}
</style>
