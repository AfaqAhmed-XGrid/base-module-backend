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
  excludedFields.forEach((queryElement) => delete queryObj[queryElement]);

  const filteringField = '$' + Object.keys(queryObj)[0];

  if (filteringField.includes('undefined')) return { filteringCondition: null, filteringValue: null, filteringField: null };

  const filteringCondition = Object.keys(queryObj[filteringField.slice(1)])[0];
  const filteringValue = queryObj[filteringField.slice(1)][filteringCondition];

  return { filteringCondition, filteringValue, filteringField };
};

/**
 * Function construct the sorting query
 * @param {Object} req
 * @return {Object}
 */
const constructSorting = (req) => {
  const sort = req.query.sort ? req.query.sort.split(',').join(' ') : ('-releaseDate');
  const sortingField = sort.slice(1);
  const sortingOrder = sort.slice(0, 1) + 1;

  return { sortingField, sortingOrder };
};

module.exports = { constructPagination, constructsearchquery, constructFilterQueryObj, constructSorting };
