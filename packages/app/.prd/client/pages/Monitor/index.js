"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHotLoader = require("react-hot-loader");

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _request = _interopRequireDefault(require("../../utils/request"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const styles = {
  "wrap": "_352s7",
  "btns": "_30Zfe",
  "list": "_238I-",
  "item": "_24z0g",
  "img": "_2wpSW",
  "title": "TdS_a",
  "viewData": "_3sstx",
  "delete": "pHmOC"
};

var _default = (0, _reactHotLoader.hot)(module)(List);

exports.default = _default;

function List() {
  const [deleteModal, setDeleteModal] = (0, _react.useState)();
  const [addModal, setAddModal] = (0, _react.useState)();
  const [editModal, setEditModal] = (0, _react.useState)();
  const [list, setList] = (0, _react.useState)();

  function getList() {
    (0, _request.default)({
      path: '/api/project/item/list'
    }).then(res => {
      setList(res.data.data || []);
    });
  }

  (0, _react.useEffect)(() => {
    getList();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: styles.wrap
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: styles.btns
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: () => setAddModal(true)
  }, "\u6DFB\u52A0\u9879\u76EE")), /*#__PURE__*/_react.default.createElement("ul", {
    className: styles.list
  }, list && list.map(item => /*#__PURE__*/_react.default.createElement("li", {
    className: styles.item,
    key: item.adId
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: `/monitor/${item.id}`
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: styles.title
  }, item.display_name, /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, {
    style: {
      marginLeft: 5
    },
    onClick: e => {
      e.preventDefault();
      setEditModal({
        adTitle: item.display_name,
        adId: item.id,
        projectName: item.project_name,
        desc: item.c_desc
      });
    }
  }), /*#__PURE__*/_react.default.createElement("div", null, item.project_name)), /*#__PURE__*/_react.default.createElement("a", {
    onClick: e => {
      e.preventDefault();
      setDeleteModal(item.id);
    },
    className: styles.delete
  }, "\u5220\u9664")))))), addModal && /*#__PURE__*/_react.default.createElement(AddModal, {
    onReFresh: getList,
    onCancel: () => setAddModal(false)
  }), editModal && /*#__PURE__*/_react.default.createElement(EditModal, {
    onReFresh: getList,
    estateName: editModal.adTitle,
    adId: editModal.adId,
    defaultProject: editModal.projectName,
    defaultDesc: editModal.desc,
    onCancel: () => setEditModal(false)
  }), deleteModal && /*#__PURE__*/_react.default.createElement(DelModal, {
    adId: deleteModal,
    onReFresh: getList,
    onCancel: () => setDeleteModal(false)
  }));
}

function EditModal({
  estateName,
  adId,
  onCancel,
  onReFresh,
  defaultProject,
  defaultDesc
}) {
  const [displayName, setDisplayName] = (0, _react.useState)(estateName);
  const [projectName, setProjectName] = (0, _react.useState)(defaultProject);
  const [desc, setDesc] = (0, _react.useState)(defaultDesc);

  function handleSave() {
    (0, _request.default)({
      method: 'POST',
      path: '/api/project/item/update',
      json: {
        id: adId,
        display_name: displayName,
        project_name: projectName,
        c_desc: desc
      }
    }).then(() => {
      _antd.message.success('修改成功');

      onReFresh();
      onCancel();
    });
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    closable: false,
    title: "\u4FEE\u6539\u9879\u76EE\u540D\u79F0",
    visible: true,
    onOk: handleSave,
    onCancel: onCancel,
    okText: "\u4FDD\u5B58",
    cancelText: "\u53D6\u6D88",
    okButtonProps: {
      disabled: !displayName
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    placeholder: "\u9879\u76EE\u540D\u79F0",
    value: displayName,
    onChange: e => setDisplayName(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    placeholder: "appId",
    value: projectName,
    onChange: e => setProjectName(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    placeholder: "\u63CF\u8FF0",
    value: desc,
    onChange: e => setDesc(e.target.value)
  }));
}

function AddModal({
  onCancel,
  onReFresh
}) {
  const [displayName, setDisplayName] = (0, _react.useState)();
  const [projectName, setProjectName] = (0, _react.useState)();
  const [desc, setDesc] = (0, _react.useState)();

  function handleAdd() {
    (0, _request.default)({
      method: 'POST',
      path: '/api/project/item/add',
      json: {
        displayName,
        projectName,
        cDesc: desc
      }
    }).then(() => {
      _antd.message.success('添加成功');

      onReFresh();
      onCancel();
    });
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    closable: false,
    title: "\u6DFB\u52A0\u9879\u76EE",
    visible: true,
    onOk: handleAdd,
    onCancel: onCancel,
    okText: "\u6DFB\u52A0",
    cancelText: "\u53D6\u6D88",
    okButtonProps: {
      disabled: !displayName || !projectName || !desc
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    placeholder: "\u540D\u79F0",
    value: displayName,
    onChange: e => setDisplayName(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    placeholder: "appId",
    value: projectName,
    onChange: e => setProjectName(e.target.value)
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    placeholder: "\u63CF\u8FF0",
    value: desc,
    onChange: e => setDesc(e.target.value)
  }));
}

function DelModal({
  onCancel,
  onReFresh,
  adId
}) {
  const [delConfirmValue, setDelConfirmValue] = (0, _react.useState)();

  function handleDelete() {
    (0, _request.default)({
      path: '/api/project/item/delete',
      qs: {
        id: adId
      }
    }).then(() => {
      _antd.message.success('删除成功');

      onReFresh();
      onCancel();
    });
  }

  return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    visible: true,
    title: "\u5220\u9664\u9879\u76EE",
    closable: false,
    onOk: handleDelete,
    onCancel: onCancel,
    okText: "\u5220\u9664",
    cancelText: "\u53D6\u6D88",
    okButtonProps: {
      disabled: delConfirmValue !== '确认删除'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, "\u8BF7\u8F93\u5165\u201C\u786E\u8BA4\u5220\u9664\u201D"), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    value: delConfirmValue,
    onChange: e => setDelConfirmValue(e.target.value)
  }));
}