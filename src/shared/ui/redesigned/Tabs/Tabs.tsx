import { FC, ReactNode, memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Flex, FlexDirection } from '../Stack';
import { Card } from '../Card';
import cls from './Tabs.module.scss';

export interface TabOption {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabOption[];
  value: string;
  onTabClick: (tab: TabOption) => void;
  direction?: FlexDirection
}

export const Tabs: FC<TabsProps> = memo(({ className, tabs, value, onTabClick, direction = 'row' }) => {
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
    <Flex
      gap={8}
      direction={direction}
      align="flex-start"
      className={className}
    >
      {tabs.map((tab, index) => {
        const isSelected = activeTab === index;

        return (
          <Card
            key={tab.value}
            onClick={onClick(tab, index)}
            variant={isSelected ? 'light' : 'normal'}
            className={classNames(cls.tab, { [cls.selected]: isSelected })}
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
