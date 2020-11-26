import Vue from 'vue'
import App from './view/app.vue'
new Vue({
  el: '#app',
  render: h => h(App)
})

// const arr = []
// let renderList = []
// for (let i = 1; i < 100; i++) {
//   arr.push(i)
// }
// let len = renderList.length
// renderList = arr.slice(len, len + 10)
// console.log('11', renderList)
// len = renderList.length
// renderList = arr.slice(0, len + 10)
// console.log('222', renderList)
// // let len = renderList.length + 10
// // console.log(arr)
// // len = renderList.length + 10
// // renderList = arr.slice(-len)
// // console.log('11', renderList)
// // len = renderList.length + 10
// // renderList = arr.slice(-len)
// // console.log('22', renderList)
// const lodash = require('lodash')
// const pages = [
//   1,  2,  3,  4,  5,  6,  7,
//   8,  9, 10, 11, 12, 13, 14,
//  15, 16, 17, 18, 19, 20
// ]
// const splitPage = (data) => lodash.chunk(data, 5)
// console.log(splitPage(pages))
// pages.push(21, 22, 23)
// console.log(splitPage(pages))