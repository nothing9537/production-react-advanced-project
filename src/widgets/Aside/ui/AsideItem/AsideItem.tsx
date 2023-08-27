import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { AsideItemType } from 'widgets/Aside/model/items';
import cls from './AsideItem.module.scss';

interface AsideItemProps {
  item: AsideItemType;
  isCollapsed?: boolean;
}

export const AsideItem: FC<AsideItemProps> = memo(({ item, isCollapsed }) => {
  const { t } = useTranslation('aside');
  const { text, path, Icon } = item;

  return (
    <AppLink
      to={path}
      className={classNames(cls.link, { [cls.collapsed]: isCollapsed })}
      theme={AppLinkTheme.SECONDARY}
    >
      <Icon className={cls.icon} />
      <span className={cls['link-item']}>
        {t(text)}
      </span>
    </AppLink>
  );
});
