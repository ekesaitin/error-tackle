import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

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
  ],
  external: [/@babel\/runtime/],
})
