import { configure } from '@kadira/storybook'

function loadStories () {
  require(`${__dirname}/../src/site.css`)
  require(`${__dirname}/../src/ParamManager.story`)
  require(`${__dirname}/../src/ConditionManager.story`)
  require(`${__dirname}/../src/DisplayRules.story`)
}

configure(loadStories, module)
