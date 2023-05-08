import { FC, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
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
		<div className={classNames(cls.Aside, { [cls.collapsed]: isCollapsed }, [className])}>
			<button onClick={onToggle}>
				toggle
			</button>
			<div className={cls.switchers}>
				<ThemeSwitcher />
			</div>
		</div>
	)
}