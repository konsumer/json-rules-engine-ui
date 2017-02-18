import { createStore, combineReducers } from 'redux'

const rules = (state = {rules: [], eventParams: [], buildingRule: false}, action) => {
  let buildingRule
  switch (action.type) {
    case 'add:show':
      return {...state, eventParams: [], buildingRule: {event: {type: '', params: {}}}}

    case 'add:cancel':
      return {...state, buildingRule: false}

    case 'add:save':
      const rules = state.rules.slice()
      state.eventParams.forEach(p => {
        action.data.rule.event.type.params[ p[0] ] = p[1]
      })
      rules.push(action.data.rule)
      return {...state, rules, buildingRule: false}

    case 'add:update':
      buildingRule = {...state.buildingRule, ...action.data}
      return {...state, buildingRule}

    case 'add:param':
      const eventParams = state.eventParams.slice()
      eventParams.push(['', ''])
      return {...state, eventParams}

    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    rules
  }),
  typeof window !== 'undefined' && window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : undefined
)

export default store
