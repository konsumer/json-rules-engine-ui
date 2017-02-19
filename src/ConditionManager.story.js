import React from 'react'
import { storiesOf } from '@kadira/storybook'
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
    <ConditionManager conditions={{}} />
  ))
  .add('with some conditions', () => (
    <ConditionManager conditions={demoConditions} />
  ))
