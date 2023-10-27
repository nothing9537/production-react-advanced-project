import { FC, ReactNode, memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button';
import cls from './Tabs.module.scss';
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export interface TabOption {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabOption[];
  value: string;
  onTabClick: (tab: TabOption) => void;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Tabs: FC<TabsProps> = memo(({ className, tabs, value, onTabClick }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onClick = useCallback((tab: TabOption, index: number) => () => {
    if (activeTab !== index) {
      setActiveTab(index);
      onTabClick(tab);
    }
  }, [onTabClick, activeTab]);

  useEffect(() => {
    const candidate = tabs.findIndex((t) => t.value === value);

    if (candidate) {
      setActiveTab(candidate);
    }
  }, [tabs, value]);

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab, index) => (
        <Button
          key={tab.value}
          onClick={onClick(tab, index)}
          theme={activeTab === index ? ButtonTheme.OUTLINE_RED : ButtonTheme.OUTLINE}
        >
          {tab.content}
        </Button>
      ))}
    </div>
  );
});
