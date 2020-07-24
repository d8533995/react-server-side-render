const express = require('express')
const session = require('express-session')
const { ssr } = require('@my/tools/node/ssrMiddleware')
const corsMiddlerware = require('./corsMiddlerware')
const csrfMiddleware = require('./csrfMiddleware')
const router = require('./router')

const app = express()

app.set('view engine', 'ejs')

app.use(session({
  rolling: true,
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}))

app.use('/api', corsMiddlerware, csrfMiddleware, router)

ssr(app)

app.listen(8080)
