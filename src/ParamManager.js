import React from 'react'
import { connect } from 'react-redux'

const ParamManager = ({params, onClickAdd, onParamRemove, onParamChange}) => (
  <div className='params'>
    <label>Params</label>
    <button onClick={onClickAdd}> <i className='fa fa-plus'></i> </button>
    <small>Your event will be called with these params.</small>
    <div className='param-list'>
      {params.map((p, i) => (<div key={i} className='param'>
        <input required placeholder='paramName' onChange={e => onParamChange(i, 0, e.target.value)} type='text' value={p[0]} />
        <input required placeholder='param value' onChange={e => onParamChange(i, 1, e.target.value)} type='text' value={p[1]} />
        <button onClick={e => { onParamRemove(i); e.preventDefault() }} className='cancel'> <i className='fa fa-minus'></i> </button>
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
  onParamRemove: id => dispatch({type: 'rule:param:remove', data: {id}}),
  onParamChange: (paramIndex, index, value) => dispatch({type: 'rule:param:set', data: {paramIndex, index, value}})
})

export default connect(mapStateToProps, mapDispatchToProps)(ParamManager)
