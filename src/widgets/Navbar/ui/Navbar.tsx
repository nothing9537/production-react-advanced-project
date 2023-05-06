import React from 'react'
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import cls from './Navbar.module.scss'

interface NavbarProps {
	className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<ThemeSwitcher />
			<div className={cls.links}>
				<AppLink
					to={RoutePath.main}
					theme={AppLinkTheme.SECONDARY}
				>
					Главная
				</AppLink>
				<AppLink
					to={RoutePath.about}
					theme={AppLinkTheme.SECONDARY}
				>
					О сайте
				</AppLink>
			</div>
		</div>
	)
}