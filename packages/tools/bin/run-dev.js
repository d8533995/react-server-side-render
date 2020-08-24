#!/usr/bin/env node
const path = require('path')
const nodemon = require('nodemon')

process.env.NODE_ENV = 'development'

const main = path.resolve(__dirname, '../node/runDev.js')
nodemon(main, [])
