import { WithThemeDecorator } from './WithThemeDecorator/WithThemeDecorator';
import { WithStyleDecorator } from './WithStyleDecorator/WithStyleDecorator';
import { WithRouterDecorator } from './WithRouterDecorator/WithRouterDecorator';

export {
  WithRouterDecorator,
  WithStyleDecorator,
  WithThemeDecorator,
};

export enum Layers {
	SHARED = 'Shared',
	WIDGETS = 'Widgets',
}
