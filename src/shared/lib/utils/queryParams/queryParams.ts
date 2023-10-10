type QueryParams = { [key: string]: string | undefined };

export const getQueryParams = (params: QueryParams) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value);
    }
  });

  return `?${searchParams.toString()}`;
};

export const addQueryParams = (params: QueryParams) => {
  window.history.pushState(null, '', getQueryParams(params));
};

export const parseQueryParams = (searchString: string): QueryParams => {
  const result: QueryParams = {};

  const withoutQuote = searchString.replace('?', '');
  const splitString = withoutQuote.split('&');

  splitString.forEach((str) => {
    const [key, value] = str.split('=');

    if (value !== undefined) {
      result[key] = value;
    }
  });

  return result;
};

export const getQueryParamValue = (searchString: string, desiredParam: string) => {
  const params = parseQueryParams(searchString);

  return params[desiredParam];
};
