import { FieldValues } from 'react-hook-form';
import { Input as InputDeprecated, InputProps as InputPropsDeprecated } from '@/shared/ui/deprecated/Input';
import { Select as SelectDeprecated, SelectProps as SelectPropsDeprecated } from '@/shared/ui/deprecated/Popups/ui/Select';
import { Input, InputProps } from '@/shared/ui/redesigned/Input';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { withController } from '../../hoc/withController/withController';

export const controlledInputsFactory = <T extends FieldValues>() => {
  /**
   * @deprecated
   */
  const ControlledInputDeprecated = withController<InputPropsDeprecated, T>(InputDeprecated);
  /**
   * @deprecated
   */
  const ControlledSelectDeprecated = withController<SelectPropsDeprecated<string>, T>(SelectDeprecated);

  const ControlledInput = withController<InputProps, T>(Input);
  const ControlledListBox = withController(ListBox);

  return {
    ControlledInputDeprecated, ControlledSelectDeprecated, ControlledInput, ControlledListBox,
  };
};
