import { FC, ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { ReducersMapObject } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Theme } from '@/shared/consts/theme';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
// ! Valid exception
// eslint-disable-next-line nothingg9537-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// ! Valid exception
// eslint-disable-next-line nothingg9537-plugin/layer-imports
import '@/app/styles/index.scss';

export interface ProviderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderOptions {
  children: ReactNode;
  options?: ProviderOptions;
}

export const TestProvider: FC<TestProviderOptions> = ({ children, options = {} }) => {
  const { route = '/', initialState, asyncReducers, theme = Theme.BLUE } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider>
            <div className={`App ${theme}`}>
              {children}
            </div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

export const ComponentRender = (component: ReactElement, props: ProviderOptions = {}) => {
  return render(
    <TestProvider options={props}>
      {component}
    </TestProvider>,
  );
};
