const whiteList = require('./whiteList')

module.exports = function (req, res, next) {
  const origin = req.header('Origin')
  res.header({
    'access-control-allow-origin': whiteList.includes(origin) && origin,
    'access-control-allow-method': 'POST,GET,PUT,OPTOION',
    'access-control-allow-max-age': 3600,
    'access-control-allow-credentials': true
  })
  next()
}
