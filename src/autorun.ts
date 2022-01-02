type subscribeItem = Function

export class Dep {
  subscribers: Set<subscribeItem>
  constructor() {
    this.subscribers = new Set()
  }
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }
  notify() {
    this.subscribers.forEach(effect => effect())
  }
}

let activeEffect

export function autorun(effect) {
  function wrapperEffect() {
    activeEffect = wrapperEffect
    effect()
    activeEffect = null
  }
  wrapperEffect()
}
