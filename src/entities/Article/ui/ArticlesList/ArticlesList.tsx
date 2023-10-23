/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
import { FC, HTMLAttributeAnchorTarget, memo, useCallback, useEffect, useState } from 'react';
import { Virtuoso, VirtuosoGrid, GridScrollSeekPlaceholderProps } from 'react-virtuoso';
import { useTranslation } from 'react-i18next';
import { ARTICLES_SCROLL_ITEM_INDEX } from '@/shared/consts/localStorage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { ArticlesView } from '../../model/consts';
import { Article } from '../../model/types/article';
import { ArticleListItemSkeleton } from '../ArticlesListItem/ArticleListItemSkeleton';
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view: ArticlesView;
  target?: HTMLAttributeAnchorTarget;
  onNextArticlesPageLoad?: () => void;
  isVirtualized?: boolean;
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

export const ArticlesList: FC<ArticlesListProps> = memo((props) => {
  const { className, articles, view, isLoading, target, isVirtualized, onNextArticlesPageLoad } = props;

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

  const Header = memo(() => {
    return (
      // <ArticlesListFilters />
      null
    );
  });

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

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
        <Text text={t('articles-not-found')} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
      {isVirtualized
        ? view === ArticlesView.LIST ? (
          <Virtuoso
            data={articles}
            totalCount={articles.length}
            itemContent={renderArticle}
            style={{ height: '100%', width: '100%' }}
            endReached={onNextArticlesPageLoad}
            initialTopMostItemIndex={scrollIndex}
            className={classNames('', {}, ['scroll', cls[view]])}
            components={{
              Header,
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
              Header,
              ScrollSeekPlaceholder: TileItemContainer,
              Footer: GridFooter,
            }}
            scrollSeekConfiguration={{
              enter: (velocity) => Math.abs(velocity) > 200,
              exit: (velocity) => Math.abs(velocity) < 30,
            }}
          />
        )
        : (
          <>
            {articles.length
              ? articles.map((article, index) => renderArticle(index, article))
              : null}
            {isLoading && getSkeletons(view)}
          </>
        )}
    </div>
  );
});
