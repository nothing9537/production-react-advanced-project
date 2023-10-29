import { Control, UseFormSetValue } from 'react-hook-form';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from './profile';

export interface ProfileCardComponentProps {
  className?: string;
  data?: Profile;
  control: Control<Profile>;
  setValue: UseFormSetValue<Profile>;
  onChangeCountry?: (value: Country) => void;
  onChangeCurrency?: (value: Currency) => void;
  readonly?: boolean;
}
