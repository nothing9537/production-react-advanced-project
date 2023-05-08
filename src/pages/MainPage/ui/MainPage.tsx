import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface MainPageProps {

}

const MainPage: FC<MainPageProps> = ({ }) => {

	const { t } = useTranslation()

	return (
		<div>
			{t('main-page.title')}
		</div>
	)
}

export default MainPage