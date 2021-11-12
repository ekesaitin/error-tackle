import path from 'path'
import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

const resolve = (...args) => path.resolve(__dirname, ...args)
const input = resolve('src/index.ts')

export default defineConfig([
  {
    input,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
      babel({
        // 过滤文件
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
      }),
      alias({
        entries: [{ find: 'src', replacement: resolve('src') }],
      }),
    ],
    external: [/@babel\/runtime/],
  },
  {
    input,
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [dts()],
  },
])
