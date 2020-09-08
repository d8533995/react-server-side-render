"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorList;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _request = _interopRequireDefault(require("../../utils/request"));

var _reactRouter = require("react-router");

var _moment = _interopRequireDefault(require("moment"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  Column
} = _antd.Table;
const JS_TRACKER_ERROR_DISPLAY_MAP = ['JS_RUNTIME_ERROR', 'SCRIPT_LOAD_ERROR', 'CSS_LOAD_ERROR', 'IMAGE_LOAD_ERROR', 'CONSOLE_ERROR', 'TRY_CATCH_ERROR', 'PROMISE_ERROR'];
const TIME_MAP = {
  '过去 15 分钟': () => ({
    start: (0, _moment.default)().subtract('minutes', 15).unix()
  }),
  '过去 30 分钟': () => ({
    start: (0, _moment.default)().subtract('minutes', 30).unix()
  }),
  '过去 1 小时': () => ({
    start: (0, _moment.default)().subtract('hours', 1).unix()
  }),
  '过去 4 小时': () => ({
    start: (0, _moment.default)().subtract('hours', 4).unix()
  }),
  '过去 12 小时': () => ({
    start: (0, _moment.default)().subtract('hours', 12).unix()
  }),
  '过去 24 小时': () => ({
    start: (0, _moment.default)().subtract('hours', 24).unix()
  }),
  '过去 7 天': () => ({
    start: (0, _moment.default)().subtract('days', 7).unix()
  })
};

function ErrorList() {
  const [loading, setLoading] = (0, _react.useState)(false);
  const [erorrType, setErrorType] = (0, _react.useState)(['页面报错_JS_RUNTIME_ERROR', '页面报错_PROMISE_ERROR']);
  const [errorList, setErrorList] = (0, _react.useState)([]);
  const [time, setTime] = (0, _react.useState)('过去 30 分钟');
  const {
    projectId
  } = (0, _reactRouter.useParams)();

  function searchErrorList() {
    setLoading(true);
    const {
      start,
      end
    } = TIME_MAP[time]();
    (0, _request.default)({
      path: `/project/${projectId}/api/error/log/list`,
      qs: {
        error_name_list_json: erorrType,
        start_at: start,
        end_at: end
      }
    }).then(({
      data: {
        data
      }
    }) => {
      setLoading(false);
      setErrorList(data.list);
    });
  }

  (0, _react.useEffect)(() => {
    searchErrorList();
  }, [erorrType, time]);
  return /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: loading
  }, /*#__PURE__*/_react.default.createElement(_antd.Checkbox.Group, {
    options: JS_TRACKER_ERROR_DISPLAY_MAP.map(i => '页面报错_' + i),
    value: erorrType,
    onChange: value => setErrorType(value)
  }), /*#__PURE__*/_react.default.createElement("select", {
    value: time,
    onChange: e => {
      setTime(e.target.value);
    }
  }, Object.keys(TIME_MAP).map(i => /*#__PURE__*/_react.default.createElement("option", {
    value: i,
    key: i
  }, i))), /*#__PURE__*/_react.default.createElement(_antd.Table, {
    pagination: false,
    dataSource: errorList
  }, /*#__PURE__*/_react.default.createElement(Column, {
    title: "\u9519\u8BEF\u6D88\u606F\u63CF\u8FF0",
    dataIndex: "desc",
    key: "desc",
    render: i => /*#__PURE__*/_react.default.createElement("div", {
      style: {
        wordBreak: 'break-all'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: `/error/${projectId}?desc=${i}`
    }, i === null || i === void 0 ? void 0 : i.split(/\sat\s|@/)[0]), /*#__PURE__*/_react.default.createElement("p", null, i === null || i === void 0 ? void 0 : i.split(/\sat\s|@/)[1]))
  }), /*#__PURE__*/_react.default.createElement(Column, {
    width: 200,
    title: "\u9519\u8BEF\u7C7B\u578B",
    dataIndex: "error_name",
    key: "error_name"
  }), /*#__PURE__*/_react.default.createElement(Column, {
    width: 100,
    title: "\u53D1\u751F\u6B21\u6570",
    dataIndex: "count",
    key: "count"
  }), /*#__PURE__*/_react.default.createElement(Column, {
    width: 200,
    title: "\u6700\u540E\u4E00\u6B21\u53D1\u751F\u65F6\u95F4",
    dataIndex: "lastTime",
    key: "lastTime",
    render: i => {
      return _moment.default.unix(i).format('YYYY-MM-DD HH:mm');
    }
  })));
}