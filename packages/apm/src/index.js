import rule from './rule'
import init from './errorTracker'

let DEFAULT_CONFIG = {
  target: 'http://localhost:63457',
  pid: ''
}

const JS_TRACKER_ERROR_DISPLAY_MAP = {
  1: 'JS_RUNTIME_ERROR',
  2: 'SCRIPT_LOAD_ERROR',
  3: 'CSS_LOAD_ERROR',
  4: 'IMAGE_LOAD_ERROR',
  5: 'AUDIO_LOAD_ERROR',
  6: 'VIDEO_LOAD_ERROR',
  7: 'CONSOLE_ERROR',
  8: 'TRY_CATCH_ERROR'
}

var report = function (errorLogList = []) {
  for (const errorLog of errorLogList) {
    const { type, desc, stack } = errorLog

    const errorName = '页面报错_' + JS_TRACKER_ERROR_DISPLAY_MAP[type]

    const location = window.location

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

  init({ report })

  window.addEventListener('load', () => {
    const { performance } = window
    if (!performance) {
      console.log('你的浏览器不支持 performance 接口')
      return
    }
    const times = performance.timing.toJSON()

    log('perf', 20001, {
      ...times,
      url: `${window.location.host}${window.location.pathname}`
    })
  })

  const lastTime = Date.now()
  window.addEventListener('beforeunload', () => {
    const now = Date.now()
    const duration = { duration_ms: now - lastTime }
    log.product(10001, { duration_ms: duration })
  })
}

const detailAdapter = (code, detail = {}) => {
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
    fields.forEach(field => {
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
  } else {
    return detail
  }
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
    extra: extra,
    common: {
      pid: DEFAULT_CONFIG.pid,
      timestamp: Date.now(),
      page_type: window.location.href
    }
  }
  const img = new window.Image()
  img.src = `${DEFAULT_CONFIG.target}/monitor?d=${encodeURIComponent(JSON.stringify(logInfo))}`
}

log.product = (code, detail, extra) => {
  return log('product', code, detail, extra)
}
log.error = (code, detail, extra) => {
  return log('error', code, detail, extra)
}
log.info = (code, detail, extra) => {
  return log('info', code, detail, extra)
}

if (typeof window !== 'undefined') {
  window.dt = log
}
