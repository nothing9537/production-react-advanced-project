import { FC, memo, useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ChevronIcon } from '@/shared/assets/redesigned-icons';

import { getAsideItems } from '../../model/selectors/getAsideItems/getAsideItems';
import { AsideItem } from '../AsideItem/AsideItem';
import deprecatedCls from './Aside.module.scss';
import cls from './Aside.redesigned.module.scss';

interface AsideProps {
  className?: string;
}

export const Aside: FC<AsideProps> = memo(({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const asideItems = useAppSelector(getAsideItems);

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

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
    <section data-testid="aside" className={classNames(deprecatedCls.Aside, { [deprecatedCls.collapsed]: isCollapsed }, [className])}>
      <Button
        data-testid="aside-toggle"
        onClick={onToggle}
        className={deprecatedCls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {isCollapsed ? '>' : '<'}
      </Button>
      <VStack component="nav" gap={12} className={deprecatedCls.links}>
        {itemsList}
      </VStack>
      <div className={deprecatedCls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={isCollapsed} />
      </div>
    </section>
  );

  const AsideRedesigned = (
    <section
      data-testid="aside"
      className={classNames(cls.AsideRedesigned, { [cls.collapsed]: isCollapsed }, [className])}
    >
      <AppLogo />
      <VStack component="nav" className={cls.links}>
        {itemsList}
      </VStack>
      <Icon
        clickable
        SVG={<ChevronIcon />}
        className={classNames(cls['collapse-button'], { [cls['is-button-collapsed']]: isCollapsed })}
        onClick={onToggle}
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher short={isCollapsed} />
      </div>
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
