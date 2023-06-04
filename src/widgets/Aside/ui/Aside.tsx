/* eslint-disable i18next/no-literal-string */
import { FC, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import { LanguageSwitcher } from 'widgets/LanguageSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import cls from './Aside.module.scss'

interface AsideProps {
	className?: string;
}

export const Aside: FC<AsideProps> = ({ className }) => {

	const [isCollapsed, setIsCollaped] = useState<boolean>(false)

	const onToggle = () => {
		setIsCollaped(prev => !prev)
	}

	return (
		<div data-testid='aside' className={classNames(cls.Aside, { [cls.collapsed]: isCollapsed }, [className])}>
			<Button
				data-testid='aside-toggle'
				onClick={onToggle}
			>
				Toggle
			</Button>
			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LanguageSwitcher />
			</div>
		</div>
	)
}