// Import package
import React, { useEffect, useState } from 'react';

// Import rtk query
import {
  useGetGraphDataMutation,
  useGetMoviesMutation,
} from '../../../store/api';

// Import components
import showToast from '../../components/showToast';
import DataTable from '../../components/DataTable/DataTable';
import AnimatedNumber from '../../components/AnimatedNumber';
import ScatterPlot from '../../components/ScatterPlot/ScatterPlot';
import BarPlot from '../../components/BarPlot/BarPlot';

// Import constants
import constants from '../../../app.constants';

// Import type
import { FilterQueryy, GraphData, MovieData } from '../../../app.model';

// Import css
import './Dashboard.css';

const Dashboard = () => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [graphData, setGraphData] = useState<GraphData[] | undefined>();
  const [queryObj, setQueryObj] = useState({
    search: '',
    pageNo: 0,
    limit: 10,
    sort: '-releaseDate',
  });
  const [filterObj, setFilterObj] = useState<FilterQueryy>({
    'productionBudget[$gte]': 0,
    'domesticGross[$gte]': 0,
    'worldWideGross[$gte]': 0,
    'productionBudget[$lte]': 999999999999999,
    'domesticGross[$lte]': 999999999999999,
    'worldWideGross[$lte]': 999999999999999,
  });
  const { search, limit, pageNo, sort } = queryObj;
  const [getMovies] = useGetMoviesMutation();
  const [getGraphData] = useGetGraphDataMutation();

  /**
   * Function handle change in value of input fields
   * @param {React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>} e
   */
  const onChange = (
      e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQueryObj({ ...queryObj, [e.target.id]: e.target.value });
  };

  /**
   * Function to handle pagination
   * @param {{selected: number}} e
   */
  const handlePageClick = (e: { selected: number }) => {
    setQueryObj({ ...queryObj, pageNo: e.selected });
  };

  useEffect(() => {
    /**
     * Function to get movies data from db with all queryies and filters
     */
    const fetchMovieData = async () => {
      const res = await getMovies({
        ...queryObj,
        pageNo: pageNo + 1,
        ...filterObj,
      });
      const response =
        'data' in res ? res.data : 'data' in res.error ? res.error.data : null;
      if (response.success) {
        setMovieData(response.data);
      } else {
        showToast({ message: `${response.message}`, type: 'error' });
      }
    };
    fetchMovieData();
  }, [getMovies, queryObj, pageNo, filterObj]);

  useEffect(() => {
    /**
     * Function to get movies data from db with all queryies and filters
     */
    const fetchGraphData = async () => {
      const res = await getGraphData(null);
      const response =
        'data' in res ? res.data : 'data' in res.error ? res.error.data : null;
      if (response.success) {
        setGraphData(response.data);
      } else {
        showToast({ message: `${response.message}`, type: 'error' });
      }
    };
    fetchGraphData();
  }, [getGraphData]);

  return (
    <>
      {movieData && (
        <>
          <div className="dashboard-main-container">
            <div className="dashboard-heading-container">
              <h1 className="dashboard-title">Welcome to Cine Info</h1>
              <p className="dashboard-sub-title">
                You can search for any movies as well as can filter and sort the
                data
              </p>
            </div>
            <div className="plot-and-cards-container">
              <div className="scatter-plot-container">
                <ScatterPlot data={graphData} />
              </div>
              <div className="dashboard-cards-container">
                {constants.dashboardCardsData.map((data, ind) => (
                  <div key={ind} className="dashboard-card">
                    <h2 className="dashboard-card-title">{data.title}</h2>
                    <AnimatedNumber n={data.number} color={data.color} />
                    <p className="dashboard-card-date">
                      {new Date(Date.now()).toDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='bar-plot-container'>
              <BarPlot data={graphData} />
            </div>
            <DataTable
              movieData={movieData}
              search={search}
              limit={limit}
              onChange={onChange}
              handlePageClick={handlePageClick}
              pageNo={pageNo}
              sort={sort}
              filterObj={filterObj}
              setFilterObj={setFilterObj}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
