import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { ListIcon, TileIcon } from '@/shared/assets/icons';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { ArticlesView } from '@/entities/Article';
import cls from './ViewSelector.module.scss';

const views = [
  {
    view: ArticlesView.TILE,
    icon: <Icon SVG={<TileIcon />} />,
  },
  {
    view: ArticlesView.LIST,
    icon: <Icon SVG={<ListIcon />} />,
  },
];

interface ViewSelectorProps {
  className?: string;
  currentView?: ArticlesView;
  onChangeView: (view: ArticlesView) => void;
}

export const ViewSelector: FC<ViewSelectorProps> = memo(({ className, currentView, onChangeView }) => {
  const onViewChangeClick = useCallback((newView: ArticlesView) => () => {
    onChangeView?.(newView);
  }, [onChangeView]);

  return (
    <div className={classNames(cls.ViewSelector, {}, [className])}>
      {views.map((viewItem) => (
        <Button
          theme={ButtonTheme.CLEAR}
          key={viewItem.view}
          onClick={onViewChangeClick(viewItem.view)}
          className={classNames('', { [cls.selected]: currentView === viewItem.view })}
        >
          {viewItem.icon}
        </Button>
      ))}
    </div>
  );
});
