import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNewArticles } from './fetchNewArticles';

jest.mock('../fetchArticlesList/fetchArticlesList.ts');

describe('fetchNewArticles.spec', () => {
  test('success called, changed page and got data', async () => {
    const thunk = new TestAsyncThunk(fetchNewArticles, {
      articlesList: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalled();
  });

  test('fetchNewArticles not called, because of hasMore', async () => {
    const thunk = new TestAsyncThunk(fetchNewArticles, {
      articlesList: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });

  test('fetchNewArticles not called, because of isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNewArticles, {
      articlesList: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: false,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
