const { default: to } = require( 'await-to-js' );
const Movie = require( './movie.model' );

const getAllMoviesCtrl = async ( req, res ) => {
  const search = req.query.search || {};
  const searchQuery = req.query && req.query.search ? { title: { $regex: search, $options: 'i' } } : {};
  const pageNo = req.query.pageNo || 1;
  const limit = req.query.limit || 10;
  const skip = ( pageNo - 1 ) * limit;
  const [ err, movies ] = await to( Movie.find( searchQuery ).sort( sort ? sort : '-releaseDate' ).skip( skip ).limit( limit ) );
  const [ movieCountErr, movieCount ] = await to( Movie.count( searchQuery ) );

  if ( err ) {
    logger.error( 'Failed to fetch the movies data', { error: err } );
    return res.status( 406 ).json( { success: 0, message: 'Could not get the movies data. Please try again!', data: null } );
  };

  if ( movieCountErr ) {
    return res.status( 406 ).json( { success: 0, message: 'Could not get the movies data. Please try again!', data: null } );
  }

  if ( movieCount === 0 ) {
    return res.status( 200 ).json( { success: 0, message: 'No such data available', data: null } );
  }

  if ( movieCount < skip ) {
    return res.status( 200 ).json( { success: 0, message: 'Page not found', data: null } );
  }

  return res.status( 200 ).json( { success: 0, message: 'Movies data is fetched successfully.', data: { movies, movieCount, real: movies.length } } );
};

module.exports = { getAllMoviesCtrl };
