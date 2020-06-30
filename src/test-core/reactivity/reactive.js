import {isObject} from '../share/utils'
import {baseHandler} from './baseHandler'
export function reactive(target) {
  console.log('target', target)
  return createReactive(target, baseHandler)
}
export function createReactive(target, baseHandler) {
  if (!isObject(target)) {
    return target
  }
  const observed = new Proxy(target, baseHandler)
  return observed
}