import { screen } from '@testing-library/react';
import { getRouteAbout, getRouteAdminPanel, getRouteProfile } from '@/shared/consts/router';
import { ComponentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AppRouter } from './AppRouter';
import { UserRole } from '@/entities/User';

describe('app/router/AppRouter', () => {
  test('Page should be in the Document', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  test('Should render the page Not Found when the user went to a non-existent root', async () => {
    ComponentRender(<AppRouter />, {
      route: '/some-unknown-rote',
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('Redirect non-authorized user to MainPage', async () => {
    ComponentRender(<AppRouter />, {
      initialState: {
        user: {
          authData: undefined,
        },
      },
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Access to protected route is forbidden (missing necessary role)', async () => {
    ComponentRender(<AppRouter />, {
      initialState: {
        user: {
          _mounted: true,
          authData: {
            id: '1',
            username: 'Nothingg9537',
            roles: [UserRole.USER],
          },
        },
      },
      route: getRouteAdminPanel(),
    });

    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  test('Allowed access to protected route (when necessary role present)', async () => {
    ComponentRender(<AppRouter />, {
      initialState: {
        user: {
          _mounted: true,
          authData: {
            id: '1',
            username: 'Nothingg9537',
            roles: [UserRole.ADMIN],
          },
        },
      },
      route: getRouteAdminPanel(),
    });

    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
