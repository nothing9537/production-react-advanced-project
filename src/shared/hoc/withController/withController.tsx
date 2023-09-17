import { FC, ReactElement } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface WrappedProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: any;
  callback?: (value: any) => void;
  rules?: RegisterOptions;
}

export const withController = <Props extends object, FormValues extends FieldValues>(WrappedComponent: FC<Props>) => ({
  control,
  name,
  defaultValue,
  callback,
  rules,
  ...restProps
}: Props & WrappedProps<FormValues>): ReactElement<Props & WrappedProps<FormValues>> => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={rules}
    render={({ field, fieldState }) => {
      return (
        <WrappedComponent
          {...field}
          {...fieldState}
          {...restProps as (Props & WrappedProps<FormValues>)}
          onChange={(value: any) => {
            field.onChange(value);
            callback?.(value);
          }}
        />
      );
    }}
  />
);
