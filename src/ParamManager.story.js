import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { ParamManager } from './ParamManager'

const demoParams = [
  ['param1', 'value1'],
  ['param2', 'value2'],
  ['param3', 'value3']
]

storiesOf('ParamManager', module)
  .add('with no params', () => (
    <ParamManager params={[]} onClickAdd={action('add')} onClickRemove={action('remove')} onParamChange={action('change')} />
  ))
  .add('with some params', () => (
    <ParamManager params={demoParams} onClickAdd={action('add')} onClickRemove={action('remove')} onParamChange={action('change')} />
  ))
