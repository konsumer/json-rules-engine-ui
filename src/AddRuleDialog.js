import React from 'react'
import { connect } from 'react-redux'

import FormAddRule from './FormAddRule'

export const AddRuleDialog = ({showRuleDialog, onAddRule, onAddRuleCancel, onAddClick}) => (
  <div>
    {!showRuleDialog && <button onClick={onAddClick} type='submit'> <i className='fa fa-plus'></i> add rule</button>}
    {showRuleDialog && <FormAddRule onSubmit={onAddRule} onCancel={onAddRuleCancel} />}
  </div>
)

const mapStateToProps = state => ({
  showRuleDialog: state.rule.showRuleDialog
})

const mapDispatchToProps = dispatch => ({
  onAddRule: data => {
    dispatch({type: 'rule:add', data})
    dispatch({type: 'rule:hide'})
  },
  onAddRuleCancel: () => dispatch({type: 'rule:hide'}),
  onAddClick: () => dispatch({type: 'rule:show'})
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRuleDialog)
