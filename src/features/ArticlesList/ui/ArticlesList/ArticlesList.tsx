/* eslint-disable react/no-unstable-nested-components */
import { FC, HTMLAttributeAnchorTarget, memo, useCallback, useEffect, useState } from 'react';
import { Virtuoso, VirtuosoGrid, GridScrollSeekPlaceholderProps } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';
import { ARTICLES_SCROLL_ITEM_INDEX } from 'shared/consts/localStorage';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { Article, ArticlesView } from 'entities/Article';
import { ArticleListItemSkeleton } from '../ArticlesListItem/ArticleListItemSkeleton';
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
import { VirtuosoHeader } from '../ArticlesListItem/VirtuosoHeader';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view: ArticlesView;
  target?: HTMLAttributeAnchorTarget;
  onNextArticlesPageLoad?: () => void;
}

const getSkeletons = (view: ArticlesView) => {
  switch (view) {
    case ArticlesView.LIST:
      return Array(3).fill(0).map((_, index) => <ArticleListItemSkeleton key={index} view={view} />);
    case ArticlesView.TILE:
      return Array(9).fill(0).map((_, index) => <ArticleListItemSkeleton key={index} view={view} />);
    default:
      return null;
  }
};

export const ArticlesList: FC<ArticlesListProps> = memo(({ className, articles, view, isLoading, target, onNextArticlesPageLoad }) => {
  const { t } = useTranslation('articles');
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const articleIndex = sessionStorage.getItem(ARTICLES_SCROLL_ITEM_INDEX);

    if (articleIndex) {
      setScrollIndex(+articleIndex);
    }
  }, []);

  const renderArticle = useCallback((index: number, article: Article) => (
    <ArticlesListItem
      key={article.id}
      article={article}
      view={view}
      target={target}
      index={index}
      className={cls['list-item']}
    />
  ), [view, target]);

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
        <Text text={t('articles-not-found')} />
      </div>
    );
  }

  const TileItemContainer: FC<GridScrollSeekPlaceholderProps> = memo(({ index }) => {
    return (
      <div className={cls['tile-item-container']}>
        <ArticleListItemSkeleton key={index} view={view} />
      </div>
    );
  });

  const ListFooter = memo(() => {
    if (isLoading) {
      return (
        <div className={cls.skeletons}>
          {getSkeletons(view)}
        </div>
      );
    }

    return null;
  });

  const GridFooter = memo(() => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {isLoading && getSkeletons(view)}
      </div>
    );
  });

  return (
    <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
      {view === ArticlesView.LIST ? (
        <Virtuoso
          data={articles}
          totalCount={articles.length}
          itemContent={renderArticle}
          style={{ height: '100%', width: '100%' }}
          endReached={onNextArticlesPageLoad}
          initialTopMostItemIndex={scrollIndex}
          className={classNames('', {}, ['scroll', cls[view]])}
          components={{
            Header: VirtuosoHeader,
            Footer: ListFooter,
          }}
        />
      ) : (
        <VirtuosoGrid
          data={articles}
          totalCount={articles.length}
          style={{ height: '100%', width: '100%' }}
          className={classNames('', {}, ['scroll', cls[view]])}
          endReached={onNextArticlesPageLoad}
          itemContent={renderArticle}
          listClassName={cls['tile-items-wrapper']}
          components={{
            Header: VirtuosoHeader,
            ScrollSeekPlaceholder: TileItemContainer,
            Footer: GridFooter,
          }}
          scrollSeekConfiguration={{
            enter: (velocity) => Math.abs(velocity) > 200,
            exit: (velocity) => Math.abs(velocity) < 30,
          }}
        />
      )}
    </div>
  );
});
