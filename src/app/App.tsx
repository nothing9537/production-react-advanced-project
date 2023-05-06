import React from 'react'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import './styles/index.scss'

const App: React.FC = () => {

	const { theme } = useTheme()

	return (
		<div className={classNames('App', {}, [theme])}>
			<Navbar />
			<AppRouter />
		</div>
	)
}

export default App