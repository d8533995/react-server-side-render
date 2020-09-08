"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorList;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _request = _interopRequireDefault(require("../../utils/request"));

var _reactRouter = require("react-router");

var _moment = require("moment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  Column
} = _antd.Table;

function ErrorList() {
  var _errorList$, _errorList$2;

  const [errorList, setErrorList] = (0, _react.useState)([]);
  const {
    projectId
  } = (0, _reactRouter.useParams)();

  function searchErrorList() {
    const searchParams = new URLSearchParams(window.location.search);
    (0, _request.default)({
      path: `/project/${projectId}/api/error/log/detail`,
      qs: {
        desc: searchParams.get('desc')
      }
    }).then(({
      data: {
        data
      }
    }) => {
      setErrorList(data);
    });
  }

  (0, _react.useEffect)(() => {
    searchErrorList();
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "\u5F02\u5E38\u6D88\u606F"), /*#__PURE__*/_react.default.createElement("h2", null, (_errorList$ = errorList[0]) === null || _errorList$ === void 0 ? void 0 : _errorList$.desc.split(/\sat\s|@/)[0]), /*#__PURE__*/_react.default.createElement("div", null, "\u539F\u56E0"), /*#__PURE__*/_react.default.createElement("h4", null, (_errorList$2 = errorList[0]) === null || _errorList$2 === void 0 ? void 0 : _errorList$2.desc.split(/\sat\s|@/)[1])), /*#__PURE__*/_react.default.createElement(_antd.Table, {
    bordered: true,
    pagination: false,
    rowKey: "id",
    dataSource: errorList,
    expandable: {
      expandedRowRender(record) {
        return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, record.ua), /*#__PURE__*/_react.default.createElement("p", {
          style: {
            whiteSpace: 'pre-line'
          }
        }, record.stack));
      }

    }
  }, /*#__PURE__*/_react.default.createElement(Column, {
    title: "URL",
    dataIndex: "url",
    key: "url"
  }), /*#__PURE__*/_react.default.createElement(Column, {
    title: "\u9519\u8BEF\u7C7B\u578B",
    dataIndex: "error_name",
    key: "error_name"
  }), /*#__PURE__*/_react.default.createElement(Column, {
    title: "\u8BBE\u5907\u4FE1\u606F",
    key: "device",
    render: (text, record) => /*#__PURE__*/_react.default.createElement("div", null, record.device_model && /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      color: "green"
    }, record.device_model, record.device_vendor), /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      color: "geekblue"
    }, record.os, record.os_version), /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      color: "volcano"
    }, record.browser, record.browser_version))
  }), /*#__PURE__*/_react.default.createElement(Column, {
    title: "\u53D1\u751F\u65F6\u95F4",
    dataIndex: "log_at",
    key: "log_at",
    render: i => {
      return (0, _moment.unix)(i).format('YYYY-MM-DD HH:mm');
    }
  })));
}