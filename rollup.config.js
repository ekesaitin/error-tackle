import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
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
    typescript(),
    resolve(),
    babel({
      // 过滤文件
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
  ],
  external: [/@babel\/runtime/],
}
