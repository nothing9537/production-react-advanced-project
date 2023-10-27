import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme as ButtonThemeDeprecated } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import deprecatedCls from './LanguageSwitcher.module.scss';
import cls from './LanguageSwitcher.redesigned.module.scss';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

const LanguageMapper: Record<string, string> = {
  ru: 'RU',
  ua: 'UA',
  en: 'EN',
};

export const LanguageSwitcher: FC<LanguageSwitcherProps> = memo(({ className, short }) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <Button className={cls.LanguageSwitcher} variant="clear" onClick={toggle}>
          {LanguageMapper[i18n.language as string]}
        </Button>
      )}
      off={(
        <ButtonDeprecated
          onClick={toggle}
          theme={ButtonThemeDeprecated.CLEAR}
          className={classNames(deprecatedCls.LanguageSwitcher, {}, [className])}
        >
          {t(short ? 'short-language' : 'language')}
        </ButtonDeprecated>
      )}
    />
  );
});
