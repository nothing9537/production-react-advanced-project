import { FC, memo, ReactNode, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { CreatedAtIcon, ViewsIcon } from 'shared/assets/icons';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import cls from './ArticleDetails.module.scss';

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};
interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(({ className, id }) => {
  const { t } = useTranslation('articles');

  const dispatch = useAppDispatch();

  const data = useAppSelector(getArticleDetailsData);
  const error = useAppSelector(getArticleDetailsError);
  const isLoading = useAppSelector(getArticleDetailsIsLoading);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} block={block} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} block={block} />;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} block={block} />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content: ReactNode = null;

  if (isLoading) {
    content = (
      <div className={classNames(cls.ArticleDetails, { [cls.loading]: isLoading }, [className])}>
        <Skeleton width={200} height={200} borderRadius="50%" className={cls.avatar} />
        <Skeleton width={700} height={30} />
        <Skeleton width={400} height={30} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </div>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
        title={t('error-fetching-article')}
      />
    );
  } else {
    content = (
      <article className={cls.article}>
        <div className={cls['avatar-wrapper']}>
          <Avatar
            width={200}
            height={200}
            src={data?.img}
            alt="Avatar"
          />
        </div>
        <Text
          title={data?.title}
          text={data?.subtitle}
          size={TextSize.L}
        />
        <div className={cls['article-info']}>
          <Icon SVG={<ViewsIcon />} />
          <Text text={data?.views.toString()} />
        </div>
        <div className={cls['article-info']}>
          <Icon SVG={<CreatedAtIcon />} />
          <Text text={new Date(data?.createdAt as number).toLocaleString()} />
        </div>
        <div className={cls.blocks}>
          {data?.blocks.map(renderBlock)}
        </div>
      </article>
    );
  }

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleWrapper>
  );
});
