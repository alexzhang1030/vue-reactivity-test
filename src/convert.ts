export function convert(obj) {
  Object.keys(obj).forEach(key => {
    let value
    Object.defineProperty(obj, key, {
      get() {
        console.log(`${key} is getting`)
        return value
      },
      set(newValue) {
        console.log(`${key} is setting`)
        value = newValue
      },
    })
  })
}
