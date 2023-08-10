/**
 * Function to handle pagination for the requestion data from db
 * @param {Object} req
 * @return {Object}
 */
const constructPagination = (req) => {
  const pageNo = Number(req.query.pageNo) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (pageNo - 1) * limit;
  return { pageNo, limit, skip };
};

/**
   * Function to cosntruct search query
   * @param {Object} req
   * @return {Object}
   */
const constructsearchquery = (req) => {
  const search = req.query.search || {};
  const searchQuery = req.query && req.query.search ? { title: { $regex: search, $options: 'i' } } : {};

  return searchQuery;
};

/**
   * Function to cosntruct filter query
   * @param {Object} req
   * @return {Object}
   */
const constructFilterQueryObj = (req) => {
  const queryObj = { ...req.query };

  const excludedFields = ['pageNo', 'limit', 'search', 'sort'];
  const filteringFields = Object.keys(queryObj).filter((field) => !excludedFields.includes(field));

  if (filteringFields.length === 0) {
    return { filteringConditions: null, filteringValues: null, filteringFields: null };
  }

  const filterObj = filteringFields.flatMap((field) => {
    return Object.entries(queryObj[field]).map(([key, value]) => ({
      [key]: ['$' + field, Number(value)],
    }));
  });

  return filterObj;
};

/**
   * Function to construct the sorting query
   * @param {Object} req
   * @return {Object}
   */
const constructSorting = (req) => {
  const sort = req.query.sort ? req.query.sort.split(',').join(' ') : ('-releaseDate');
  const sortingField = sort.slice(1);
  const sortingOrder = sort.slice(0, 1) + 1;

  return { sortingField, sortingOrder };
};

/**
 * Function to construct year filteration for graph data
 * @param {Object} req
 * @return {Object}
 */
const constructYearFilteration = (req) => {
  const minYear = req?.query?.minYear;
  const maxYear = req?.query?.maxYear;

  if (!minYear || !maxYear) {
    return { $match: {} };
  }

  return {
    $match: {
      releaseDate: {
        $gte: new Date(minYear, 0, 1), // Start of startYear
        $lte: new Date(maxYear, 11, 31), // End of endYear
      },
    },
  };
};

module.exports = { constructPagination, constructsearchquery, constructFilterQueryObj, constructSorting, constructYearFilteration };
