import Vue from 'vue'
import App from './App.vue'
// import flyrobin from 'flyrobin'
import flyrobin from './index'

// import 'flyrobin/lib/theme/index.css'
import '../lib/theme/index.css'
Vue.use(flyrobin)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
