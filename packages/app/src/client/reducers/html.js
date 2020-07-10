const installData = {
  title: '',
  meta: null
}

export default (state = installData, action) => {
  switch (action.type) {
    case 'set-title':
      return { ...state, title: action.data }
  }
  return state
}

export function actionSetTitle (title) {
  if (typeof document !== 'undefined') {
    document.title = title
  }
  return {
    type: 'set-title',
    data: title
  }
}
