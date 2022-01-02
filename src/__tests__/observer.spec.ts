import { autorun, observe } from '../observe'

describe('observer test', () => {
  it('result', () => {
    const counter = observe({
      value: 1,
    })
    let doubleCounter
    autorun(() => {
      doubleCounter = counter.value * 2
    })
    expect(doubleCounter).toBe(2)
    counter.value++
    expect(doubleCounter).toBe(4)
  })
})
