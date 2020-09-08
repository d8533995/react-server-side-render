import rule from './rule'
import errorTracker from './errorTracker'

let DEFAULT_CONFIG = {
  production: true,
  pid: '',
  performance: true, // 页面载入性能, 默认为true
  js_error: true //  是否监控页面报错信息, 默认为true
}

const JS_TRACKER_ERROR_DISPLAY_MAP = {
  1: 'js运行错误',
  2: 'js加载错误',
  3: 'css加载错误',
  4: '图片加载错误',
  5: '音频加载错误',
  6: '视频加载错误',
  7: 'console打印错误',
  8: 'tryCatch错误',
  9: 'Promise错误'
}

const detailAdapter = (code, data = {}) => {
  const detail = { ...data }
  const dbDetail = {
    error_no: '',
    http_code: '',
    during_ms: '',
    url: '',
    request_size_b: '',
    response_size_b: ''
  }
  // 查找rule
  const ruleItem = rule[code]
  if (ruleItem) {
    const d = { ...dbDetail }
    const fields = Object.keys(detail)
    fields.forEach((field) => {
      const transferField = ruleItem.dft[field]
      // 需要字段转换
      if (transferField) {
        // 需要字段转换
        d[transferField] = detail[field]
        delete detail[field]
      } else {
        d[field] = detail[field]
      }
    })
    return d
  }
  return detail
}

/**
 *
 * @param {类型} type
 * @param {code码} code
 * @param {消费数据} detail
 * @param {展示数据} extra
 */
function log (type = '', code, detail = {}, extra = {}) {
  const logInfo = {
    type,
    code,
    detail: detailAdapter(code, detail),
    extra,
    common: {
      pid: DEFAULT_CONFIG.pid,
      timestamp: Date.now(),
      page_type: window.location.href
    }
  }
  const img = new window.Image()
  const target = DEFAULT_CONFIG.production ? 'https://statis.esf.fangdd.com' : 'https://statis.esf.fangdd.net'
  img.src = `${target}/monitor?d=${encodeURIComponent(JSON.stringify(logInfo))}`
}

const report = function (errorLogList = []) {
  for (const errorLog of errorLogList) {
    const { type, desc, stack } = errorLog

    const errorName = JS_TRACKER_ERROR_DISPLAY_MAP[type]

    const { location } = window

    log('error', 7, {
      error_no: errorName,
      url: `${location.host}${location.pathname}`
    }, {
      desc,
      stack
    })
  }
}

log.init = (opts) => {
  DEFAULT_CONFIG = { ...DEFAULT_CONFIG, ...opts }
  if (DEFAULT_CONFIG.js_error) {
    errorTracker({ report })
  }
  if (DEFAULT_CONFIG.performance) {
    window.addEventListener('load', () => {
      const { performance } = window
      if (!performance) {
        console.log('你的浏览器不支持 performance 接口')
        return
      }
      const times = performance.timing.toJSON()

      log('perf', 20001, {
        ...times,
        url: `${window.location.host}${window.location.pathname.replace(/\/$/, '')}`
      })
    })
  }

  const lastTime = Date.now()
  window.addEventListener('beforeunload', () => {
    const now = Date.now()
    const duration = { duration_ms: now - lastTime }
    log.product(10001, { duration_ms: duration })
  })
}

log.product = (code, detail, extra) => log('product', code, detail, extra)
log.error = (code, detail, extra) => log('error', code, detail, extra)
log.info = (code, detail, extra) => log('info', code, detail, extra)

if (typeof window !== 'undefined') {
  window.dt = log
}

export default log
