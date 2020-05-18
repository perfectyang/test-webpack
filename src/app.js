// import Vue from 'vue'
// import App from './view/app.vue'

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
const toProxy = new WeakMap()
const toRaw = new WeakMap()

function reactive (target) {
  let proxy = toProxy.get(target)
  if (proxy) {
    return proxy
  }

  if (toRaw.has(target)) {
    return target
  }

  const handler = {
    get (target, key, reciver) {
      console.log('获取')
      const res = Reflect.get(target, key)
      return typeof res === 'object' ? reactive(res) : res
    },
    set (target, key, value, reciver) {
      const bool = !Object.prototype.hasOwnProperty.call(target, key)
      const res = Reflect.set(target, key, value)
      if (bool) {
        console.log('触发渲染', key)
      }
      return res
    }
  }

  proxy = new Proxy(target, handler)
  toProxy.set(target, proxy)
  toRaw.set(proxy, target)
  return proxy
}


// let obj = reactive({
//   name: 'perfectyang'
// })
// obj = reactive(obj)
// // console.log(obj.name)
// obj.name = '666'
// obj.name = '666'
// obj.name
// var arr = reactive([1, 2, 3])
// arr.push(4)




