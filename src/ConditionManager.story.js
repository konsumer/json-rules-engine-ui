import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { ConditionManager } from './ConditionManager'

const demoConditions = {
  any: [{
    all: [{
      fact: 'gameDuration',
      operator: 'equal',
      value: 40
    }, {
      fact: 'personalFoulCount',
      operator: 'greaterThanInclusive',
      value: 5
    }]
  }, {
    all: [{
      fact: 'gameDuration',
      operator: 'equal',
      value: 48
    }, {
      fact: 'personalFoulCount',
      operator: 'greaterThanInclusive',
      value: 6
    }]
  }]
}

storiesOf('ConditionManager', module)
  .add('with no conditions', () => (
    <ConditionManager onOpChange={action('change op')} onConditionAdd={action('add')} onConditionRemove={action('remove')} conditions={{}} />
  ))
  .add('with some conditions', () => (
    <ConditionManager onOpChange={action('change op')} onConditionAdd={action('add')} onConditionRemove={action('remove')} conditions={demoConditions} />
  ))
