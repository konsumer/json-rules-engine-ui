import React from 'react'
import { Field, reduxForm } from 'redux-form'

export const FormAddRule = ({handleSubmit, onCancel}) => (
  <form onSubmit={handleSubmit}>
    <h3>Event</h3>
    <div className='field'>
      <label htmlFor='name'>Name</label>
      <Field name='name' component='input' type='text' />
    </div>
    <button type='submit'>add</button>
    <button onClick={e => { onCancel(); e.preventDefault() }} type='cancel'>cancel</button>
  </form>
)

export default reduxForm({form: 'rule'})(FormAddRule)
