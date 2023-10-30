import { FC, memo, useCallback } from 'react';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme as TextThemeDeprecated } from '@/shared/ui/deprecated/Text';
import { Button as ButtonDeprecated, ButtonTheme as ButtonThemeDeprecated } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { ToggleFeatures } from '@/shared/lib/features';

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
  const { t } = useAppTranslation('navbar');
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
      onSuccess();
    }
  }, [dispatch, username, password, onSuccess]);

  /**
   * @deprecated
   */
  const LoginFormDeprecated = (
    <VStack component="form" className={classNames(cls.LoginForm, {}, [className])}>
      <TextDeprecated title={t('auth-form')} />
      {error && (
        <TextDeprecated text={t(error)} theme={TextThemeDeprecated.ERROR} />
      )}
      <InputDeprecated
        autoFocus
        placeholder={t('enter-username')}
        type="text"
        onChange={onChangeUsername}
        value={username}
      />
      <InputDeprecated
        placeholder={t('enter-password')}
        type="text"
        onChange={onChangePassword}
        value={password}
      />
      <ButtonDeprecated
        className={cls.loginBtn}
        theme={ButtonThemeDeprecated.OUTLINE}
        onClick={onLogin}
        disabled={isLoading}
        type="submit"
      >
        {t('login')}
      </ButtonDeprecated>
    </VStack>
  );

  const LoginFormRedesigned = (
    <VStack component="form" className={classNames(cls.LoginForm, {}, [className])} gap={16}>
      <Text title={t('auth-form')} />
      {error && <Text text={t(error)} variant="error" />}
      <Input
        size="m"
        autoFocus
        placeholder={t('enter-username')}
        type="text"
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        size="m"
        placeholder={t('enter-password')}
        type="password"
        onChange={onChangePassword}
        value={password}
      />
      <Button
        className={cls.loginBtn}
        variant="outlined"
        onClick={onLogin}
        disabled={isLoading}
        type="submit"
      >
        {t('login')}
      </Button>
    </VStack>
  );

  return (
    <DynamicModuleWrapper reducers={initialReducers}>
      <ToggleFeatures
        name="isAppRedesigned"
        on={LoginFormRedesigned}
        off={LoginFormDeprecated}
      />
    </DynamicModuleWrapper>
  );
});

export default LoginForm;
