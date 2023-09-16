import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export interface Profile {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  state?: string;
  address?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
