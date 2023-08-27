import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.spec', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' };

    expect(loginReducer(state as LoginSchema, loginActions.setUsername('admin'))).toEqual({ username: 'admin' });
  });
  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '1' };

    expect(loginReducer(state as LoginSchema, loginActions.setPassword('123'))).toEqual({ password: '123' });
  });
  test('test set error', () => {
    const state: DeepPartial<LoginSchema> = { error: '' };

    expect(loginReducer(state as LoginSchema, loginActions.setError('error'))).toEqual({ error: 'error' });
  });
  test('test set isLoading', () => {
    const state: DeepPartial<LoginSchema> = { isLoading: false };

    expect(loginReducer(state as LoginSchema, loginActions.setIsLoading(true))).toEqual({ isLoading: true });
  });
});
