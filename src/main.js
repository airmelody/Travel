import Vue from 'vue'

import App from './App.vue'
import router from './router'

// import './assets/main.css'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'

import 'vant/lib/index.css'
import { Swipe, SwipeItem } from 'vant'

Vue.use(Swipe)
Vue.use(SwipeItem)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
