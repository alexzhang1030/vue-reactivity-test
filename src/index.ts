import { observe, autorun } from './observe'

function getEle(selector): HTMLElement {
  return document.querySelector(selector)
}

let counter = observe({
  value: 1,
})

let doubleCounter

autorun(() => {
  doubleCounter = counter.value * 2
})

getEle('#handle').addEventListener('click', () => {
  counter.value++
  render()
})

function render() {
  getEle('#counter').textContent = counter.value
  getEle('#doubleCounter').textContent = doubleCounter
}

render()
