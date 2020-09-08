"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Chrome extends _react.default.Component {
  render() {
    'sadsad'.includes('1');
    const {
      meta,
      state,
      title,
      children,
      stylejs,
      dll,
      app
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("html", {
      lang: "zh-CN"
    }, /*#__PURE__*/_react.default.createElement("head", null, /*#__PURE__*/_react.default.createElement("title", null, title), meta && Object.keys(meta).map(i => /*#__PURE__*/_react.default.createElement("meta", {
      key: i,
      name: i,
      content: meta[i]
    })), /*#__PURE__*/_react.default.createElement("meta", {
      httpEquiv: "content-type",
      content: "text/html;charset=utf-8"
    }), /*#__PURE__*/_react.default.createElement("meta", {
      name: "viewport",
      content: "width=device-width,initial-scale=1,viewport-fit=cover,minimum-scale=1,maximum-scale=1,user-scalable=0"
    }), /*#__PURE__*/_react.default.createElement("meta", {
      httpEquiv: "Content-Security-Policy",
      content: "img-src 'self';"
    }), /*#__PURE__*/_react.default.createElement("link", {
      rel: "stylesheet",
      type: "text/css",
      href: "<%- css %>"
    })), /*#__PURE__*/_react.default.createElement("body", null, children, /*#__PURE__*/_react.default.createElement("script", {
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // https://redux.js.org/recipes/server-rendering/#security-considerations
      dangerouslySetInnerHTML: {
        __html: `window.__PRELOADED_STATE__ =${state}`
      }
    }), /*#__PURE__*/_react.default.createElement("script", {
      crossOrigin: true,
      src: stylejs
    }), /*#__PURE__*/_react.default.createElement("script", {
      crossOrigin: true,
      src: dll
    }), /*#__PURE__*/_react.default.createElement("script", {
      crossOrigin: true,
      src: app
    })));
  }

}

exports.default = Chrome;