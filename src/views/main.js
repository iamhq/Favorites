// import router from '../router/vue_router'

// import Vue from '../../node_modules/vue/dist/vue';
import Vue from 'vue'
// import { compile } from "vue-template-compiler";
// import APP from './app.vue'
// import Header from './components/common/header.vue'
import Home from './Home.vue'

new Vue({
    el: '#app',
    data () {
        return {
            user: 'sssuser'
        }
    },
    render:c=>c("Home"),
    components:{
        Home
    }  

});

console.log('main,,,,4444')