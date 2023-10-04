import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserAuthData } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { AsideItemType } from '../../model/types/asideItems';
import cls from './AsideItem.module.scss';

interface AsideItemProps {
  item: AsideItemType;
  isCollapsed?: boolean;
}

export const AsideItem: FC<AsideItemProps> = memo(({ item, isCollapsed }) => {
  const { t } = useTranslation('aside');
  const { text, path, Icon, authOnly } = item;
  const isAuth = useAppSelector(getUserAuthData);

  if (!isAuth && authOnly) {
    return null;
  }

  return (
    <AppLink
      to={path}
      className={classNames(cls.link, { [cls.collapsed]: isCollapsed })}
      theme={AppLinkTheme.SECONDARY}
    >
      <div className={cls.item}>
        <Icon />
        <span className={cls['link-item']}>
          {t(text)}
        </span>
      </div>
    </AppLink>
  );
});
