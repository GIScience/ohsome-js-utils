import typescript from 'rollup-plugin-typescript2';
import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import copy from 'rollup-plugin-copy';

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
    typescript(),
    generatePackageJson({
      inputFolder: '.',
      outputFolder: 'dist',
      baseContents: (packageJson) => {
        delete packageJson.scripts;
        delete packageJson.devDependencies;
        packageJson.exports = {
          './package.json': {
            'default': './package.json'
          },
          '.': {
            'types': './index.d.ts',
            'es2020': './ohsome-js-utils.mjs',
            'node': './ohsome-js-utils.umd.min.js',
            'default': './ohsome-js-utils.umd.min.js'
          }
        };
        packageJson.sideEffects = false;

        return packageJson;
      }
    }),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist',
          transform: (contents, filename) => contents.toString().replace('dist/', './') }
      ]
    })
  ]
});
