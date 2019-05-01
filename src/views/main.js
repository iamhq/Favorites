// import Vue from '../../vuenode_modules/vue/dist/vue';
import Vue from 'vue'
import Header from '../components/common/header.vue'

new Vue({
    el: '#app',
    render: h => h(Header),
    data: {
        user: 'sssuser'
    }

});

console.log('main,,,,')