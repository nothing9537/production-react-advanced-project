import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
  test('state should equal to data', () => {
    const data: Profile = {
      firstName: 'Vadym',
      lastName: 'Monastyrskyi',
      age: 21,
      username: 'Nothingg9537',
      country: Country.USA,
      currency: Currency.USD,
      city: 'Chicago',
      state: 'IL',
      address: 'Some address',
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });

  test('empty state, should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
