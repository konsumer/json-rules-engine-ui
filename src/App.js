import React from 'react'
import { connect } from 'react-redux'

import DisplayRules from './DisplayRules'
import AddRuleDialog from './AddRuleDialog'

export const App = ({onAdd, buildingRule}) => (
  <div className='App'>
    <AddRuleDialog />
    <DisplayRules />
  </div>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
