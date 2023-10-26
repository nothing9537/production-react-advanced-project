import { FC, memo, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/Stack';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { AsideItem } from '../AsideItem/AsideItem';
import { getAsideItems } from '../../model/selectors/getAsideItems/getAsideItems';
import cls from './Aside.module.scss';
import { AppLogo } from '@/shared/ui/AppLogo';

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

  /**
   * @deprecated
   */
  const AsideDeprecated = (
    <section data-testid="aside" className={classNames(cls.Aside, { [cls.collapsed]: isCollapsed }, [className])}>
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
      <VStack component="nav" gap={12} className={cls.links}>
        {itemsList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={isCollapsed} />
      </div>
    </section>
  );

  const AsideRedesigned = (
    <section data-testid="aside" className={classNames(cls.AsideRedesigned, { [cls.collapsed]: isCollapsed }, [className])}>
      <AppLogo />
    </section>
  );

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={AsideRedesigned}
      off={AsideDeprecated}
    />
  );
});
