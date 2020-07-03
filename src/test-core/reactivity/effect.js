
export function effect(fn, options={}) {
  const effect = createEffective(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}
let uid = 0;
let effectStack = [];
let activeEffect;

function createEffective(fn, options) {
  const effect = function reactiveEffect () {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect);
        activeEffect = effect;
        return fn();
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  }
  effect.options = options;
  effect.uid = uid++;
  effect.deps = [];
  return effect
}

const targetMap = new WeakMap()
export function track(target, key) {
  if (!activeEffect) {
    return
  }
  let maps = targetMap.get(target)
  if (!maps) {
    targetMap.set(target, (maps = new Map()))
  }
  let deps = maps.get(key)
  if (!deps) {
    maps.set(key, (deps = new Set()))
  }
  if (!deps.has(activeEffect)) {
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
  }
}

export function trigger(target, type, key, value, reciver) {
  let maps = targetMap.get(target)
  if (!maps) {
    return
  }
  const computed = new Set();
  const effects = new Set();
  const add = (effectToAdd) => {
    effectToAdd.forEach(effect => {
      if (effect.options.computed) {
        computed.add(effect)
      } else {
        effects.add(effect)
      }
    })
  }

  if (type === 'edit') {
    add(maps.get(key))
  }

  const run = (effect) => {
    if (effect.options.scheduler) {
      effect.options.scheduler()
    } else {
      effect()
    }
  }
  computed.forEach(run)
  effects.forEach(run)

}
