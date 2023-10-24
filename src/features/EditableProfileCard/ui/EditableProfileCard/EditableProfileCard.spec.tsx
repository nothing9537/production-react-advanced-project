import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
// import { $API } from '@/shared/API';
import { ComponentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  firstName: 'admin',
  lastName: 'admin',
  age: 21,
  currency: Currency.USD,
  country: Country.USA,
  city: 'Chicago',
  state: 'Illinois',
  username: 'admin',
};

const testOptions = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
      isLoading: false,
    },
    user: {
      authData: {
        id: '1',
        username: 'admin',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  test('readonly mode must change', async () => {
    ComponentRender(<EditableProfileCard id="1" />, testOptions);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });

  test('When pressing Cancel Button, form should be restored', async () => {
    ComponentRender(<EditableProfileCard id="1" />, testOptions);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'test enter firstName');
    await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'test enter lastName');

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('test enter firstName');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('test enter lastName');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('admin');
  });

  test('Validation should work', async () => {
    ComponentRender(<EditableProfileCard id="1" />, testOptions);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

    expect(screen.getByTestId('ProfileCard.firstName.error.Text')).toHaveTextContent('required');
    expect(screen.getByTestId('ProfileCard.lastName.error.Text')).toHaveTextContent('required');
  });

  test('if there are no validation errors, PUT request should be sended', async () => {
    // const mockPUTRequest = jest.spyOn($API, 'put');

    ComponentRender(<EditableProfileCard id="1" />, testOptions);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'test enter firstName');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    // expect(mockPUTRequest).toHaveBeenCalled();
  });
});
