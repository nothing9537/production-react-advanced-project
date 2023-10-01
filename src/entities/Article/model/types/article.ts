export enum ArticleBlockType {
  CODE = 'CODE',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

interface BaseArticleBlock<T = ArticleBlockType> {
  id: string;
  type: T;
}

export interface ArticleCodeBlock extends BaseArticleBlock<ArticleBlockType.CODE> {
  code: string;
}

export interface ArticleImageBlock extends BaseArticleBlock<ArticleBlockType.IMAGE> {
  src: string;
  title: string;
}

export interface ArticleTextBlock extends BaseArticleBlock<ArticleBlockType.TEXT> {
  title?: string;
  paragraphs: string[];
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: number;
  type: string[];
  blocks: ArticleBlock[];
}
