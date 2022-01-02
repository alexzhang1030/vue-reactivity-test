import { autorun, Dep } from '../autorun'

describe('autorun test', () => {
  let counter = 0
  it('result', () => {
    const dep = new Dep()
    autorun(() => {
      dep.depend()
      counter++
    })
    expect(counter).toBe(1)
    dep.notify()
    expect(counter).toBe(2)
  })
})
