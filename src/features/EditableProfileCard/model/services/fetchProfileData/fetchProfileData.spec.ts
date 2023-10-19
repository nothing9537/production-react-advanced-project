import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { fetchProfileData } from './fetchProfileData';

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

describe('fetchProfileData.spec', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.API.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('1');

    expect(thunk.API.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.API.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk('1');
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
