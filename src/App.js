import React from 'react'
import { connect } from 'react-redux'

import DisplayRules from './DisplayRules'
import AddRuleDialog from './AddRuleDialog'

export const App = ({onAdd, buildingRule}) => (
  <div className='App'>
    <button type='submit' onClick={onAdd}> Add Rule </button>
    <DisplayRules />
    {buildingRule && <AddRuleDialog />}
  </div>
)

const mapStateToProps = state => ({
  buildingRule: state.rules.buildingRule
})

const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch({type: 'add:show'})
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
