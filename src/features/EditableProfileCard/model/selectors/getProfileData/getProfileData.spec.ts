import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Profile } from 'entities/Profile';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
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
        data,
      },
    };

    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('empty state, should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
