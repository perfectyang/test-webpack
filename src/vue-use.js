function Vue () {}

Vue.use = function (plugin) {
  const installPlugins = this._installPlugins || (this._installPlugins = [])
  if (installPlugins.indexOf(plugin) > -1) {
    return this
  }
  const args = [].slice.call(arguments)
  args.shift()
  args.unshift(this)
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)   
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }
  installPlugins.push(plugin)
  return this
}

// function myPlugin(...params) {
//   console.log(params)
// }
// Vue.use(myPlugin, {
//   name: 'aaa'
// }, {
//   age: 11
// })

// function myPlugin(...params) {
//   console.log(params)
// }
const myPlugin = {
  install (...args) {
    console.log(args)
  }
}
Vue.use(myPlugin, {
  name: 'aaa'
}, {
  age: 11
})