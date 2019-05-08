// const Vue = require('vue')
// const axios = require('axios');

// Vue.prototype.$http = axios;

// //GET请求
// export function getHttp(url, params) {}

// //POST请求
// export function postHttp(url, params) {}

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

//GET请求
export function getHttp(url, params) {
  return new Promise((resolve, reject) => {
    Vue.http.get({
        url: url,
        params: params,
        method: 'GET'
      })
      .then(response => {
        resolve(response)
      }, response => {      
        reject(response)
      })
  })
}

//POST请求
export function postHttp(url, params, body) {
  return new Promise((resolve, reject) => {
    Vue.http.post({
        url: url,
        params: params,
        body: JSON.stringify(body),
        method: 'POST'
      })
      .then(response => {
        resolve(response.body)
      }, response => {
        reject(response.bodyText)
      })
  })
}