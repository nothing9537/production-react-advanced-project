import { WithThemeDecorator } from './WithThemeDecorator/WithThemeDecorator';
import { WithStyleDecorator } from './WithStyleDecorator/WithStyleDecorator';
import { WithRouterDecorator } from './WithRouterDecorator/WithRouterDecorator';
import { WithStoreDecorator } from './WithStoreDecorator/WithStoreDecorator';
import { WithTranslationDecorator } from './WithTranslationDecorator/WithTranslationDecorator';

export {
  WithRouterDecorator,
  WithStyleDecorator,
  WithThemeDecorator,
  WithStoreDecorator,
  WithTranslationDecorator,
};

export enum Layers {
  SHARED = 'Shared',
  WIDGETS = 'Widgets',
}
