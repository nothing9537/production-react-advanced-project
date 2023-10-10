import { getQueryParams } from './queryParams';

describe('shared/utils/queryParams', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
    });

    expect(params).toBe('?test=value');
  });

  test('test with multiple params', () => {
    const params = getQueryParams({
      test: 'value',
      test_second: '2',
    });

    expect(params).toBe('?test=value&test_second=2');
  });

  test('test with undefined', () => {
    const params = getQueryParams({
      test: 'value',
      test_second: undefined,
    });

    expect(params).toBe('?test=value');
  });
});
