import React, { Suspense } from 'react'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/RouterProvider'
import { Navbar } from 'widgets/Navbar'
import { Aside } from 'widgets/Aside'
import './styles/index.scss'

const App: React.FC = () => {

	const { theme } = useTheme()

	return (
		<div className={classNames('App', {}, [theme])}>
			<Suspense fallback="">
				<Navbar />
				<div className='content-page'>
					<Aside />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	)
}

export default App