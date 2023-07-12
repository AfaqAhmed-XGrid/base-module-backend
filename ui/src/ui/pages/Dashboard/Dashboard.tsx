// Import package
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

// Import rtk query
import { useGetMoviesMutation } from '../../../store/api';

// Import type
import { MovieData } from '../../../app.model';

// Import css
import './Dashboard.css';
import constants from '../../../app.constants';

const Dashboard = () => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [queryObj, setQueryObj] = useState({
    search: '',
    pageNo: 0,
    limit: 10,
  });
  const { search, limit, pageNo } = queryObj;
  const [getMovies] = useGetMoviesMutation();

  const onChange = (
      e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQueryObj({ ...queryObj, [e.target.id]: e.target.value });
  };

  const handlePageClick = (e: {selected: number}) => {
    setQueryObj({ ...queryObj, pageNo: e.selected });
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      const res = await getMovies({ ...queryObj, pageNo: pageNo+1 });
      const response =
        'data' in res ? res.data : 'data' in res.error ? res.error.data : null;
      if (response.success) {
        setMovieData(response.data);
      } else {
        toast.success(`${response.message}`, {
          duration: 3000,
          position: 'bottom-center',
          ariaProps: {
            'role': 'status',
            'aria-live': 'polite',
          },
        });
      }
    };
    fetchMovieData();
  }, [getMovies, queryObj, pageNo]);

  return (
    <>
      {movieData && (
        <div className="dashboard-main-container">
          <h1 className="dashboard-title">Welcome to Cine Info</h1>
          <p className="dashboard-sub-title">
            You can search for any movies as well as can filter and sort the
            data
          </p>
          <div className="dashboard-query-container">
            <div style={{ whiteSpace: 'nowrap' }}>
              <input
                type="text"
                id="search"
                className="dashboard-search-field"
                onChange={onChange}
                placeholder="Search by title"
                value={search}
              />
              <select
                name="limit"
                id="limit"
                onChange={onChange}
                value={limit}
                className="dashboard-limit-field"
              >
                {constants.recordsPerPage.map((recordPerPage) => (
                  <option key={recordPerPage.key} value={recordPerPage.value}>
                    {recordPerPage.value} items per page
                  </option>
                ))}
              </select>
            </div>
            <div className='dashboard-pagination'>
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(movieData.movieCount / limit)}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                forcePage={pageNo}
                className='dashboard-pagination-key'
              />
            </div>
          </div>
          <div className="dashboard-table-container">
            <div>
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>
                      <h1>Title</h1>
                    </th>
                    <th>
                      <h1>Release Date</h1>
                    </th>
                    <th>
                      <h1>Production Budget</h1>
                    </th>
                    <th>
                      <h1>Domestic Gross</h1>
                    </th>
                    <th>
                      <h1>World Wide Gross</h1>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {movieData.movies ? (
                    movieData.movies.map((movieItem, ind) => (
                      <tr key={ind}>
                        <td>{movieItem.title}</td>
                        <td>
                          {movieItem.releaseDate?.toString().slice(0, 10) || 'Not Available'}
                        </td>
                        <td>{movieItem.productionBudget || 'Not Available'}</td>
                        <td>{movieItem.domesticGross || 'Not Available'}</td>
                        <td>{movieItem.worldWideGross || 'Not Available'}</td>
                      </tr>
                    ))
                  ) : (
                    <p>No movies to show</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
