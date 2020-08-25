const babelConfig = require('@my/tools/configs/babelConfig')
const babelDir = require('@babel/cli/lib/babel/dir').default

babelDir({
  cliOptions: {
    outDir: 'esm',
    filenames: ['./src'],
    extensions: null,
    keepFileExtension: null,
    verbose: true,
    watch: null,
    relative: null,
    copyFiles: false,
    includeDotfiles: true,
    skipInitialBuild: null
  },
  babelOptions: babelConfig({ isBrowser: true })
})
