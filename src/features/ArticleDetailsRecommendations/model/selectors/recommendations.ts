import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (state: StateSchema) => state.articleDetailsRecommendations?.isLoading;
export const getArticleRecommendationsError = (state: StateSchema) => state.articleDetailsRecommendations?.error;
