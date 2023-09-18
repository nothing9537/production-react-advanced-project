/* eslint-disable react/destructuring-assignment */
import { Decorator } from '@storybook/react';
import { DefaultValues, useForm } from 'react-hook-form';

export const WithFormDecorator = <T extends object>(defaultValues: DefaultValues<T>): Decorator => function Render(Story, c) {
  const { control, setValue } = useForm<T>({ mode: 'all', defaultValues });

  return (
    <Story args={{ ...c.args, control, setValue }} />
  );
};
