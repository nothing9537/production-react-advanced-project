import { FieldValues } from 'react-hook-form';
import { withController } from '../../hoc/withController/withController';
import { Input, InputProps } from '../../ui/Input/Input';
import { Select, SelectProps } from '../../ui/Popups/ui/Select';

export const controlledInputsFactory = <T extends FieldValues>() => {
  const ControlledInput = withController<InputProps, T>(Input);
  const ControlledSelect = withController<SelectProps<string>, T>(Select);

  return {
    ControlledInput, ControlledSelect,
  };
};
