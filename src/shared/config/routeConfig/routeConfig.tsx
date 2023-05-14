import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import { RouteProps } from 'react-router-dom'

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about'
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about'
}

// type SelfRoute = {
// 	[key in AppRoutes]: RouteProps;
// };

export const routeConfig: RouteProps[] = [
	{
		path: RoutePath.main,
		element: <MainPage />
	},
	{
		path: RoutePath.about,
		element: <AboutPage />
	},
]