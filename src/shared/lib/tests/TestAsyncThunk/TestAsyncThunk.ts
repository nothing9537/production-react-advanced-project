/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

export type ActionCreatorType<ReturnType, ArgType, RejectedValue>
  = (arg: ArgType) => AsyncThunkAction<ReturnType, ArgType, { rejectValue: RejectedValue; }>;

export class TestAsyncThunk<ReturnType, ArgType, RejectedValue = string> {
  dispatch: jest.MockedFn<any>;

  actionCreator: ActionCreatorType<ReturnType, ArgType, RejectedValue>;

  getState: () => StateSchema;

  API: jest.MockedFunctionDeep<AxiosStatic>;

  navigate?: jest.MockedFn<any>;

  constructor(actionCreator: ActionCreatorType<ReturnType, ArgType, RejectedValue>, state?: DeepPartial<StateSchema>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.navigate = jest.fn();
    this.getState = jest.fn(() => state as StateSchema);
    this.API = mockedAxios;
  }

  public async callThunk(arg: ArgType) {
    const action = this.actionCreator(arg);
    const actionCallResult = await action(this.dispatch, this.getState, { API: this.API, navigate: this.navigate });

    return actionCallResult;
  }
}
