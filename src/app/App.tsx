/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import React, { Suspense, useState } from 'react'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/RouterProvider'
import { Navbar } from 'widgets/Navbar'
import { Aside } from 'widgets/Aside'
import { Modal } from 'shared/ui/Modal/Modal'

const App: React.FC = () => {

	const { theme } = useTheme()

	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div className={classNames('App', {}, [theme])}>
			<Suspense fallback="">
				<Navbar />
				<Modal isOpen={isOpen} onClose={setIsOpen}>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore provident libero dolore vero praesentium obcaecati magni repudiandae nostrum deleniti quo, facilis possimus ipsam id atque voluptates culpa nobis recusandae facere ab? Nobis perferendis corporis delectus earum harum. Perspiciatis dolores impedit suscipit cupiditate voluptatum magni beatae repudiandae. Saepe consequuntur rem expedita eum commodi maxime recusandae, earum necessitatibus voluptas facere dolores laborum illo magni. Vero eos alias corporis voluptas non nihil minus quia soluta ullam esse, eaque consectetur illum amet saepe necessitatibus cum fugit laboriosam a sint optio sequi. Aliquam earum consequatur sit voluptatem ipsa inventore exercitationem magnam perferendis. At, ad explicabo?
				</Modal>
				<button onClick={() => setIsOpen(true)}>Toggle modal</button>
				<div className='content-page'>
					<Aside />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	)
}

export default App