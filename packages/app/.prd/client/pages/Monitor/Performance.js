"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Performance;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _reactRouterDom = require("react-router-dom");

var _core = _interopRequireDefault(require("echarts-for-react/lib/core"));

var _echarts = _interopRequireDefault(require("echarts/lib/echarts"));

require("echarts/lib/chart/line");

require("echarts/lib/component/title");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/grid");

require("echarts/lib/component/dataZoomInside");

var _request = _interopRequireDefault(require("../../utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const styles = {
  "chart": "_3XAi7",
  "times": "_1u8LG",
  "errorList": "_1WYhZ"
};

function Performance() {
  const echartsInstance = (0, _react.useRef)();
  const [urlList, setUrlList] = (0, _react.useState)([]);
  const [overview, setOverview] = (0, _react.useState)({});
  const [startTime, setStartTime] = (0, _react.useState)((0, _moment.default)().subtract(30, 'minute').format('YYYY-MM-DD HH:mm'));
  const [endTime, setEndTime] = (0, _react.useState)();
  const [url, setUrl] = (0, _react.useState)();
  const [lineChart, setLineChart] = (0, _react.useState)([]);
  const {
    dns_lookup_ms,
    dom_parse_ms,
    dom_ready_ms,
    first_render_ms,
    first_response_ms,
    first_tcp_ms,
    load_complete_ms,
    load_resource_ms,
    response_request_ms,
    response_transfer_ms,
    ssl_connect_ms,
    tcp_connect_ms
  } = overview;
  const {
    projectId
  } = (0, _reactRouterDom.useParams)();

  function search() {
    if (url) {
      (0, _request.default)({
        path: `/project/${projectId}/api/performance/url/overview`,
        qs: {
          summaryBy: 'minute',
          url,
          st: (0, _moment.default)(startTime).valueOf(),
          et: endTime ? (0, _moment.default)(endTime).valueOf() : undefined
        }
      }).then(({
        data: {
          data
        }
      }) => {
        setOverview(data);
      });
    } else {
      (0, _request.default)({
        path: `/project/${projectId}/api/performance/project/overview`,
        qs: {
          summaryBy: 'minute',
          st: (0, _moment.default)(startTime).valueOf(),
          et: endTime ? (0, _moment.default)(endTime).valueOf() : undefined
        }
      }).then(({
        data: {
          data
        }
      }) => {
        setOverview(data);
      });
    }

    if (url) {
      (0, _request.default)({
        path: `/project/${projectId}/api/performance/url/line_chart`,
        qs: {
          summaryBy: 'minute',
          url,
          st: (0, _moment.default)(startTime).valueOf(),
          et: endTime ? (0, _moment.default)(endTime).valueOf() : undefined
        }
      }).then(({
        data: {
          data
        }
      }) => {
        setLineChart(data);
      });
    }
  }

  (0, _react.useEffect)(() => {
    (0, _request.default)({
      path: `/project/${projectId}/api/performance/url_list`,
      qs: {
        summaryBy: 'minute',
        st: (0, _moment.default)(startTime).valueOf(),
        et: endTime ? (0, _moment.default)(endTime).valueOf() : undefined
      }
    }).then(({
      data: {
        data
      }
    }) => {
      setUrlList(data);
    });
  }, [startTime, endTime]);
  (0, _react.useEffect)(() => {
    window.echartsInstance = echartsInstance.current.getEchartsInstance();
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", null, "\u5F00\u59CB\u65F6\u95F4", /*#__PURE__*/_react.default.createElement("input", {
    value: startTime,
    onChange: e => {
      setStartTime(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement("br", null), "\u7ED3\u675F\u65F6\u95F4", /*#__PURE__*/_react.default.createElement("input", {
    value: endTime,
    onChange: e => {
      setEndTime(e.target.value);
    }
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("select", {
    value: url,
    onChange: e => {
      setUrl(e.target.value);
    },
    style: {
      width: 200
    }
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "\u9009\u62E9url"), urlList.map(i => /*#__PURE__*/_react.default.createElement("option", {
    key: i,
    value: i
  }, i))), /*#__PURE__*/_react.default.createElement("select", {
    onChange: e => {
      const now = (0, _moment.default)();
      now.clone().subtract(15, 'minute');

      switch (e.target.value) {
        case '1':
          setStartTime(now.clone().subtract(5, 'minute').format('YYYY-MM-DD HH:mm'));
          break;

        case '2':
          setStartTime(now.clone().subtract(10, 'minute').format('YYYY-MM-DD HH:mm'));
          break;

        case '3':
          setStartTime(now.clone().subtract(30, 'minute').format('YYYY-MM-DD HH:mm'));
          break;
      }
    },
    style: {
      width: 200
    }
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "3"
  }, "\u6700\u8FD130\u5206\u949F"), /*#__PURE__*/_react.default.createElement("option", {
    value: "1"
  }, "\u6700\u8FD15\u5206\u949F"), /*#__PURE__*/_react.default.createElement("option", {
    value: "2"
  }, "\u6700\u8FD110\u5206\u949F")), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("input", {
    type: "button",
    value: "\u67E5\u8BE2",
    onClick: search
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", {
    className: styles.times
  }, /*#__PURE__*/_react.default.createElement("span", null, "DNS\u67E5\u8BE2\u8017\u65F6\uFF1A", dns_lookup_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "TCP\u94FE\u63A5\u8017\u65F6\uFF1A", tcp_connect_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "\u8BF7\u6C42\u54CD\u5E94\u8017\u65F6\uFF1A", response_request_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "\u5185\u5BB9\u4F20\u8F93\u8017\u65F6\uFF1A", response_transfer_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "DOM\u89E3\u6790\u8017\u65F6\uFF1A", dom_parse_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "\u8D44\u6E90\u52A0\u8F7D\u8017\u65F6\uFF1A", load_resource_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "SSL\u8FDE\u63A5\u8017\u65F6\uFF1A", ssl_connect_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "\u5F00\u59CB\u89E3\u6790HTML\u8017\u65F6\uFF1A", first_render_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "\u9996\u5305\u65F6\u95F4\u8017\u65F6\uFF1A", first_tcp_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "\u9996\u6B21\u53EF\u64CD\u4F5Cdom\u8017\u65F6\uFF1A", first_response_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "DOM_READY_\u8017\u65F6\uFF1A", dom_ready_ms, "ms"), /*#__PURE__*/_react.default.createElement("span", null, "\u9875\u9762\u5B8C\u5168\u52A0\u8F7D\u8017\u65F6\uFF1A", load_complete_ms, "ms")), /*#__PURE__*/_react.default.createElement("div", {
    className: styles.chart
  }, /*#__PURE__*/_react.default.createElement(_core.default, {
    ref: echartsInstance,
    notMerge: true,
    lazyUpdate: true,
    echarts: _echarts.default,
    option: {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: lineChart.map(i => i.index)
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'DNS查询耗时(domainLookupEnd-domainLookupStart)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.dns_lookup_ms)
      }, {
        name: 'TCP链接耗时(connectEnd-connectStart)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.tcp_connect_ms)
      }, {
        name: '请求响应耗时(responseStart-requestStart)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.response_request_ms)
      }, {
        name: '内容传输耗时(responseEnd-responseStart)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.response_transfer_ms)
      }, {
        name: 'DOM解析耗时(domInteractive-responseEnd)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.dom_parse_ms)
      }, {
        name: '资源加载耗时(loadEventStart-domContentLoadedEventEnd)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.load_resource_ms)
      }, {
        name: '首包耗时(responseStart-domainLookupStart)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.first_tcp_ms)
      }, {
        name: '开始解析HTML耗时(responseEnd-fetchStart)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.first_render_ms)
      }, {
        name: 'DOM_READY_耗时(domContentLoadedEventEnd-fetchStart)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.dom_ready_ms)
      }, {
        name: '页面完全加载耗时(loadEventStart-fetchStart)',
        type: 'line',
        stack: '总量',
        data: lineChart.map(i => i.load_complete_ms)
      }]
    }
  })));
}