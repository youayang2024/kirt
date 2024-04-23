import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './style.css'
import '../node_modules/font-awesome/css/font-awesome.min.css';
import axios from 'axios' // C:\vuejs\myapp>npm install --save axios vue-axios
import VueTreeNavigation from 'vue-tree-navigation';
Vue.use(VueTreeNavigation);
import VueAxios from 'vue-axios'
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  axios,
  VueAxios,
  render: h => h(App)
}).$mount('#app')