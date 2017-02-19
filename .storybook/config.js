import { configure } from '@kadira/storybook'

function loadStories () {
  require(`${__dirname}/../src/site.css`)
  require(`${__dirname}/../src/ConditionManager.story`)
}

configure(loadStories, module)
