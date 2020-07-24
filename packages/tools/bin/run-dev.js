#!/usr/bin/env node
const path = require('path')
var nodemon = require('nodemon')
const main = path.resolve(__dirname, '../node/runDev.js')
nodemon(main, [])
