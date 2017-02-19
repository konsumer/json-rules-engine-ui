import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.scss'

import store from './store'
import App from './App'

// make HMR work
if (module.hot) { module.hot.accept() }

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
