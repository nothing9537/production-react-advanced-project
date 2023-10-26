## Working with forms

A HOC component was implemented, which takes a regular component from the UI kit and returns a controlled component to which it is enough to pass some props from useForm(), namely `control` and `name`, to link a component from the UI component library to react-hook-form.

```javascript jsx
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

export const controlledInputsFactory = <T extends FieldValues>() => {
  const ControlledInput = withController<InputProps, T>(Input);
  const ControlledSelect = withController<SelectProps<string>, T>(Select);

  return {
    ControlledInput, ControlledSelect,
  };
};
```

----

## Using

```javascript tsx
interface AuthForm {
  login: string;
  password: string;
}

export const BaseFormExample: FC = () => {
  const { control, handleSubmit } = useForm({ mode: 'all', defaultValues: { login: '', password: '' } });

  const { ControlledInput } = controlledInputsFactory<AuthForm>();

  const onSubmit = (data: AuthForm) => {
    console.log(data); // { login: 'Some login', password: 'Some password' }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        control={control}
        name='login'
        ...
      />
      <ControlledInput
        control={control}
        name='password'
        ...
      />
      <Button type="submit">
        Send
      </Button>
    </form>
  )
};



```