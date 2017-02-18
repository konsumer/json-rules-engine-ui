import React from 'react'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'

export const FormAddRule = ({addRule}) => (
  <Form model='rule' onSubmit={addRule}>
    <h3>Event</h3>
    <label>Name</label>
    <Control.text model='rule.name' />
    <button type='submit'>add</button>
  </Form>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  addRule: data => {
    console.log('addRule', data)
    dispatch({type: 'rule:add', data})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormAddRule)
