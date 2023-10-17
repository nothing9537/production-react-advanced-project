import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { UserRole } from 'entities/User';

export interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  state?: string;
  address?: string;
  avatar?: string;
  roles?: UserRole[];
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
