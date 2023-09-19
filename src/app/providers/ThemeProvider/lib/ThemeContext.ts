import { createContext, Dispatch, SetStateAction } from 'react';

export enum Theme {
	LIGHT = 'app_light_theme',
	DARK = 'app_dark_theme',
	BLUE = 'app_blue_theme',
}

export interface ThemeContextProps {
	theme?: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);
