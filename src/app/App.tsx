import { FC, Suspense } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/RouterProvider'
import { Navbar } from 'widgets/Navbar'
import { Aside } from 'widgets/Aside'

const App: FC = () => {

	return (
		<div className={classNames('App', {}, [])}>
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