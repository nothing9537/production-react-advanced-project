import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { LanguageSwitcher } from 'widgets/LanguageSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import AboutIcon from 'shared/assets/icons/aside-about-page.svg'
import MainIcon from 'shared/assets/icons/aside-main-page.svg'
import cls from './Aside.module.scss'

interface AsideProps {
	className?: string;
}

export const Aside: FC<AsideProps> = ({ className }) => {

	const [isCollapsed, setIsCollaped] = useState<boolean>(false)
	const { t } = useTranslation()

	const onToggle = () => {
		setIsCollaped(prev => !prev)
	}

	return (
		<div data-testid='aside' className={classNames(cls.Aside, { [cls.collapsed]: isCollapsed }, [className])}>
			<Button
				data-testid='aside-toggle'
				onClick={onToggle}
				className={cls.collapseBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				size={ButtonSize.L}
				square
			>
				{isCollapsed ? '>' : '<'}
			</Button>
			<div className={cls.links}>
				<AppLink
					to={RoutePath.main}
					className={cls.link}
					theme={AppLinkTheme.SECONDARY}
				>
					<MainIcon className={cls.icon} />
					<span className={cls['link-item']}>
						{t('navbar.main-link')}
					</span>
				</AppLink>
				<AppLink
					to={RoutePath.about}
					className={cls.link}
					theme={AppLinkTheme.SECONDARY}
				>
					<AboutIcon className={cls.icon} />
					<span className={cls['link-item']}>
						{t('navbar.about-link')}
					</span>
				</AppLink>
			</div>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LanguageSwitcher short={isCollapsed} />
			</div>
		</div>
	)
}