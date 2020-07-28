import Vue from 'vue'
import App from './view/app.vue'
import {eventEmitter} from './utils/func'
Vue.prototype.eventEmitter = eventEmitter
new Vue({
  el: '#app',
  render: h => h(App)
})


// function debounce(fn, delay) {
//   var timer
//   return function (...args) {
//     const self = this
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(function () {
//       fn.apply(self, args)
//     }, delay)
//   } 
// }

// function throttle(fn, delay) {
//   var prvTime = 0
//   return function (...args) {
//     const nowTime = new Date().getTime()
//     if ((nowTime - prvTime) > delay) {
//       fn.apply(this, args)
//       prvTime = nowTime
//     }
//   }
// }

// function throttle (fn, delay) {
//   var flag = true
//   return function (...args) {
//     const self = this
//     if (!flag) return
//     flag = false
//     setTimeout(function() {
//       fn.apply(self, args)
//       flag = true
//     }, delay)
//   }
// }