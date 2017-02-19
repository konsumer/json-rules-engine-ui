import React from 'react'
import { connect } from 'react-redux'

import FormAddRule from './FormAddRule'

export const AddRuleDialog = ({showRuleDialog, onAddRule, onAddRuleCancel, onAddClick}) => (
  <div>
    <button onClick={onAddClick} type='submit'> <i className='fa fa-plus'></i> add rule</button>
    {showRuleDialog && (
      <div className='is-active modal--show' tabIndex='-1' role='dialog'>
        <FormAddRule onSubmit={onAddRule} onCancel={onAddRuleCancel} />
      </div>
    )}
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
