import React from 'react'
import { connect } from 'react-redux'

export const ParamManager = ({params, onClickAdd, onClickRemove, onParamChange}) => (
  <div className='params'>
    <label>Params</label>
    <button onClick={onClickAdd}> <i className='fa fa-plus'></i> </button>
    <small>Your event will be called with these params.</small>
    <div className='param-list'>
      {params.map((p, i) => (<div key={i} className='param'>
        <input required placeholder='paramName' onChange={e => onParamChange(i, 0, e.target.value)} type='text' value={p[0]} />
        <input required placeholder='param value' onChange={e => onParamChange(i, 1, e.target.value)} type='text' value={p[1]} />
        <button onClick={e => onClickRemove(i)} className='cancel'> <i className='fa fa-minus'></i> </button>
      </div>))}
    </div>
  </div>
)

const mapStateToProps = state => ({
  params: state.rule.params
})

const mapDispatchToProps = dispatch => ({
  onClickAdd: e => {
    dispatch({type: 'rule:param:new'})
    e.preventDefault()
  },
  onClickRemove: id => { dispatch({type: 'rule:param:remove', data: {id}}); return false },
  onParamChange: (paramIndex, index, value) => dispatch({type: 'rule:param:set', data: {paramIndex, index, value}})
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamManager)
