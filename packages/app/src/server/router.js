const express = require('express')
const { outputPath } = require('@my/tools/configs/outputConfig')
const path = require('path')
const fs = require('fs')
const { SourceMapConsumer } = require('source-map')

const router = express.Router()

router.post('/post/json', function (req, res) {
  res.json({ success: true })
})

router.post('/post/urlencode', function (req, res) {
  res.format({
    text: function () {
      res.send('123')
    }
  })
})

router.post('/post/form', function (req, res) {
  res.format({
    html: function () {
      res.send('<h2>success</h2>')
    }
  })
})

router.get('/haha', function (req, res) {
  let buffer = ''
  req.on('data', (chunk) => {
    buffer += chunk.toString('utf-8')
    console.log(buffer)
  })
  res
    .header({
      'Cache-Control': 'public,max-age=20'
    })
    .send('123')
})

router.get('/error', function (req, res) {
  const { errorStack } = req.query
  const rawLines = errorStack.split(',')
  const transforms = rawLines.map(i => new Promise(resolve => {
    try {
      const match = /([^/]+.js):(\d+):(\d+)/g.exec(i)
      if (!match) throw Error('不匹配')
      const data = fs.readFileSync(path.resolve(path.join(outputPath, `${match[1]}.map`)))
      const sourceMapRaw = data.toString()
      SourceMapConsumer.with(sourceMapRaw, null, consumer => {
        const pos = consumer.originalPositionFor({
          line: +match[2],
          column: +match[3]
        })
        const { source, line, column } = pos
        if (!source) throw Error('没找到对应sourcemap文件')
        resolve(i.replace(/([^\s^(]+.js):(\d+):(\d+)/g, `${source}:${line}:${column}`))
      })
    } catch (e) {
      resolve(i)
    }
  }))
  Promise.all(transforms).then(data => {
    res
      .status(200)
      .header({
        'Content-Type': 'text/plain;charset=utf-8'
      })
      .end(JSON.stringify(data.join('\n  ')))
  })
})

module.exports = router
