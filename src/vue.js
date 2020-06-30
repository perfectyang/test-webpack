function Vue (options) {
  if (!(this instanceof Vue)) {
    console.warn('vue is a constructor and should be called with `new` keyword ')
  }
  this._init(options)
}

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
  }
}