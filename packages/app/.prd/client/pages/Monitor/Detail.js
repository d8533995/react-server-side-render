"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Monitor;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _queryString = _interopRequireDefault(require("query-string"));

var _Performance = _interopRequireDefault(require("./Performance"));

var _ErrorList = _interopRequireDefault(require("./ErrorList"));

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  TabPane
} = _antd.Tabs;

function Monitor() {
  const history = (0, _reactRouter.useHistory)();
  const location = (0, _reactRouter.useLocation)();

  const {
    activeKey = '1'
  } = _queryString.default.parse(location.search);

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
    animated: false,
    activeKey: activeKey,
    onChange: key => {
      history.replace(location.pathname + `?activeKey=${key}`);
    }
  }, /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: "\u6027\u80FD",
    key: "1"
  }, /*#__PURE__*/_react.default.createElement(_Performance.default, null)), /*#__PURE__*/_react.default.createElement(TabPane, {
    tab: "\u9519\u8BEF",
    key: "2"
  }, /*#__PURE__*/_react.default.createElement(_ErrorList.default, null))));
}