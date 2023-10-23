import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { initArticlesList } from './initArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList.ts');

describe('initArticlesList.spec', () => {
  test('Should be called when _inited is false', async () => {
    const thunk = new TestAsyncThunk(initArticlesList, {
      articlesList: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        _inited: false,
      },
    });

    await thunk.callThunk('');

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticlesList).toBeCalled();
  });

  test('Shouldn\'t be called when _inited is true', async () => {
    const thunk = new TestAsyncThunk(initArticlesList, {
      articlesList: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        _inited: true,
      },
    });

    await thunk.callThunk('');

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toBeCalled();
  });
});
