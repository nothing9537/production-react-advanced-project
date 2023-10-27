import { FC, memo, useCallback } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ListIcon as ListIconDeprecated, TileIcon as TileIconDeprecated } from '@/shared/assets/deprecated-icons';
import { Button as ButtonDeprecated, ButtonTheme as ButtonDeprecatedTheme } from '@/shared/ui/deprecated/Button';
import { GridViewIcon, ListViewIcon } from '@/shared/assets/redesigned-icons';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ArticlesView } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';

import deprecatedCls from './ArticleViewSelector.module.scss';
import cls from './ArticleViewSelector.redesigned.module.scss';

const views = [
  {
    view: ArticlesView.TILE,
    icon: (
      <ToggleFeatures
        name="isAppRedesigned"
        off={<IconDeprecated SVG={<TileIconDeprecated />} />}
        on={<Icon SVG={<GridViewIcon />} />}
      />
    ),
  },
  {
    view: ArticlesView.LIST,
    icon: (
      <ToggleFeatures
        name="isAppRedesigned"
        off={<IconDeprecated SVG={<ListIconDeprecated />} />}
        on={<Icon SVG={<ListViewIcon />} />}
      />
    ),
  },
];

interface ViewSelectorProps {
  className?: string;
  currentView?: ArticlesView;
  onChangeView: (view: ArticlesView) => void;
}

export const ArticleViewSelector: FC<ViewSelectorProps> = memo(({ className, currentView, onChangeView }) => {
  const onViewChangeClick = useCallback((newView: ArticlesView) => () => {
    onChangeView?.(newView);
  }, [onChangeView]);

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <div className={classNames(cls.ViewSelector, {}, [className])}>
          {views.map((viewItem) => {
            const mods: Mods = {
              [cls.selected]: currentView === viewItem.view,
              [cls['left-rounding']]: currentView === ArticlesView.TILE,
              [cls['right-rounding']]: currentView === ArticlesView.LIST,
            };

            return (
              <button
                type="button"
                key={viewItem.view}
                onClick={onViewChangeClick(viewItem.view)}
                className={classNames(cls.viewButton, mods)}
              >
                {viewItem.icon}
              </button>
            );
          })}
        </div>
      )}
      off={(
        <div className={classNames(deprecatedCls.ViewSelector, {}, [className])}>
          {views.map((viewItem) => (
            <ButtonDeprecated
              theme={ButtonDeprecatedTheme.CLEAR}
              key={viewItem.view}
              onClick={onViewChangeClick(viewItem.view)}
              className={classNames('', { [deprecatedCls.selected]: currentView === viewItem.view })}
            >
              {viewItem.icon}
            </ButtonDeprecated>
          ))}
        </div>
      )}
    />
  );
});
