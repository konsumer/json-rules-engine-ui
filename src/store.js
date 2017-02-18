import { createStore, combineReducers } from 'redux'
import { combineForms } from 'react-redux-form'

const rules = (state = {rules: []}, action) => {
  switch (action.type) {
    case 'rule:add':
      console.log(action)
      return state
    default:
      return state
  }
}

const form = combineForms({
  rules: {
    name: '',
    params: []
  }
})

const store = createStore(
  combineReducers({
    rules,
    form
  }),
  typeof window !== 'undefined' && window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : undefined
)

export default store
