import { FC, memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { AsideItemsList } from 'widgets/Aside/model/items';
import { getUserAuthData } from 'entities/User';
import { AsideItem } from '../AsideItem/AsideItem';
import cls from './Aside.module.scss';

interface AsideProps {
  className?: string;
}

export const Aside: FC<AsideProps> = memo(({ className }) => {
  const [isCollapsed, setIsCollaped] = useState<boolean>(false);
  const authData = useAppSelector(getUserAuthData);

  const onToggle = () => {
    setIsCollaped((prev) => !prev);
  };

  const itemsList = useMemo(() => AsideItemsList.map((asideItem) => (
    <AsideItem
      item={asideItem}
      key={asideItem.path}
      isCollapsed={isCollapsed}
    />
  // eslint-disable-next-line react-hooks/exhaustive-deps
  )), [isCollapsed, authData]);

  return (
    <div data-testid="aside" className={classNames(cls.Aside, { [cls.collapsed]: isCollapsed }, [className])}>
      <Button
        data-testid="aside-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {isCollapsed ? '>' : '<'}
      </Button>
      <div className={cls.links}>
        {itemsList}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={isCollapsed} />
      </div>
    </div>
  );
});
