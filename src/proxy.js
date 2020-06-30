const noop = () => {}
const handler = {
  enumberable: true,
  configurable: true,
  get: noop,
  set: noop
}


function proxy(target, source, key) {
  handler.get = function proxyGetter () {
    return this[source][key]
  }
  handler.set = function proxySetter (val) {
    return this[source][key] = val 
  }
  Object.defineProperty(target, key, handler)
}

const vm = {
  _props: {
    name: 'perfectyang',
    age: 11
  }
}

const props = vm._props
for (let key in props) {
  proxy(vm, '_props', key)
}

console.log(vm.name = '666')

const vm = new Vue({
  data () {
    return {}
  }
})