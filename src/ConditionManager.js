import React from 'react'
import { connect } from 'react-redux'

export const Condition = ({onConditionRemove, condition: {fact, operator, value, path}}) => (
  <div className='Condition'>
    <input type='text' placeholder='fact' defaultValue={fact} />
    <input type='text' placeholder='path' defaultValue={path} />
    <div>
      <select defaultValue={operator}>
        <option value='equal'>==</option>
        <option value='notEqual'>!=</option>
        <option value='greaterThan'>&gt;</option>
        <option value='greaterThanInclusive'>&gt;=</option>
        <option value='lessThan'>&lt;</option>
        <option value='lessThanInclusive'>&lt;=</option>
        <option value='in'>in</option>
        <option value='notIn'>not in</option>
        <option value='contains'>contains</option>
        <option value='doesNotContain'>does not contain</option>
      </select>
    </div>
    <input type='text' placeholder='value' defaultValue={value} />
    <button onClick={e => { onConditionRemove('find this'); e.preventDefault() }} className='cancel'> <i className='fa fa-minus'></i> </button>
  </div>
)

export const Conditions = ({conditions, op, onConditionRemove}) => (
  <div className='Conditions' style={{marginLeft: 10}}>
    {op === 'all' ? 'ALL' : 'ANY'}
    {conditions.map((condition, i) => (
      <div key={i}>
        {typeof condition.any === 'object' && <Conditions onConditionRemove={onConditionRemove} op='any' conditions={condition.any} />}
        {typeof condition.all === 'object' && <Conditions onConditionRemove={onConditionRemove} op='all' conditions={condition.all} />}
        {typeof condition.fact !== 'undefined' && <Condition onConditionRemove={onConditionRemove} condition={condition} />}
      </div>
    ))}
  </div>
)

export const ConditionManager = ({conditions, onConditionRemove}) => (
  <div className='ConditionManager'>
    {typeof conditions.any === 'object' && <Conditions onConditionRemove={onConditionRemove} op='any' conditions={conditions.any} />}
    {typeof conditions.all === 'object' && <Conditions onConditionRemove={onConditionRemove} op='all' conditions={conditions.all} />}
  </div>
)

const mapStateToProps = state => ({
  conditions: state.rule.conditions
})

const mapDispatchToProps = dispatch => ({
  onConditionRemove: () => {}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConditionManager)
