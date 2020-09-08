// const errorList = []

// const report = function () { }

let config = {
  concat: false,
  delay: 2000, // 错误处理间隔时间
  maxError: 5, // 异常报错数量限制
  sampling: 1 // 采样率
}

// 定义的错误类型码
const ERROR_RUNTIME = 1
const ERROR_SCRIPT = 2
const ERROR_STYLE = 3
const ERROR_IMAGE = 4
const ERROR_AUDIO = 5
const ERROR_VIDEO = 6
// var ERROR_CONSOLE = 7
// var ERROR_TRY_CATHC = 8
const ERROR_PROMISE = 9

const LOAD_ERROR_TYPE = {
  SCRIPT: ERROR_SCRIPT,
  LINK: ERROR_STYLE,
  IMG: ERROR_IMAGE,
  AUDIO: ERROR_AUDIO,
  VIDEO: ERROR_VIDEO,
  PROMISE: ERROR_PROMISE
}

/**
   * 设置一个采样率，决定是否上报
   *
   * @param  {Number} sampling 0 - 1
   * @return {Boolean}
   */
// function needReport (sampling) {
//   return Math.random() < (sampling || 1)
// }

/**
   * 往异常信息数组里面添加一条记录
   *
   * @param  {Object} errorLog 错误日志
   */
// function pushError (errorLog) {
//   if (needReport(config.sampling) && errorList.length < config.maxError) {
//     errorList.push(errorLog)
//   }
// }

/**
   * 错误数据预处理
   *
   * @param  {Object} errorLog    错误日志
   */
function handleError (errorLog) {
  config.report([errorLog])
}

/**
 * 生成 laod 错误日志
 *
 * @param  {Object} errorTarget
 * @return {Object}
 */
function formatLoadError (errorTarget) {
  return {
    type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
    desc: `${errorTarget.baseURI}@${errorTarget.src || errorTarget.href}`,
    stack: 'no stack'
  }
}

/**
   * 生成 runtime 错误日志
   *
   * @param  {String} message 错误信息
   * @param  {String} source  发生错误的脚本 URL
   * @param  {Number} lineno  发生错误的行号
   * @param  {Number} colno   发生错误的列号
   * @param  {Object} error   error 对象
   * @return {Object}
   */
function formatRuntimerError (message, source, lineno, colno, error) {
  return {
    type: ERROR_RUNTIME,
    desc: `${message} at ${source}:${lineno}:${colno}`,
    stack: error && error.stack ? error.stack : 'no stack' // IE <9, has no error stack
  }
}

export default function errorTracker (opts) {
  config = { ...config, ...opts }
  // 监听资源加载错误(JavaScript Scource failed to load)
  window.addEventListener('error', (event) => {
    // 过滤 target 为 window 的异常，避免与上面的 onerror 重复
    const errorTarget = event.target
    if (errorTarget !== window &&
      errorTarget.nodeName &&
      LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
      handleError(formatLoadError(errorTarget))
    } else {
      const {
        message, filename, lineno, colno, error
      } = event
      if (/Script error\./.test(message)) return
      handleError(formatRuntimerError(message, filename, lineno, colno, error))
    }
  }, true)

  // 监听开发中浏览器中捕获到未处理的Promise错误
  window.addEventListener('unhandledrejection', (event) => {
    handleError({
      desc: event.reason.message,
      stack: event.reason.stack,
      type: LOAD_ERROR_TYPE.PROMISE
    })
  }, true)
}
