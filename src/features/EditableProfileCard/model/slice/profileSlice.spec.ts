import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile, ProfileSchema } from '@/entities/Profile';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { profileActions, profileReducer } from './profileSlice';

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

describe('profileSlice.spec', () => {
  test('setReadonly should work', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };

    expect(profileReducer(
      state as ProfileSchema,
      profileActions.setReadonly(true),
    )).toEqual({ readonly: true });
  });

  test('cancelEdit should set readonly to true and form to default data', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false, form: { firstName: 'dsadsa', lastName: 'sadasdF' }, data };

    expect(profileReducer(
      state as ProfileSchema,
      profileActions.cancelEdit(),
    )).toEqual({ readonly: true, form: data, data });
  });

  test('update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: 'Random username' } };

    expect(profileReducer(
      state as ProfileSchema,
      profileActions.updateProfile({ username: 'Changed username' }),
    )).toEqual({ form: { username: 'Changed username' } });
  });

  test('test updateProfileData service pending', () => {
    const state: DeepPartial<ProfileSchema> = { error: 'Some error', isLoading: false };

    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.pending,
    )).toEqual({ error: undefined, isLoading: true });
  });

  test('test updateProfileData service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true };

    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.fulfilled(data, ''),
    )).toEqual({ isLoading: false, form: data, data, error: undefined, readonly: true });
  });
});
