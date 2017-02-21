import React from 'react'

const style = {
  conditions: {
    display: 'flex'
  },
  condition: {
    flex: 1,
    display: 'flex'
  },
  conditionChild: {
    marginRight: 2,
    flex: 1
  }
}

export const Conditions = ({conditions, onChange, onRemove, onAdd, onGroup, parent}) => (
  <div>
    <h4>All</h4>
    <button onClick={onAdd(`${parent}.all`)}> <i className='fa fa-plus' /> </button>
    {conditions.all.map((condition, i) => (
      <div key={i} style={style.conditions}>
        <div style={style.condition}>
          <input type='text' style={style.conditionChild} value={condition.fact} placeholder='fact' />
          <input type='text' style={style.conditionChild} value={condition.path} placeholder='path' />
          <input type='text' style={style.conditionChild} value={condition.value} placeholder='value' />
          <button onClick={onGroup(`${parent}.all[${i}]`)}> <i className='fa fa-plus' /> </button>
          <button
            onClick={onRemove(`${parent}.all[${i}]`)}
            className='cancel'>
            <i className='fa fa-minus' />
          </button>
          {condition.children && <Conditions parent={`${parent}.all[${i}]`} />}
        </div>
      </div>
    ))}
  </div>
)

export default Conditions
