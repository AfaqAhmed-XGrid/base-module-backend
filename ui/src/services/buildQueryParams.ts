/**
 * Function to generate query params from the object
 * @param {Record<string, string | number>} params
 * @return {string}
 */
const buildQueryParams = (params: Record<string, string | number>) => {
  const query = Object.keys(params)
      .map((key) => {
        const value = params[key];
        if (value !== undefined) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return '';
      })
      .filter((param) => param !== '')
      .join('&');

  return query ? `?${query}` : '';
};

export default buildQueryParams;
