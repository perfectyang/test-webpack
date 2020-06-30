function Vue () {
}
Vue.prototype._init = function (options) {
  console.log('初始化', options)
}

Vue.extend = function (options) {
  const Super = this
  const Sub = function VueComponent(options) {
    this._init(options)
  }
  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
  return Sub
}


const subVue = Vue.extend({name: 'parent'})
const vm = new subVue({name: 'subVue'})
console.log(vm.__proto__ === subVue.prototype)