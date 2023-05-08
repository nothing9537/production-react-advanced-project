import React, { Suspense } from 'react'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import { Aside } from 'widgets/Aside'
import { useTranslation } from 'react-i18next'
import './styles/index.scss'

const Component = () => {
	const { t, i18n } = useTranslation()

	const toggle = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
	}

	return (
		<div>
			<button onClick={toggle}>{t('translate')}</button>
			{t('test-translation')}
		</div>
	)
}

const App: React.FC = () => {

	const { theme } = useTheme()

	return (
		<div className={classNames('App', {}, [theme])}>
			<Suspense fallback="">
				<Navbar />
				<Component />
				<div className='content-page'>
					<Aside />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	)
}

export default App