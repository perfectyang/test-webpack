import Vue from 'vue'
import App from './view/app.vue'


new Vue({
  el: '#app',
  render: h => h(App)
})
// import {add} from './test-js/add.js'
// import {plus} from './test-js/plus.js'

// console.log(add(1, 2))
// console.log(plus(2, 1))
// const arr = []

// for (var i = 0; i < 3; i++) {
//   arr[i] = function () {
//     console.log(i)
//   }
// }

// arr[0]()
// arr[1]()
// arr[2]()
// var scope = "global scope";
// function checkscope(){
//     var scope = "local scope";
//     function f(){
//         return scope;
//     }
//     return f;
// }

// console.log(checkscope()())