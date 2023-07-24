// Import packages
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

// Import react icons
import { FaFilter } from 'react-icons/fa';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

// Import constants
import constants from '../../../app.constants';

// Import type
import { DataTablePropType } from '../../../app.model';

// Import css
import './DataTable.css';

const DataTable = ({
  movieData,
  search,
  limit,
  onChange,
  handlePageClick,
  pageNo,
  sort,
  filterObj,
  setFilterObj,
}: DataTablePropType) => {
  const [showFilter, setShowFilter] = useState(false);
  const [currentFilterCategory, setCurrentFilterCategory] =
    useState('productionBudget');

  /**
   * Function to handle change in filter category
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const onFilterCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilterCategory(e.target.value);
    const value = filterObj ? filterObj[currentFilterCategory + '[$gte]'] : '';
    console.log(value);
  };

  /**
   * Function to handle change in maximum value of any table field
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onFilterUpperRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterObj({
      ...filterObj,
      [currentFilterCategory + '[$lte]']: Number(e.target.value),
    });
    console.log(filterObj);
  };

  /**
   * Function to handle change in minimum value of any table field
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onFilterLowerRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterObj({
      ...filterObj,
      [currentFilterCategory + '[$gte]']: Number(e.target.value),
    });
  };

  return (
    <div className="data-table-main-container">
      <div className="data-input-main-container">
        <div className="data-input-fields-container">
          <input
            type="text"
            id="search"
            className="data-input-field"
            onChange={onChange}
            placeholder="Search by title"
            value={search}
          />
          <select
            name="sort"
            id="sort"
            onChange={onChange}
            value={sort}
            className="data-input-field"
          >
            {constants.dataSortingCategories.map((sortingCategory, sortInd) => (
              <option key={sortInd} value={sortingCategory.value}>
                {sortingCategory.name}
              </option>
            ))}
          </select>
        </div>
        <div className="data-non-input-container">
          <div
            className="data-filter-button"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaFilter />
            <p>Filter</p>
          </div>
        </div>
      </div>
      {showFilter && (
        <div className="data-input-main-container">
          <div className="data-input-fields-container">
            <div className="w-full">
              <p className="data-input-title">Minimum Range</p>
              <input
                type="text"
                id="search"
                className="data-input-field"
                onChange={onFilterLowerRangeChange}
                placeholder="Minimum Range"
                value={filterObj[currentFilterCategory + '[$gte]']}
              />
            </div>
            <div className="w-full">
              <p className="data-input-title">Maximum Range</p>
              <input
                type="text"
                id="search"
                className="data-input-field"
                onChange={onFilterUpperRangeChange}
                placeholder="Maximum Range"
                value={filterObj[currentFilterCategory + '[$lte]']}
              />
            </div>
          </div>
          <div className="data-non-input-container">
            <select
              name="sort"
              id="sort"
              onChange={onFilterCategoryChange}
              value={currentFilterCategory}
              className="data-input-field"
            >
              {constants.filteringCategories.map(
                  (filterCategory, filterInd) => (
                    <option key={filterInd} value={filterCategory.value}>
                      {filterCategory.title}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>
      )}
      <div className="data-table-container">
        <table className="data-table" cellSpacing={'0.1'}>
          <thead>
            <tr>
              {constants.tableHeadings.map((heading, ind) => (
                <th key={ind}>
                  <div className="heading">
                    <h1>{heading}</h1>
                    <div className="heading-icons-container">
                      <BsArrowDown />
                      <BsArrowUp />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movieData.movieCount ? (
              movieData.movies.map((movieItem, ind) => (
                <tr key={ind}>
                  <td>{movieItem.title}</td>
                  <td>
                    {movieItem.releaseDate?.toString().slice(0, 10) ||
                      'Not Available'}
                  </td>
                  <td>{movieItem.productionBudget || 'Not Available'}</td>
                  <td>{movieItem.domesticGross || 'Not Available'}</td>
                  <td>{movieItem.worldWideGross || 'Not Available'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No movies to show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="data-input-main-container">
        <div className="data-input-fields-container">
          <select
            name="limit"
            id="limit"
            onChange={onChange}
            value={limit}
            className="data-input-field"
          >
            {constants.recordsPerPage.map((recordPerPage) => (
              <option key={recordPerPage.key} value={recordPerPage.value}>
                {recordPerPage.value} items per page
              </option>
            ))}
          </select>
        </div>
        <div className="data-non-input-container">
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
            className="data-pagination-key"
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
