import './less/index.less';
import Vue from 'vue'
import App from './view/app.vue'


const instance = new Vue({
  el: '#app',
  render: h => h(App)
})
console.log('instance', instance._data)