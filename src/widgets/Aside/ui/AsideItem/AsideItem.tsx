import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { AsideItemType } from '../../model/types/asideItems';
import cls from './AsideItem.redesigned.module.scss';
import deprecatedCls from './AsideItem.module.scss';

interface AsideItemProps {
  item: AsideItemType;
  isCollapsed?: boolean;
}

export const AsideItem: FC<AsideItemProps> = memo(({ item, isCollapsed }) => {
  const { t } = useTranslation('aside');
  const { text, path, Icon: AsideIcon, authOnly } = item;
  const isAuth = useAppSelector(getUserAuthData);

  if (!isAuth && authOnly) {
    return null;
  }

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <AppLink
          noUnderline
          to={path}
          activeClassName={cls.active}
          className={classNames(cls.link, { [cls.collapsed]: isCollapsed })}
        >
          <Icon SVG={<AsideIcon />} />
          <span>{t(text)}</span>
        </AppLink>
      )}
      off={(
        <AppLinkDeprecated
          to={path}
          className={classNames(deprecatedCls.link, { [deprecatedCls.collapsed]: isCollapsed })}
          theme={AppLinkTheme.SECONDARY}
        >
          <div className={deprecatedCls.item}>
            <AsideIcon />
            <span className={deprecatedCls['link-item']}>
              {t(text)}
            </span>
          </div>
        </AppLinkDeprecated>
      )}
    />
  );
});
