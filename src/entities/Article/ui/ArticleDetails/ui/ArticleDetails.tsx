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
import { articleDetailsReducer } from '../../../model/slices/articleDetailsSlice';
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById';
import { ArticleBlock, ArticleBlockType } from '../../../../Article/model/types/article';
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../../ArticleImageBlockComponent';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../../model/selectors/articleDetails';
import cls from './ArticleDetails.module.scss';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent';

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
        return <ArticleCodeBlockComponent />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent />;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticleById(id));
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
      <div className={cls.article}>
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
          <Text text={new Date((data?.views as number) * 1000).toLocaleString()} />
        </div>
        {data?.blocks.map(renderBlock)}
      </div>
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
