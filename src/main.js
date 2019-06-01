import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'lib-flexible';
import "./assets/publicMethods.js"
import Vant from 'vant'
import 'vant/lib/index.css'

import './assets/reset.css'
axios.defaults.withCredentials = false
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://47.111.27.189:88'
// axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
