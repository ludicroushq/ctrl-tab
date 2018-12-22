import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.prototype.$browser = 'Chrome';
if (typeof InstallTrigger !== 'undefined') {
  Vue.prototype.$browser = 'Firefox';
}

Vue.use(VueAnalytics, {
  id: 'UA-125953849-3',
  router,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
