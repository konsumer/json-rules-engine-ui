import { createStore, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const rules = (state = {rules: [], showRuleDialog: false}, action) => {
  switch (action.type) {
    case 'rule:add':
      return state
    case 'rule:show':
      return {...state, showRuleDialog: true}
    case 'rule:hide':
      return {...state, showRuleDialog: false}
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    rules,
    form
  }),
  typeof window !== 'undefined' && window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : undefined
)

export default store
