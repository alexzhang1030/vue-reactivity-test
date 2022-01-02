import { convert } from '../convert'

describe('convert test', () => {
  it('should ', () => {
    const obj = {
      foo: 'foo',
      bar: 'bar',
    }
    convert(obj)
    obj.foo = '123'
    expect(obj.foo).toBe('123')
  })
})
