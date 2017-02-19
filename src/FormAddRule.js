import React from 'react'
import { Field, reduxForm } from 'redux-form'

import ParamManager from './ParamManager'
import ConditionManager from './ConditionManager'

export const FormAddRule = ({handleSubmit, onCancel}) => (
  <form onSubmit={handleSubmit}>
    <div className='modal-inner'>
      <header><h2>Add Rule</h2></header>
      <div className='modal-content'>
        <h3>Conditions</h3>
        <ConditionManager />
        <h3>Event</h3>
        <small>This is the event that is fired when the conditons are met for incoming facts.</small>
        <div className='field'>
          <label htmlFor='eventName'>Name</label>
          <Field required name='eventName' component='input' type='text' />
        </div>
        <ParamManager />
      </div>
      <footer>
        <button onClick={e => { onCancel(); e.preventDefault() }} type='cancel'> <i className='fa fa-ban'></i> cancel </button>
        <button type='submit'> <i className='fa fa-plus'></i> add</button>
      </footer>
    </div>
  </form>
)

export default reduxForm({form: 'rule'})(FormAddRule)
