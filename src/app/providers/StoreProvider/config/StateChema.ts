import { CounterSchema } from 'entities/Counter';
import { UserShema } from 'entities/User';

export interface StateSchema {
  counter: CounterSchema;
  user: UserShema;
}
