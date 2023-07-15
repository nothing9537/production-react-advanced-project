import { Counter } from 'entities/Counter'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface MainPageProps {

}

const MainPage: FC<MainPageProps> = () => {

	const { t } = useTranslation('main')

	return (
		<div>
			{t('title')}
			<Counter />
		</div>
	)
}

export default MainPage