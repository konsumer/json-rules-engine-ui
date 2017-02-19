import React from 'react'
import { connect } from 'react-redux'

export const DisplayRules = ({rules}) => (
  <div className='DisplayRules'>
    <pre>{JSON.stringify(rules, null, 2)}</pre>
  </div>
)

const mapStateToProps = state => ({
  rules: state.rule.rules
})

export default connect(mapStateToProps)(DisplayRules)
