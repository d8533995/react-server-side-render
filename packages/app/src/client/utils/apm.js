// import '../libary/apm-sdk'
import Cookies from 'js-cookie'

if (typeof window !== 'undefined' && window.dt) {
  const uuid = Cookies.get('_fa') || ''
  window.dt.set({
    pid: 'hello_fee', // [必填]项目id, 由灯塔项目组统一分配
    uuid, // [可选]设备唯一id, 用于计算uv数&设备分布. 一般在cookie中可以取到, 没有uuid可用设备mac/idfa/imei替代. 或者在storage的key中存入随机数字, 模拟设备唯一id.
    ucid: '', // [可选]用户ucid, 用于发生异常时追踪用户信息, 一般在cookie中可以取到, 没有可传空字符串
    is_test: false, // 是否为测试数据, 默认为false(测试模式下打点数据仅供浏览, 不会展示在系统中)
    record: {
      time_on_page: true, // 是否监控用户在线时长数据, 默认为true
      performance: true, // 是否监控页面载入性能, 默认为true
      js_error: true, //  是否监控页面报错信息, 默认为true
      // 配置需要监控的页面报错类别, 仅在js_error为true时生效, 默认均为true(可以将配置改为false, 以屏蔽不需要上报的错误类别)
      js_error_report_config: {
        ERROR_RUNTIME: true, // js运行时报错
        ERROR_SCRIPT: true, // js资源加载失败
        ERROR_STYLE: true, // css资源加载失败
        ERROR_IMAGE: true, // 图片资源加载失败
        ERROR_AUDIO: true, // 音频资源加载失败
        ERROR_VIDEO: true, // 视频资源加载失败
        ERROR_CONSOLE: true, // vue运行时报错
        ERROR_TRY_CATCH: true, // 未catch错误
        // 自定义检测函数, 上报前最后判断是否需要报告该错误
        // 回调函数说明
        // 传入参数 =>
        //            desc:  字符串, 错误描述
        //            stack: 字符串, 错误堆栈信息
        // 返回值 =>
        //            true  : 上报打点请求
        //            false : 不需要上报
        checkErrrorNeedReport: function (desc, stack) {
          return true
        }
      }
    },
    getPageType: function (location) { return 'localhost:8081/fee' }
  })
}
// function sendError (msg) {
//   let img = document.createElement('img')
//   img.src = `http://localhost:8081/error?errorStack=${msg}`
//   img.onload = () => {
//     img = null
//   }
// }
// if (typeof window !== 'undefined') {
//   window.addEventListener('error', function (e) {
//     var link = ''
//     if (e.message) {
//       link += '&extrajson=' + (e.filename || '') + ' ' + (e.lineno || '')
//       link += '&subpro=' + (e.message || '')
//       link += '&monitorType=jsError'
//     } else {
//       link += '&extrajson=' + (e.target.src || '')
//       link += '&subpro=' + (e.target.localName || '') + (e.type || '')
//       link += '&monitorType=loadError'
//     }
//     sendError(e.error.stack.split(/\n */g).join(','))
//   }, true)

//   window.addEventListener('unhandledrejection', (e) => {
//     sendError(e.reason.stack.split(/\n {1,}/).join(','))
//   }, true)
// }
