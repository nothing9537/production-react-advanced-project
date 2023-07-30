import axios from 'axios';
// import { Dispatch } from '@reduxjs/toolkit';
// import { StateSchema } from 'app/providers/StoreProvider';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { userActions } from 'entities/User';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

describe('loginByUsername.spec', () => {
  // let dispatch: Dispatch;
  // let getState: () => StateSchema;

  // beforeEach(() => {
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });

  // test('success auth', async () => {
  //   const userAuthData = { username: '123', id: '1' };

  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: userAuthData }));

  //   const action = loginByUsername({ username: '123', password: '123' });
  //   const actionCallResult = await action(dispatch, getState, undefined);

  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userAuthData));
  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(actionCallResult.meta.requestStatus).toBe('fullfiled');
  //   expect(dispatch).toHaveBeenCalledTimes(3);
  //   expect(actionCallResult.payload).toEqual(userAuthData);
  // });
  // test('error auth', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

  //   const action = loginByUsername({ username: '123', password: '123' });
  //   const actionCallResult = await action(dispatch, getState, undefined);

  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(actionCallResult.meta.requestStatus).toBe('rejected');
  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   expect(actionCallResult.payload).toBe('error');
  // });
  // let dispatch: Dispatch;
  // let getState: () => StateSchema;

  // beforeEach(() => {
  //   dispatch = jest.fn();
  //   getState = jest.fn();
  // });

  test('success auth', async () => {
    const userAuthData = { username: '123', id: '1' };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userAuthData }));

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userAuthData));
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toEqual(userAuthData);
  });
  test('error auth', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toBe('auth-error-message');
  });
});
