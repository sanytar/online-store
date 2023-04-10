import { createRouter, createWebHistory } from 'vue-router';
import Admin from '@/components/AdminPanel.vue';
import Auth from '@/components/AuthForm.vue';
import Basket from '@/components/UserBasket.vue';
import DevicePage from '@/components/DevicePage.vue';
import Shop from '@/components/ShopPage.vue';
import NotFound from '@/components/NotFound.vue';
import NoAccess from '@/components/NoAccess.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'shop',
    component: Shop,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (store.state.user.role === 'ADMIN') {
        next();
      } else {
        next('no-access');
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Auth,
  },
  {
    path: '/registration',
    name: 'registration',
    component: Auth,
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket,
    beforeEnter: (to, from, next) => {
      if (store.state.isAuth) {
        next();
      } else {
        next('no-access');
      }
    },
  },
  {
    path: '/device/:id',
    name: 'device',
    component: DevicePage,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFound,
  },
  {
    path: '/no-access',
    nameL: 'noAccess',
    component: NoAccess,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
