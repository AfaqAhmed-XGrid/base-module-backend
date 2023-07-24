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
          return `${key}=${value}`;
        }
        return '';
      })
      .filter((param) => param !== '')
      .join('&');

  console.log(query);
  return query ? `?${query}` : '';
};

export default buildQueryParams;
