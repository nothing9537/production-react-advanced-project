export { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
export { fetchCommentsByArticleId } from './model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
export {
  articleDetailsCommentsReducer,
  articleDetailsCommentsActions,
  getArticleComments,
} from './model/slice/articleDetailsCommentsSlice';
export {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from './model/selectors/articleDetailsComments';
