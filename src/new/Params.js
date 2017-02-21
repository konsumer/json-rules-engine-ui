import React from 'react'

const style = {
  params: {
    display: 'flex',
    flexDirection: 'column'
  },
  param: {
    display: 'flex'
  },
  paramChild: {
    marginRight: 2,
    flex: 1
  }
}

export const Params = ({params, onChange, onRemove, onAdd}) => (
  <div>
    <button onClick={onAdd()}> <i className='fa fa-plus' /> </button>
    <div style={style.params}>
      {params.map((v, i) => (
        <div key={i} style={style.param}>
          <input required onChange={onChange(i, 0)} style={style.paramChild} type='text' placeholder='paramName' defaultValue={v[0]} />
          <input required onChange={onChange(i, 1)} style={style.paramChild} type='text' placeholder='param value' defaultValue={v[1]} />
          <button
            onClick={onRemove(i)}
            className='cancel'>
            <i className='fa fa-minus' />
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default Params
