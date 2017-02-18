import React from 'react'

import DisplayRules from './DisplayRules'
import AddRuleDialog from './AddRuleDialog'

export const App = () => (
  <div className='App'>
    <AddRuleDialog />
    <DisplayRules />
  </div>
)

export default App
