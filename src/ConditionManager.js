import React from 'react'
import { connect } from 'react-redux'

export const Condition = ({onConditionRemove, id, condition: {fact, operator, value, path}}) => (
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
    <button title='remove this condition' onClick={e => { onConditionRemove(id); e.preventDefault() }} className='cancel'> <i className='fa fa-minus'></i> </button>
  </div>
)

export const Conditions = ({conditions, op, opLabel, onConditionRemove, onConditionAdd, onOpChange, id}) => (
  <fieldset className='Conditions' style={{marginLeft: 10}}>
    <div>if {!opLabel
      ? (
      <select value={op} onChange={e => { onOpChange(id.split('.').slice(0, -1).join('.'), e.target.value) }} >
        <option value='all'>ALL</option>
        <option value='any'>ANY</option>
      </select>
    )
      : <strong>{op}</strong>
    } of these resolve to true:</div>
    {conditions.map((condition, i) => (
      <div key={i}>
        {typeof condition.any === 'object' && <Conditions id={`${id}[${i}].any`} onOpChange={onOpChange} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} op='any' conditions={condition.any} />}
        {typeof condition.all === 'object' && <Conditions id={`${id}[${i}].all`} onOpChange={onOpChange} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} op='all' conditions={condition.all} />}
        {typeof condition.fact !== 'undefined' && <Condition id={`${id}[${i}]`} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} condition={condition} />}
      </div>
    ))}
    <button title='add a condition to this group' onClick={e => { onConditionAdd(id); e.preventDefault() }}> <i className='fa fa-plus'></i> </button>
  </fieldset>
)

export const ConditionManager = ({conditions, onConditionRemove, onConditionAdd, onOpChange}) => (
  <div className='ConditionManager'>
    <Conditions id='.any' opLabel onOpChange={onOpChange} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} op='any' conditions={conditions.any || []} />
    <Conditions id='.all' opLabel onOpChange={onOpChange} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} op='all' conditions={conditions.all || []} />
  </div>
)

const mapStateToProps = state => ({
  conditions: state.rule.conditions
})

const mapDispatchToProps = dispatch => ({
  onConditionRemove: (id) => {},
  onConditionAdd: (id) => {},
  onOpChange: (id, op) => {}
})

export default connect(mapStateToProps, mapDispatchToProps)(ConditionManager)
