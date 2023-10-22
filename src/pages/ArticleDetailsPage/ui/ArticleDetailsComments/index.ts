export type { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
export { fetchCommentsByArticleId } from './model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
export { addCommentForArticle } from './model/services/addCommentForArticle/addCommentForArticle';
export { ArticleDetailsComments } from './ui/ArticleDetailsComments';
export {
  articleDetailsCommentsReducer,
  articleDetailsCommentsActions,
  getArticleComments,
} from './model/slice/articleDetailsCommentsSlice';
export {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from './model/selectors/articleDetailsComments';
