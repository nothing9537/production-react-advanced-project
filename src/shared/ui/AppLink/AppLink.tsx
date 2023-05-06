import { FC } from 'react'
import { Link } from 'react-router-dom';
import { LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = ({ className, children, theme = AppLinkTheme.PRIMARY, ...props }) => {
	return (
		<Link {...props} className={classNames(cls.AppLink, {}, [className, cls[theme]])}>
			{children}
		</Link>
	)
}