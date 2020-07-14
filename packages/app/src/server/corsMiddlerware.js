const whiteList = require('./whiteList')

module.exports = function (req, res, next) {
  console.log(req.path, req.method)
  const origin = req.header('Origin')
  res.header({
    'Access-Control-Allow-origin': whiteList.includes(origin) && origin,
    'Access-Control-Allow-method': 'POST,GET,PUT,OPTIONS',
    'Access-Control-Allow-max-age': 60,
    'Access-Control-Allow-credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
}
