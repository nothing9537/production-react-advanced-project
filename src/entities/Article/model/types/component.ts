import { HTMLAttributeAnchorTarget } from 'react';
import { ArticlesView } from '../consts';
import { Article } from './article';

export interface ArticlesListItemProps {
  className?: string;
  article: Article;
  view: ArticlesView;
  target?: HTMLAttributeAnchorTarget;
}
