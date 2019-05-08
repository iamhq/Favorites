import router from '../router/index'
import Vue from 'vue'
import APP from './app.vue'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '../assets/common/global.css'

Vue.use(VueResource)
Vue.use(router)
Vue.use(iView,{
    // size: 'large'
})

new Vue({
    render:c=>c(APP),
    router
}).$mount('#app');

console.log('main,,,,4444')