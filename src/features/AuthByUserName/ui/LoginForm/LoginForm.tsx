import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation('navbar');

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        autoFocus
        placeholder={t('enter-username')}
        type="text"
      />
      <Input
        placeholder={t('enter-password')}
        type="text"
      />
      <Button className={cls.loginBtn}>
        {t('login')}
      </Button>
    </div>
  );
};
