import { Rating } from '@/entities/Rating';
import { rtkAPI } from '@/shared/API/rtkAPI';

interface GetArticleRatingParams {
  userId: string;
  articleId: string;
}

interface RateArticleRatingParams {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
}

const articleRatingAPI = rtkAPI.injectEndpoints({
  endpoints: (builder) => ({
    getArticleRating: builder.query<Rating[], GetArticleRatingParams>({
      query: ({ articleId, userId }) => ({
        url: '/article-ratings',
        params: {
          articleId,
          userId,
        },
      }),
    }),
    rateArticle: builder.mutation<void, RateArticleRatingParams>({
      query: (params) => ({
        url: '/article-ratings',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetArticleRatingQuery, useRateArticleMutation } = articleRatingAPI;
