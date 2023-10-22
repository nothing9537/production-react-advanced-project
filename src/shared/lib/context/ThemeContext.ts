import { createContext, Dispatch, SetStateAction } from 'react';
import { Theme } from '../../consts/theme';

export interface ThemeContextProps {
	theme?: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);
