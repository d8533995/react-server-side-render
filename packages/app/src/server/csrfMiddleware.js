const whiteList = require('./whiteList')

module.exports = function (req, res, next) {
  const Referer = req.get('Referer')
  if (Referer) { // referer 强验证,
    const match = /^(?:https?:\/\/)[^/]*/.exec(Referer)
    if (match && whiteList.includes(match[0])) {
      next()
      return
    }
  } else if (req.method === 'GET') { // GET弱验证
    next()
    return
  }
  res.status(403).end('403')
}
