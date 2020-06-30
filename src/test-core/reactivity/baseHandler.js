import {hasOwn, hasChanged, isObject} from '../share/utils'
import {reactive} from './reactive'
import {track, trigger} from './effect'

const set = createSetter()
const get = createGetter()

function createGetter() {
  return function get(target, key, reciver) {
    const res = Reflect.get(target, key, reciver)
    console.log('读取数据')
    track(target, key, reciver);
    if (isObject(res)) {
      console.log('该数据是对象')
      return reactive(res)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value, reciver) {
    const oldValue = target[key]
    const hasKey = hasOwn(target, key)
    const result = Reflect.set(target, key, value, reciver)
    if (!hasKey) {
      trigger(target, 'add', key, value, reciver)
      console.log('新增')
    } else if (hasChanged(value, oldValue)) {
      console.log('修改属性')
      trigger(target, 'edit', key, value, reciver)
    }
    return result
  }
}

export const baseHandler = {
  set,
  get
}
