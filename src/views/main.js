import router from '../router/index'

// import Vue from '../../node_modules/vue/dist/vue';
import Vue from 'vue'
// import { compile } from "vue-template-compiler";
import APP from './app.vue'
// import Header from './components/common/header.vue'
// import Home from './Home.vue'

Vue.use(router)

new Vue({
    el: '#app',
    data () {
        return {
            user: 'sssuser'
        }
    },
    render:c=>c("APP"),
    components: {
        APP
    }
});

console.log('main,,,,4444')