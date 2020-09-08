"use strict";

var _ssr = _interopRequireDefault(require("@my/ssr"));

var _index = _interopRequireDefault(require("@my/apm/src/index"));

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _routes = _interopRequireDefault(require("./routes"));

var _reducers = _interopRequireDefault(require("./reducers"));

require("moment/locale/zh-cn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 一定要放在顶部
_index.default.init({
  pid: 'hello_fee',
  production: false
});

_axios.default.defaults.withCredentials = true;

class App extends _react.default.Component {
  componentDidMount() {// Promise.reject(Error('错误'))
  }

  render() {
    return this.props.children;
  }

}

const render = (0, _ssr.default)({
  App,
  routes: _routes.default,
  reducers: _reducers.default
});
render(document.getElementById('1'));