import { CounterSchema } from 'entities/Counter';
import { UserShema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';

export interface StateSchema {
  counter: CounterSchema;
  user: UserShema;
  loginForm?: LoginSchema;
}
