function observe(obj) {
    return new Proxy(obj, {
        get(target, key) {
            const res = Reflect.get(target, key);
            track(target, key);
            return res;
        },
        set(target, key, value) {
            const res = Reflect.set(target, key, value);
            trigger(target, key);
            return res;
        },
    });
}
class ReactiveEffect {
    constructor(fn) {
        this._fn = fn;
    }
    run() {
        activeEffect = this;
        this._fn();
    }
}
let activeEffect;
const targetMap = new Map();
function autorun(fn) {
    const _effect = new ReactiveEffect(fn);
    _effect.run();
}
function track(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
    }
    deps.add(activeEffect);
}
function trigger(target, key) {
    targetMap
        .get(target)
        .get(key)
        .forEach(effect => effect.run());
}

function getEle(selector) {
    return document.querySelector(selector);
}
let counter = observe({
    value: 1,
});
let doubleCounter;
autorun(() => {
    doubleCounter = counter.value * 2;
});
getEle('#handle').addEventListener('click', () => {
    counter.value++;
    render();
});
function render() {
    getEle('#counter').textContent = counter.value;
    getEle('#doubleCounter').textContent = doubleCounter;
}
render();
