import 'mobx-react/batchingForReactDom'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import App from './components/App'
import './css/index.css'

const GlobalStyle = createGlobalStyle`
	body{
		max-width:100vw
	}
`

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
