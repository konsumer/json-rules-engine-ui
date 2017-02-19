import React from 'react'

export const Condition = ({fact, operator, value, path}) => (
  <div className='Condition'>
    <ul>
      <li>Fact: {fact}</li>
      <li>Operator: {operator}</li>
      <li>Value: {value}</li>
      <li>Path: {path}</li>
    </ul>
  </div>
)

export default Condition
