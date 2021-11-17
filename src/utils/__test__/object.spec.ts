import { getSourceFromStack, obj2query } from '../object'

describe('utils-object', () => {
  test('obj2query', () => {
    expect(obj2query({ name: 'xxx', age: 111 })).toBe('?name=xxx&age=111')
    expect(obj2query({ name: 'xxx', age: 111 }, false)).toBe('name=xxx&age=111')
    expect(obj2query({})).toBe('')
    expect(obj2query([])).toEqual([])
    expect(obj2query(123 as any)).toEqual(123)
  })

  test('getSourceFromStack', () => {
    const stack1 = getSourceFromStack(`Error
    at triggerHttpError (http://127.0.0.1:5500/examples/index.html:59:13)
    at HTMLButtonElement.onclick (http://127.0.0.1:5500/examples/index.html:14:42)`)
    expect(stack1?.name).toBe('triggerHttpError')
    expect(stack1?.source).toBe('http://127.0.0.1:5500/examples/index.html')
    expect(stack1?.lineno).toBe(59)
    expect(stack1?.colno).toBe(13)

    const stack2 = getSourceFromStack(`Error
    at Proxy.triggerFetchError (webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/HelloWorld.vue?vue&type=script&lang=js:39:7)
    at Object.onClick._cache.<computed>._cache.<computed> (webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/HelloWorld.vue?vue&type=template&id=469af010:32:71)
    at callWithErrorHandling (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:6824:22)
    at callWithAsyncErrorHandling (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:6833:21)
    at HTMLButtonElement.invoker (webpack-internal:///./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:619:97)`)
    expect(stack2?.name).toBe('Proxy.triggerFetchError')
    expect(stack2?.source).toBe(
      'webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/HelloWorld.vue?vue&type=script&lang=js',
    )
    expect(stack2?.lineno).toBe(39)
    expect(stack2?.colno).toBe(7)

    const stack3 = getSourceFromStack(`ReferenceError: cc is not defined
    at http://127.0.0.1:5500/examples/index.html:29:11`)
    expect(stack3?.name).toBeUndefined()
    expect(stack3?.source).toBe('http://127.0.0.1:5500/examples/index.html')
    expect(stack3?.lineno).toBe(29)
    expect(stack3?.colno).toBe(11)

    expect(getSourceFromStack('')).toBeNull()
    expect(getSourceFromStack('at callWithErrorHandling (webpack-internal:')).toBeNull()
    expect(getSourceFromStack({} as any)).toBeNull()
  })
})
