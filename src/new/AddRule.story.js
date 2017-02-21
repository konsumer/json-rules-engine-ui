import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import { AddRule } from './AddRule'

storiesOf('AddRule', module)
  .add('internal state', () => (
    <AddRule onComplete={action('complete')} />
  ))
