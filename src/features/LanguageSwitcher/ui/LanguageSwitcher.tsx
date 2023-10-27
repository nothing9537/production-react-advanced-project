import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import cls from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = memo(({ className, short }) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      onClick={toggle}
      theme={ButtonTheme.CLEAR}
      className={classNames(cls.LanguageSwitcher, {}, [className])}
    >
      {t(short ? 'short-language' : 'language')}
    </Button>
  );
});
