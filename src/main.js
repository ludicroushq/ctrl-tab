import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.prototype.$browser = 'Chrome';
if (typeof InstallTrigger !== 'undefined') {
  Vue.prototype.$browser = 'Firefox';
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
