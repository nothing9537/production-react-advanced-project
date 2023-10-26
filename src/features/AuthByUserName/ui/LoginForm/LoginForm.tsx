import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { loginActions, loginReducer } from '../../model/slices/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm: FC<LoginFormProps> = memo(({ className, onSuccess }) => {
  const { t } = useTranslation('navbar');
  const { username, password, isLoading, error } = useAppSelector(getLoginState);
  const dispatch = useAppDispatch();

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLogin = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      // dispatch(initAuthData());
      onSuccess();
    }
  }, [dispatch, username, password, onSuccess]);

  return (
    <DynamicModuleWrapper reducers={initialReducers}>
      <VStack component="form" className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('auth-form')} />
        {error && <Text text={t(error)} theme={TextTheme.ERROR} />}
        <Input
          autoFocus
          placeholder={t('enter-username')}
          type="text"
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          placeholder={t('enter-password')}
          type="text"
          onChange={onChangePassword}
          value={password}
        />
        <Button
          className={cls.loginBtn}
          theme={ButtonTheme.OUTLINE}
          onClick={onLogin}
          disabled={isLoading}
          type="submit"
        >
          {t('login')}
        </Button>
      </VStack>
    </DynamicModuleWrapper>
  );
});

export default LoginForm;
