#!/usr/bin/env node

const babelDir = require('@babel/cli/lib/babel/dir').default
const getbabelConfig = require('../utils/getbabelConfig')

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
  babelOptions: getbabelConfig({ isBrowser: false, transformCss: true })
})
