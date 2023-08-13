import { Country, Currency } from 'shared/consts/common';

export interface Profile {
  firstName: string;
  lastName: string;
  nickname: string;
  age: number;
  currencies: Currency[];
  country: Country;
  city: string;
  state: string;
  address: string;
  avatar: string;
}

export interface ProfileSchema {
  data?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
