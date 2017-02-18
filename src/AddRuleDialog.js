import React from 'react'
import { connect } from 'react-redux'

// TODO: use redux-form

const style = {
  form: {
    flex: 1
  },
  buttonBox: {
    display: 'flex',
    marginLeft: 'auto'
  }
}

export const AddRuleDialog = ({buildingRule, eventParams, onAdd, onParam, onCancel, onUpdate, onUpdateParam}) => (
  <div className='AddRuleDialog overlay'>
    <form onKeyUp={e => { if (e.key === 'Escape') onCancel(e) }} className='dialog' onSubmit={() => onAdd(buildingRule)}>
      <h2>Add Rule</h2>
      <div style={style.form}>
        <h3>Event</h3>
        <h5><label htmlFor='eventType'>Type:</label></h5>
        <input
          id='eventType'
          autoFocus
          onChange={e => onUpdate({event: {type: e.target.value}})}
          value={buildingRule.event.type}
          type='text'
          required
        />
        <h5>Params:</h5>
        {eventParams.map((k, i) => (
          <div key={i}>
            <input onChange={e => onUpdateParam(e.target.value, i, 0)} type='text' required value={k[0]} />
            <input onChange={e => onUpdate({event: {type: e.target.value}})} type='text' required value={k[1]} />
          </div>
        ))}
        <button onClick={onParam}> Add Param</button>
      </div>
      <div style={style.buttonBox}>
        <button type='reset' onClick={onCancel}> Cancel </button>
        <button type='submit'> Add </button>
      </div>
    </form>
  </div>
)

const mapStateToProps = state => ({
  buildingRule: state.rules.buildingRule,
  eventParams: state.rules.eventParams
})

const mapDispatchToProps = dispatch => ({
  onAdd: rule => dispatch({type: 'add:save', data: {rule}}),
  onCancel: e => { dispatch({type: 'add:cancel'}); e.preventDefault() },
  onUpdate: value => dispatch({type: 'add:update', data: value}),
  onParam: e => { dispatch({type: 'add:param'}); e.preventDefault() }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRuleDialog)
