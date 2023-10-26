import { Theme } from '@/shared/consts/theme';

export interface JsonSettings {
  theme: Theme;
}

export type JsonSettingsKey = keyof JsonSettings;
