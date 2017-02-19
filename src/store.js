import { createStore, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const rule = (state = {rules: [], showRuleDialog: false, params: [], conditions: {}}, action) => {
  let params
  switch (action.type) {
    case 'rule:add':
      const p = {}
      state.params.forEach((v) => { p[v[0]] = v[1] })
      const rule = {
        conditions: state.conditions,
        event: {
          type: action.data.eventName,
          params: p
        }
      }
      const rules = state.rules.slice()
      rules.push(rule)
      return {...state, rules}

    case 'rule:show':
      return {...state, showRuleDialog: true, params: []}

    case 'rule:hide':
      return {...state, showRuleDialog: false}

    case 'rule:param:new':
      params = state.params.slice()
      params.push(['', ''])
      return {...state, params}

    case 'rule:param:set':
      params = state.params.slice()
      const {paramIndex, index, value} = action.data
      params[paramIndex][index] = value
      return {...state, params}

    case 'rule:param:remove':
      params = state.params.slice()
      const {id} = action.data
      delete params[id]
      return {...state, params}

    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    rule,
    form
  }),
  typeof window !== 'undefined' && window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : undefined
)

export default store
