import { ArticleBlockType } from '../../model/consts';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent';

export const renderBlock = (block: ArticleBlock) => {
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
};
