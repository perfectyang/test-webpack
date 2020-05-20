import Vue from 'vue'
import App from './view/app.vue'
import {eventEmitter} from './utils/func'
Vue.prototype.eventEmitter = eventEmitter
new Vue({
  el: '#app',
  render: h => h(App)
})
