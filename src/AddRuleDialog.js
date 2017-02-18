import React from 'react'
import { connect } from 'react-redux'

import FormAddRule from './FormAddRule'

export const AddRuleDialog = () => (
  <div>
    <FormAddRule />
  </div>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRuleDialog)
