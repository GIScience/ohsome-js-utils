import typescript from 'rollup-plugin-typescript2';
import {defineConfig} from 'rollup';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: 'src/index.ts',
  external: ['moment'],
  output: [
    {
      file: 'dist/ohsome-js-utils.mjs',
      format: 'module',
      exports: 'named',
      globals: { moment: 'moment_' },
    },
    {
      file: 'dist/ohsome-js-utils.umd.min.js',
      format: 'umd',
      exports: 'named',
      name: 'OhsomeJsUtils',
      globals: { moment: 'moment_' },
      plugins: [terser()]
    }
  ],
  plugins: [
    typescript()
  ]
});
