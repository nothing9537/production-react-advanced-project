import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import './styles/index.scss'
import { AppRouter } from './providers/router'

const App: React.FC = () => {

	const { theme, toggleTheme } = useTheme()

	return (
		<div className={classNames('App', {}, [theme])}>
			<button onClick={toggleTheme}>Swap theme</button>
			<Link to={'/'}>Главная</Link>
			<Link to={'/about'}>О сайте</Link>
			<AppRouter />
		</div>
	)
}

export default App