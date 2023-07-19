import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from 'redux';

export interface RenderWithRouterOprions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
}

export const ComponentRender = (component: ReactNode, { route = '/', initialState }: RenderWithRouterOprions = {}) => render(
  <StoreProvider initialState={initialState}>
    <MemoryRouter initialEntries={[route]}>
      <I18nextProvider i18n={i18nForTests}>
        {component}
      </I18nextProvider>
    </MemoryRouter>
  </StoreProvider>,
);
