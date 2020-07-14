const express = require('express')
const { ssr } = require('@my/tools/ssrMiddleware')
const corsMiddlerware = require('./corsMiddlerware')
const csrfMiddleware = require('./csrfMiddleware')
const router = require('./router')

const app = express()

app.set('view engine', 'ejs')

app.use('/api', corsMiddlerware, csrfMiddleware, router)

ssr(app)

app.listen(8080)
