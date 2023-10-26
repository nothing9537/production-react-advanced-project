import { Theme } from '@/shared/consts/theme';

export interface JsonSettings {
  theme?: Theme;
  isArticlesPageWasOpenedOnce?: boolean;
}

export type JsonSettingsKey = keyof JsonSettings;
