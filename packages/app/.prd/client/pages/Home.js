"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Home;

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _reactRedux = require("react-redux");

var _html = require("../reducers/html");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Home() {
  const state = (0, _reactRedux.useSelector)(state => state);
  console.log(state);

  function submit(e) {}

  (0, _react.useEffect)(() => {
    (async function () {
      await (0, _axios.default)({
        method: 'POST',
        url: 'http://127.0.0.1:8080/api/post/json',
        data: {
          a: 1,
          b: 1
        }
      });
      await (0, _axios.default)({
        method: 'POST',
        url: 'http://127.0.0.1:8080/api/post/urlencode',
        data: new URLSearchParams({
          a: 1,
          b: 1
        })
      });
    })();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("form", {
    action: "http://127.0.0.1:8080/api/post/form" // encType='multipart/form-data'
    ,
    method: "POST",
    target: "formTarget"
  }, /*#__PURE__*/_react.default.createElement("input", {
    name: "username"
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("input", {
    name: "password",
    type: "password"
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("input", {
    type: "submit",
    value: "\u63D0\u4EA4",
    onClick: submit
  })), /*#__PURE__*/_react.default.createElement("iframe", {
    name: "formTarget"
  }));
}

Home.inistallData = async (dispatch = () => {}) => {
  dispatch((0, _html.actionSetTitle)('home'));
  await (0, _axios.default)({
    url: 'http://127.0.0.1:8080/api/haha',
    withCredentials: true,
    params: {
      a: 1
    }
  });
};