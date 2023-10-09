import { FC, memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { AsideItem } from '../AsideItem/AsideItem';
import { getAsideItems } from '../../model/selectors/getAsideItems/getAsideItems';
import cls from './Aside.module.scss';

interface AsideProps {
  className?: string;
}

export const Aside: FC<AsideProps> = memo(({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const asideItems = useAppSelector(getAsideItems);

  const onToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => asideItems.map((asideItem) => (
    <AsideItem
      item={asideItem}
      key={asideItem.path}
      isCollapsed={isCollapsed}
    />
  )), [isCollapsed, asideItems]);

  return (
    <aside data-testid="aside" className={classNames(cls.Aside, { [cls.collapsed]: isCollapsed }, [className])}>
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
    </aside>
  );
});
