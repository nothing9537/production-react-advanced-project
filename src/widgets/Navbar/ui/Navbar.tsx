import React from 'react'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'

interface NavbarProps {
	className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {

	const { t } = useTranslation()

	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<div className={cls.links}>
				<AppLink
					to={RoutePath.main}
					theme={AppLinkTheme.SECONDARY}
				>
					{t('navbar.main-link')}
				</AppLink>
				<AppLink
					to={RoutePath.about}
					theme={AppLinkTheme.SECONDARY}
				>
					{t('navbar.about-link')}
				</AppLink>
			</div>
		</div>
	)
}