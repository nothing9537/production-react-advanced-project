import { rtkAPI } from 'shared/API/rtkAPI';

const recommendationsAPI = rtkAPI.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendations: build.query({
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
