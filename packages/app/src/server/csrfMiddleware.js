const whiteList = require('./whiteList')

module.exports = function (req, res, next) {
  const Referer = req.get('Referer')
  const match = /^(?:https?:\/\/)[^/]*/.exec(Referer)
  // referer 弱验证
  if (!match || whiteList.includes(match[0])) {
    next()
  } else {
    res.status(403).end('403')
  }
}
