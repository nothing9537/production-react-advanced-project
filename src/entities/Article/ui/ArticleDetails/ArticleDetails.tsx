import { FC, memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { CreatedAtIcon, ViewsIcon } from '@/shared/assets/deprecated-icons';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent';
import { ArticleBlockType } from '../../model/consts';
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

  useInitialEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content: ReactNode = null;

  if (isLoading) {
    content = (
      <div className={classNames(cls.ArticleDetails, { [cls.loading]: isLoading }, [className])}>
        <Skeleton width={200} height={200} borderRadius="50%" className={cls.avatar} />
        <Skeleton width={700} height={30} />
        <Skeleton width={400} height={30} />
        <Skeleton width={300} height={16} />
        <Skeleton height={200} />
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
        <VStack justify="center" align="center" gap={12}>
          <Avatar
            width={200}
            height={200}
            src={data?.img}
            alt="Avatar"
          />
        </VStack>
        <VStack gap={4} data-testid="ArticleDetailsInfo">
          <Text
            title={data?.title}
            text={data?.subtitle}
            size={TextSize.L}
          />
          <HStack gap={12}>
            <Icon SVG={<ViewsIcon />} />
            <Text text={data?.views.toString()} />
          </HStack>
          <HStack gap={12}>
            <Icon SVG={<CreatedAtIcon />} />
            <Text text={new Date(data?.createdAt as number).toLocaleString()} />
          </HStack>
        </VStack>
        <VStack gap={16} justify="center" align="center">
          {data?.blocks.map(renderBlock)}
        </VStack>
      </article>
    );
  }

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])} data-testid="ArticleDetails">
        {content}
      </div>
    </DynamicModuleWrapper>
  );
});
