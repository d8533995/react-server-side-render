"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionSetTitle = actionSetTitle;
exports.default = void 0;
const installData = {
  title: '',
  meta: null
};

var _default = (state = installData, action) => {
  switch (action.type) {
    case 'set-title':
      return { ...state,
        title: action.data
      };
  }

  return state;
};

exports.default = _default;

function actionSetTitle(title) {
  if (typeof document !== 'undefined') {
    document.title = title;
  }

  return {
    type: 'set-title',
    data: title
  };
}