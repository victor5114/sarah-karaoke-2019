import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/store';
import './registerServiceWorker';

import '@/assets/styles/normalize.css';
import '@/assets/styles/utility.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
