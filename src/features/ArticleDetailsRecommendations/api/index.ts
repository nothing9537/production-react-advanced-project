import { Article } from 'entities/Article';
import { rtkAPI } from 'shared/API/rtkAPI';

const recommendationsAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendations: build.query<Article[], number>({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const { useGetArticleRecommendationsQuery, useLazyGetArticleRecommendationsQuery } = recommendationsAPI;
