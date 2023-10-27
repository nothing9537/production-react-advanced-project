import { FieldValues } from 'react-hook-form';
import { Input, InputProps } from '@/shared/ui/deprecated/Input';
import { withController } from '../../hoc/withController/withController';
import { Select, SelectProps } from '@/shared/ui/deprecated/Popups/ui/Select';

export const controlledInputsFactory = <T extends FieldValues>() => {
  const ControlledInput = withController<InputProps, T>(Input);
  const ControlledSelect = withController<SelectProps<string>, T>(Select);

  return {
    ControlledInput, ControlledSelect,
  };
};
