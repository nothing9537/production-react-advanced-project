import App from './app/App'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'

import '/app/styles/index.scss'
import 'shared/config/i18n/i18n'

render(
	<BrowserRouter>
		<ErrorBoundary>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</ErrorBoundary>
	</BrowserRouter>,
	document.getElementById('root')
)