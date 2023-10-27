import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogoIcon } from '@/shared/assets/icons';
import { HStack } from '../Stack';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const AppLogo: FC<AppLogoProps> = memo(({ className }) => {
  return (
    <HStack justify="center" className={classNames(cls.AppLogo, {}, [className])}>
      <div className={cls.gradient} />
      <div className={cls['gradient-overflow']} />
      <AppLogoIcon />
    </HStack>
  );
});
