import React from 'react'
import { connect } from 'react-redux'

import Conditions from './Conditions'
import Params from './Params'

export class AddRule extends React.Component {
  constructor (props) {
    super(props)
    this.state = {type: '', params: [], conditions: {all: [], any: []}}
    this.onSubmit = this.onSubmit.bind(this)
    this.getRule = this.getRule.bind(this)
    this.eventTypeChange = this.eventTypeChange.bind(this)
    this.changeCondition = this.changeCondition.bind(this)
    this.addParam = this.addParam.bind(this)
    this.removeParam = this.removeParam.bind(this)
    this.changeParam = this.changeParam.bind(this)
    this.addCondition = this.addCondition.bind(this)
    this.removeCondition = this.removeCondition.bind(this)
    this.changeCondition = this.changeCondition.bind(this)
    this.addConditionGroup = this.addConditionGroup.bind(this)
  }

  // build rule from state
  getRule () {
    const rule = {
      conditions: this.state.conditions,
      event: {
        type: this.state.type,
        params: {}
      }
    }
    this.state.params.forEach(p => {
      rule.event.params[p[0]] = p[1]
    })
    return rule
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.onComplete(this.getRule())
  }

  // called on event-type text change
  eventTypeChange (e) {
    this.setState({type: e.target.value})
  }

  // return function for handling add param button event
  addParam () {
    return e => {
      e.preventDefault()
      const params = this.state.params.slice()
      params.push(['', ''])
      this.setState({params})
    }
  }

  // return function for handling remove param button event
  removeParam (id) {
    return e => {
      e.preventDefault()
      const params = this.state.params.slice()
      delete params[id]
      this.setState({params})
    }
  }

  // return function for handling param change event
  changeParam (index, position) {
    return e => {
      const params = this.state.params.slice()
      params[index][position] = e.target.value
      this.setState({params})
    }
  }

  // return function for handling add condition button event
  addCondition (parent) {
    return e => {
      e.preventDefault()
      const conditions = {...this.state.conditions}
      eval(`conditions${parent}.push({fact:'', operator:'==', value:'', path:''})`)
      this.setState({conditions})
    }
  }

  // return function for handling remove condition button event
  removeCondition (id) {
    return e => {
      e.preventDefault()
      const conditions = {...this.state.conditions}
      eval(`delete conditions${id}`)
      this.setState({conditions})
    }
  }

  // return function for handling condition change event
  changeCondition () {
    return e => {
      console.log('NOT IMPLEMENTED: change')
    }
  }

  addConditionGroup (id) {
    return e => {
      e.preventDefault()
    }
  }

  render () {
    const { conditions, params } = this.state
    return (<form onSubmit={this.onSubmit}>
      <h3>Conditions</h3>
      <small>Test for firing event</small>
      <Conditions
        parent=''
        conditions={conditions}
        onChange={this.changeCondition}
        onAdd={this.addCondition}
        onRemove={this.removeCondition}
        onGroup={this.addConditionGroup}
        onOr={this.addOrCondition}
      />
      <h3>Event</h3>
      <small>This is the event that is fired when the conditions are met for incoming facts.</small>
      <label htmlFor='name'><h4>Name</h4></label>
      <input type='text' required id='name' onChange={this.eventTypeChange} />
      <h4>Params</h4>
      <Params
        params={params}
        onChange={this.changeParam}
        onAdd={this.addParam}
        onRemove={this.removeParam}
      />
      <button type='submit'> add </button>
    </form>)
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onComplete: (rule) => { dispatch({type: 'rule:new', data: {rule}}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRule)
