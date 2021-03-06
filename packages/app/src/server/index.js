const express = require('express')
const session = require('express-session')
const ssrMiddleware = require('@my/ssr/node/ssrMiddleware')
const corsMiddlerware = require('./corsMiddlerware')
const csrfMiddleware = require('./csrfMiddleware')
const router = require('./router')

const app = express()

app.set('view engine', 'ejs')

app.use(session({
  resave: false,
  saveUninitialized: false,
  rolling: true,
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}))

app.use('/api', corsMiddlerware, csrfMiddleware, router)

ssrMiddleware(app)

app.listen(8080, () => {
  console.log('Starting server on http://localhost:8080')
})
