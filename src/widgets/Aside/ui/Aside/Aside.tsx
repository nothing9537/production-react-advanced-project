import { FC, memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { AsideItemsList } from 'widgets/Aside/model/items';
import { AsideItem } from '../AsideItem/AsideItem';
import cls from './Aside.module.scss';

interface AsideProps {
  className?: string;
}

export const Aside: FC<AsideProps> = memo(({ className }) => {
  const [isCollapsed, setIsCollaped] = useState<boolean>(false);

  const onToggle = () => {
    setIsCollaped((prev) => !prev);
  };

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
        {AsideItemsList.map((asideItem) => (
          <AsideItem
            item={asideItem}
            key={asideItem.path}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={isCollapsed} />
      </div>
    </div>
  );
});
