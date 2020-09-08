"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = About;

var _react = _interopRequireDefault(require("react"));

var _swiper = _interopRequireWildcard(require("swiper"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = {
  "about": "_1DpVv",
  "text": "_1plIM"
};

_swiper.default.use([_swiper.Lazy, _swiper.Pagination, _swiper.Zoom]); // ie9 bug


(function func(a) {
  a = Object.create(null);
  console.log(arguments[0] === a);
})();

function About() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: styles.about
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: styles.text
  }, " fdfgrsad"));
}