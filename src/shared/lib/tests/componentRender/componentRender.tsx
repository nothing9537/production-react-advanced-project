import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface RenderWithRouterOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
}

export const ComponentRender = (component: ReactNode, { route = '/', initialState }: RenderWithRouterOptions = {}) => render(
  <MemoryRouter initialEntries={[route]}>
    <StoreProvider initialState={initialState}>
      <I18nextProvider i18n={i18nForTests}>
        {component}
      </I18nextProvider>
    </StoreProvider>
  </MemoryRouter>,
);
