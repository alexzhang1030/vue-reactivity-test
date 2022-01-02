export function observe(obj) {
  return new Proxy(obj, {
    get(target, key) {
      const res = Reflect.get(target, key)
      track(target, key)
      return res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
    },
  })
}

class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    this._fn()
  }
}

let activeEffect

const targetMap = new Map()

export function autorun(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

function track(target: any, key: string | symbol) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(activeEffect)
}
function trigger(target: any, key: string | symbol) {
  targetMap
    .get(target)
    .get(key)
    .forEach(effect => effect.run())
}
