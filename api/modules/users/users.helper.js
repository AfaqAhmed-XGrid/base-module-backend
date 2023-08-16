/**
 * Function to handle sign in method related query
 * @param {Object} req
 * @return {Object}
 */
const signInMethodFilteration = (req) => {
  const method = req.query.method || {};

  if (method === 'google') {
    return { $match: { googleId: { $exists: true } } };
  } else if (method === 'github') {
    return { $match: { githubId: { $exists: true } } };
  } else if (method === 'local') {
    return { $match: { $and: [{ githubId: { $exists: false } }, { githubId: { $exists: false } }] } };
  } else {
    return { $match: {} };
  }
};

/**
 * Function to handle pagination
 * @param {Object} req
 * @return {Object}
 */
const constructPagination = (req) => {
  const limit = Number(req.query.limit) || 4;
  const pageNo = Number(req.query.pageNo) || 1;
  const skip = limit * (pageNo - 1);
  return { limit, skip, pageNo };
};

/**
 * Function to handle search query
 * @param {Object} req
 * @return {Object}
 */
const searchFilteration = (req) => {
  const search = req.query.search;
  const searchQuery = req.query && req.query.search ? { displayName: { $regex: search, $options: 'i' } } : {};

  return { $match: { ...searchQuery } };
};

module.exports = { signInMethodFilteration, constructPagination, searchFilteration };
