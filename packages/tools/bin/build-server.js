#!/usr/bin/env node

const babelDir = require('@babel/cli/lib/babel/dir').default
const babelConfig = require('../configs/babelConfig')

babelDir({
  cliOptions: {
    outDir: 'dist',
    filenames: ['./src'],
    extensions: null,
    keepFileExtension: null,
    verbose: true,
    watch: null,
    relative: null,
    copyFiles: true,
    includeDotfiles: true,
    skipInitialBuild: null
  },
  babelOptions: babelConfig({ isBrowser: false, transformCss: true })
})
