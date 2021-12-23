// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(Vuex);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

const store = new Vuex.Store({
  state: {
  },
  modules: {
    wallet: {
      namespaced: true,
      state: () => ({
        address: undefined
      }),
      actions: {
        setSelectedAddress: ({ commit }, address) => {
          commit('address', address);
        }
      },
      mutations: {
        address: (state, val) => {
          state.address = val;
        }
      },
      getters: {
        hasAddress: (state) => !!state.address,
        address: (state) => state.address
      }
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
});
