import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export type ActionCreatorType<ReturnType, ArgType, RejectedValue>
  = (arg: ArgType) => AsyncThunkAction<ReturnType, ArgType, { rejectValue: RejectedValue; }>;

export class TestAsyncThunk<ReturnType, ArgType, RejectedValue = string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: jest.MockedFn<any>;

  actionCreator: ActionCreatorType<ReturnType, ArgType, RejectedValue>;

  getState: () => StateSchema;

  constructor(actionCreator: ActionCreatorType<ReturnType, ArgType, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
  }

  public async callThunk(arg: ArgType, extraArg: unknown = undefined) {
    const action = this.actionCreator(arg);
    const actionCallResult = await action(this.dispatch, this.getState, extraArg);

    return actionCallResult;
  }
}
