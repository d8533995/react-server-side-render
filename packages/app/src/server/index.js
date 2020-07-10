const express = require('express')
const path = require('path')
// const ejs = require('ejs')
const fs = require('fs')
const { SourceMapConsumer } = require('source-map')
const { ssr } = require('@my/tools/ssrMiddleware')
const { outputPath } = require('@my/tools/utils/getOutputConfig')

const app = express()
const router = express.Router()

app.set('view engine', 'ejs')

router.all('/haha', function (req, res, next) {
  let buffer = ''
  req.on('data', (chunk) => {
    buffer += chunk.toString('utf-8')
    console.log(buffer)
  })
  res.status(200).header({
    'Cache-Control': 'public,max-age=20'
  }).end('123')
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
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.status(200).end(JSON.stringify(data.join('\n  ')))
  })
})

app.use(router)

ssr(app)

app.listen(8080)
