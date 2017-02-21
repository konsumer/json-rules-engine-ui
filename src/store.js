import { createStore, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

const demoConditions = {
  any: [{
    all: [{
      fact: 'gameDuration',
      operator: 'equal',
      value: 40
    }, {
      fact: 'personalFoulCount',
      operator: 'greaterThanInclusive',
      value: 5
    }]
  }, {
    all: [{
      fact: 'gameDuration',
      operator: 'equal',
      value: 48
    }, {
      fact: 'personalFoulCount',
      operator: 'greaterThanInclusive',
      value: 6
    }]
  }],
  all: []
}

// TODO: if you think eval's evil, rewrite object flat-query without eval!
// https://www.nczonline.net/blog/2013/06/25/eval-isnt-evil-just-misunderstood/

const rule = (state = {rules: [], showRuleDialog: false, params: [], conditions: demoConditions}, action) => {
  let params
  let conditions
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
      return {...state, rules, conditions: {...state.conditions}}

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

    case 'rule:condition:remove':
      conditions = {...state.conditions}
      if (action.data.id) {
        eval(`delete conditions${action.data.id}`)
      }
      return {...state, conditions}

    case 'rule:condition:add':
      conditions = {...state.conditions}
      if (action.data.id) {
        if (action.data.id === '.') action.data.id = ''
        eval(`conditions${action.data.id}.push({fact:'',operator:'', value:'', path:''})`)
      }
      return {...state, conditions}

    case 'rule:conditionGroup:add':
      conditions = {...state.conditions}
      if (action.data.id) {
        if (action.data.id === '.') action.data.id = ''
        eval(`conditions${action.data.id}.push({'all':[]})`)
      }
      return {...state, conditions}

    case 'rule:condition:opChange':
      conditions = {...state.conditions}
      if (action.data.id) {
        const newop = action.data.op === 'all' ? 'any' : 'all'
        eval(`conditions${action.data.id}.${newop} = conditions${action.data.id}.${action.data.op}; delete conditions${action.data.id}.${action.data.op}`)
      }
      return {...state, conditions}

    // case 'rule:condition:factChange':

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
