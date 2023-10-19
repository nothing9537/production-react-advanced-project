import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { userActions } from '@/entities/User';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername.spec', () => {
  test('success auth', async () => {
    const userAuthData = { username: '123', id: '1' };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.API.post.mockReturnValue(Promise.resolve({ data: userAuthData }));
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userAuthData));
    expect(thunk.API.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toEqual(userAuthData);
  });
  test('error auth', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.API.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.API.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toBe('server-error');
  });
});
