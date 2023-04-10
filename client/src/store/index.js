import { createStore } from 'vuex';
/* eslint-disable */

export default createStore({
  state: {
    isAuth: false,
    user: {},
    types: [],
    brands: [],
    devices: [],
    device: {},
    page: 1,
    totalCount: 0,
    limit: 3,
    selectedType: null,
    selectedBrand: null,
    basket: []
  },
  getters: {
  },
  mutations: {
    logIn(state, user) {
      state.isAuth = true;
      state.user = user;
    },
    checkLogIn(state, user) {
      state.isAuth = true;
      state.user = user;
    },
    logOut(state) {
      state.isAuth = false;
      state.user = {};
    },
    setTypes(state, types) {
      state.types = types;
    },
    setBrands(state, brands) {
      state.brands = brands;
    },
    setDevices(state, devices) {
      state.devices = devices;
    },
    setDevice(state, device) {
      state.device = device;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalCount(state, count) {
      state.totalCount = count;
    },
    selectType(state, typeId) {
      state.selectedType = typeId;
    },
    selectBrand(state, brandId) {
      state.selectedBrand = brandId;
    },
    addDeviceToBasket(state, device) {
      if(state.basket[0]) {
        state.basket.forEach(el => {
          if(el.id === device.id) {
            el.quantity += 1
          }
        })
      } else {
        state.basket.push(device);
      }
    },
    removeDeviceFromBasket(state, deviceId) {
      state.basket.forEach(el => {
        if(el.id === deviceId && el.quantity > 1) {
          el.quantity -= 1
        } else {
          state.basket = state.basket.filter(el => el.id !== deviceId)
        }
      })
    },
  },
  actions: {
    logIn({ commit }, user) {
      commit('logIn', user);
    },
    checkLogIn({ commit }, user) {
      commit('checkLogIn', user);
    },
    logOut({ commit }) {
      commit('logOut');
    },
    setTypes({ commit }, types) {
      commit('setTypes', types);
    },
    setBrands({ commit }, brands) {
      commit('setBrands', brands);
    },
    setDevices({ commit }, devices) {
      commit('setDevices', devices);
    },
    setDevice({ commit }, device) {
      commit('setDevice', device);
    },
    setPage({ commit }, page) {
      commit('setPage', page);
    },
    setTotalCount({ commit }, count) {
      commit('setTotalCount', count)
    },
    selectType({ commit }, typeId) {
      commit('selectType', typeId)
    },
    selectBrand({ commit }, brandId) {
      commit('selectBrand', brandId)
    },
    addDeviceToBasket({ commit }, device) {
      commit('addDeviceToBasket', device)
    },
    removeDeviceFromBasket({ commit }, deviceId) {
      commit('removeDeviceFromBasket', deviceId)
    }
  },
  modules: {
  },
});
