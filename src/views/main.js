import router from '../router/index'
import Vue from 'vue'
import APP from './App.vue'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '../assets/common/global.css'
import global_v from'../assets/common/global_v'

Vue.use(VueResource)
Vue.use(router)
// Vue.use(global_v)
Vue.use(iView,{
    // size: 'large'
})
Vue.prototype.globalV= global_v;

new Vue({
    render:c=>c(APP),
    router
}).$mount('#app');

console.log('main,,,,4444')