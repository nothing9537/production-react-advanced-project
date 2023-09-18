import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
  test('error should be same', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: 'some error',
      },
    };

    expect(getProfileError(state as StateSchema)).toEqual('some error');
  });

  test('empty state, should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileError(state as StateSchema)).toEqual(undefined);
  });
});
