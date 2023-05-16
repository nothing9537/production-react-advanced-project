import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import cls from './PageError.module.scss'

interface PageErrorProps {
	className?: string;
}

export const PageError: FC<PageErrorProps> = ({ className }) => {

	const { t } = useTranslation()

	const reloadPage = () => location.reload()

	return (
		<div className={classNames(cls.PageError, {}, [className])}>
			<h1>{t('error-message')}</h1>
			<Button onClick={reloadPage}>
				{t('error-message-update-page')}
			</Button>
		</div>
	)
}