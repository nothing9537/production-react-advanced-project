import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginState } from './getLoginState';

describe('getLoginState.spec', () => {
  const state: DeepPartial<StateSchema> = {
    loginForm: {
      error: 'error',
      isLoading: false,
      password: '123',
      username: 'admin',
    },
  };

  test('should return full loginState', () => {
    expect(getLoginState(state as StateSchema)).toEqual({ error: 'error', isLoading: false, password: '123', username: 'admin' });
  });

  test('should return individual username field', () => {
    expect(getLoginState(state as StateSchema).username).toEqual('admin');
  });

  test('should return individual error field', () => {
    expect(getLoginState(state as StateSchema).error).toEqual('error');
  });

  test('should return individual isLoading field', () => {
    expect(getLoginState(state as StateSchema).isLoading).toEqual(false);
  });

  test('should return individual password field', () => {
    expect(getLoginState(state as StateSchema).password).toEqual('123');
  });

  test('should work with empty state', () => {
    expect(getLoginState({} as StateSchema)).toEqual({ isLoading: false, password: '', username: '' });
  });
});
