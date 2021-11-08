import path from 'path'
import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import pkg from './package.json'

const resolve = (...args) => path.resolve(__dirname, ...args)

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    typescript(),
    babel({
      // 过滤文件
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    alias({
      entries: [{ find: '@', replacement: resolve('src') }],
    }),
  ],
  external: [/@babel\/runtime/],
})
