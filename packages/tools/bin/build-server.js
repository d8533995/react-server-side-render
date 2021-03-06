#!/usr/bin/env node
process.env.NODE_ENV = 'production'

const babelDir = require('@babel/cli/lib/babel/dir').default
const babelConfig = require('../configs/babelConfig')
const { babelOutDir } = require('../configs/outputConfig')

babelDir({
  cliOptions: {
    outDir: babelOutDir,
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
  babelOptions: babelConfig({ isBrowser: false })
})
