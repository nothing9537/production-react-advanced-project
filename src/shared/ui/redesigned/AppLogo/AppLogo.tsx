import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogoIcon } from '@/shared/assets/deprecated-icons';
import { HStack } from '../../redesigned/Stack';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo: FC<AppLogoProps> = memo(({ className }) => {
  return (
    <HStack justify="center" className={classNames(cls.AppLogo, {}, [className])}>
      <div className={cls.gradient} />
      <div className={cls['gradient-overflow']} />
      <AppLogoIcon />
    </HStack>
  );
});
