import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '../types/article';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from './articleDetails';

describe('articleDetails.spec', () => {
  test('should return data', () => {
    const data: DeepPartial<Article> = { id: '1', subtitle: 'Some subtitle' };
    const state: DeepPartial<StateSchema> = {
      articleDetails: { data },
    };

    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: 'some error',
      },
    };

    expect(getArticleDetailsError(state as StateSchema)).toEqual('some error');
  });

  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };

    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });
});
