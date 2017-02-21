import React from 'react'
import { connect } from 'react-redux'

export const Condition = ({onConditionRemove, onFactChange, id, condition: {fact, operator, value, path}}) => (
  <div className='Condition'>
    <input onChange={e => onFactChange(id, {fact: e.target.value, operator, value, path})} type='text' placeholder='fact' value={fact} />
    <input onChange={e => onFactChange(id, {fact, operator, value, path: e.target.value})} type='text' placeholder='path' value={path} />
    <div>
      <select value={operator} onChange={e => onFactChange(id, {fact, operator: e.target.value, value, path})}>
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
    <input type='text' placeholder='value' value={value} onChange={e => onFactChange(id, {fact, operator, value: e.target.value, path})} />
    <button title='remove this condition' onClick={e => { onConditionRemove(id); e.stopPropagation() }} className='cancel'> <i className='fa fa-minus'></i> </button>
  </div>
)

export const Conditions = ({conditions, op, top, onConditionRemove, onConditionRemoveGroup, onConditionAdd, onConditionAddGroup, onOpChange, onFactChange, id}) => (
  <fieldset className='Conditions' style={{position:'relative'}}>
    {!top && <button style={{position:'absolute', right: 0, top: 2}} title='remove this condition group' onClick={e => { onConditionRemoveGroup(id); e.stopPropagation() }} className='cancel'> <i className='fa fa-minus'></i> </button>}
    <div>if {top
      ? <strong>{op}</strong>
      : <select value={op} onChange={e => { onOpChange(id.split('.').slice(0, -1).join('.'), e.target.value) }} >
          <option value='all'>all</option>
          <option value='any'>any</option>
        </select>
    } of these resolve to true:</div>
    {conditions.map((condition, i) => (
      <div key={i}>
        {typeof condition.any === 'object' && <Conditions id={`${id}[${i}].any`} onOpChange={onOpChange} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} op='any' conditions={condition.any} />}
        {typeof condition.all === 'object' && <Conditions id={`${id}[${i}].all`} onOpChange={onOpChange} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} op='all' conditions={condition.all} />}
        {typeof condition.fact !== 'undefined' && <Condition onFactChange={onFactChange} id={`${id}[${i}]`} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} condition={condition} />}
      </div>
    ))}
    {!top && <button title='add a condition to this group' onClick={e => { onConditionAdd(id); e.stopPropagation() }}> <i className='fa fa-plus'></i> add condition</button>}
    <button title='add a group of conditions to this group' onClick={e => { onConditionAddGroup(id); e.stopPropagation() }}> <i className='fa fa-plus'></i> add condition group</button>
  </fieldset>
)

export const ConditionManager = ({conditions, onConditionRemove, onConditionRemoveGroup, onConditionAdd, onConditionAddGroup, onOpChange, onFactChange}) => (
  <div className='ConditionManager'>
    <Conditions id='.any' top onConditionRemoveGroup={onConditionRemoveGroup} onConditionAddGroup={onConditionAddGroup} onFactChange={onFactChange} onOpChange={onOpChange} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} op='any' conditions={conditions.any || []} />
    <Conditions id='.all' top onConditionRemoveGroup={onConditionRemoveGroup} onConditionAddGroup={onConditionAddGroup} onFactChange={onFactChange} onOpChange={onOpChange} onConditionAdd={onConditionAdd} onConditionRemove={onConditionRemove} op='all' conditions={conditions.all || []} />
  </div>
)

const mapStateToProps = state => ({
  conditions: state.rule.conditions
})

const mapDispatchToProps = dispatch => ({
  onConditionRemove: (id) => dispatch({type: 'rule:condition:remove', data: {id}}),
  onConditionAdd: (id) => dispatch({type: 'rule:condition:add', data: {id}}),
  onConditionAddGroup: (id) => dispatch({type: 'rule:conditionGroup:add', data: {id}}),
  onOpChange: (id, op) => dispatch({type: 'rule:condition:opChange', data: {id, op}}),
  onFactChange: (id, fact) => dispatch({type: 'rule:condition:factChange', data: {id, fact}}),
  onConditionRemoveGroup: (id) => dispatch({type: 'rule:conditionGroup:remove', data: {id}})
})

export default connect(mapStateToProps, mapDispatchToProps)(ConditionManager)
