import { configure } from '@kadira/storybook'

function loadStories () {
  require(`${__dirname}/../src/index.scss`)
  require(`${__dirname}/../src/ParamManager.story`)
  require(`${__dirname}/../src/ConditionManager.story`)
  require(`${__dirname}/../src/DisplayRules.story`)
}

configure(loadStories, module)
