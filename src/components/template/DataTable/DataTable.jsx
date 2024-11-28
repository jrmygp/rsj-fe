/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-binary-expression */
import { useEffect, useState } from 'react';
import styles from './DataTable.module.css';

export default function DataTable(props) {
  const {
    data,
    staticData,
    columns,
    onClickRow,
    options,
    searchKeyword,
    setTotalData,
    getResponse,
    page = 1,
    setPage = () => {},
  } = props;
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const showing = [10, 20, 50, 100];
  const totalData = data ? data?.totalCount : staticData?.length;
  const [totalDataFiltered, setTotalDataFiltered] = useState(
    data ? data?.totalCount : staticData?.length,
  );
  const [tableBody, setTableBody] = useState([]);
  const [dataTableSearch] = useState({});
  const [showEntries] = useState(showing[0]);
  const [showingInfo, setShowingInfo] = useState();
  const [pagination, setPagination] = useState([]);
  const [sortBy, setSortBy] = useState({});
  const sortType = [undefined, 'asc', 'desc'];
  const defaultOptions = {
    sorting: options?.sorting,
    pagination: options?.pagination && false,
    searching: options?.searching && false,
    bulkAction: options?.bulkAction && false,
  };
  const [tableIsTouched, setTableIsTouched] = useState(false);

  const updateShowingInfo = () => {
    let showInfo = '';
    if (options.pagination) {
      let fromEntries =
        totalDataFiltered > 0 ? showEntries * (page - 1) + 1 : 0;
      let toEntries = showEntries * page;
      toEntries = toEntries > totalDataFiltered ? totalDataFiltered : toEntries;
      showInfo = `From ${fromEntries} to ${toEntries} of total : ${totalDataFiltered || 0} ${
        totalDataFiltered < totalData
          ? '(filtered from ' + totalData + ' total entries)'
          : ''
      }`;
    } else {
      showInfo = `From ${totalDataFiltered || 0} entries ${
        totalDataFiltered < totalData
          ? '(filtered from ' + totalData + ' total entries)'
          : ''
      }`;
    }

    setShowingInfo(showInfo);
  };

  const updatePagination = () => {
    let totalPage = Math.ceil(totalDataFiltered / showEntries);

    let arrayPage = [];

    if (totalPage > 5) {
      if (page > 1) {
        arrayPage.push(1);
        arrayPage.push('...');
      }

      arrayPage.push(page);

      if (page < totalPage) {
        arrayPage.push('...');
        arrayPage.push(totalPage);
      }
    } else {
      for (let index = 1; index <= totalPage; index++) {
        arrayPage.push(index);
      }
    }

    setPagination(arrayPage);
  };

  const generateTableBody = () => {
    let filtered = data ? data?.data : staticData;
    if (Object.keys(dataTableSearch).length) {
      Object.entries(dataTableSearch).forEach((item) => {
        if (item[0] === 'global') {
          filtered = [...filtered].filter((data) =>
            columns
              .map(
                (column) =>
                  column?.assessor &&
                  data?.[column?.assessor] &&
                  data?.[column?.assessor]
                    .toString()
                    .toLowerCase()
                    .indexOf(item[1]) > -1,
              )
              .includes(true),
          );
        } else {
          filtered = [...filtered].filter((data) => data[item[0]] === item[1]);
        }
      });
    }

    if (Object.keys(sortBy).length) {
      Object.entries(sortBy).forEach((item) => {
        filtered = [...filtered].sort((a, b) => {
          let comparison = 0;

          if (a[item[0]] > b[item[0]]) {
            comparison = 1;
          } else if (a[item[0]] < b[item[0]]) {
            comparison = -1;
          }

          return item[1] === 'desc' ? comparison * -1 : comparison;
        });
      });
    }

    let tbody = [];
    if (options.pagination && staticData) {
      tbody = filtered?.filter((row, index) => {
        let start = (page - 1) * showEntries;
        let end = page * showEntries;
        if (index >= start && index < end) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      tbody = filtered;
    }

    setTableBody(tbody);
    setTotalDataFiltered(data ? data?.totalCount : filtered?.length);
  };

  useEffect(() => {
    if (data) {
      setIsDataLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (page > 1 && tableBody.length === 0 && isDataLoaded) {
        setPage(page - 1);
        setIsDataLoaded(false);
      }
    } else if (staticData) {
      if (page > 1 && tableBody.length === 0) {
        setPage(page - 1);
      }
    }
  }, [page, tableBody?.length, isDataLoaded, data, staticData]);

  useEffect(() => {
    generateTableBody();
    updatePagination();
    updateShowingInfo();

    if (tableBody.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [data, showEntries, totalDataFiltered, staticData]);

  useEffect(() => {
    if (data) {
      if (data?.data?.length === 0) {
        setPage(data.last_page || 1);
        setIsDataLoaded(false);
      }
    }
  }, [data, showEntries]);

  useEffect(() => {
    updateShowingInfo();
    updatePagination();
    generateTableBody();
  }, [page]);

  useEffect(() => {
    setPage(1);
    setIsDataLoaded(false);
  }, [searchKeyword]);

  useEffect(() => {
    setPage(page);
  }, [page]);

  // PAGINATION
  const ButttonPagination = (props) => {
    const { value } = props;
    if (value === '...') {
      return (
        <button type='button' className='btn-dots'>
          {value}
        </button>
      );
    } else {
      return (
        <button
          type='button'
          className={`${styles.btnPage} ${page === value && styles.btnPage_Active}`}
          onClick={() => {
            setPage(value);
            setIsDataLoaded(false);
            if (!tableIsTouched) {
              setTableIsTouched(true);
            }
          }}
        >
          {value}
        </button>
      );
    }
  };

  // SORTING
  const generateSort = (name, type) => {
    let typeValue = undefined;
    if (sortType.indexOf(type) === sortType.length) {
      typeValue = sortType[0];
    } else {
      typeValue = sortType[sortType.indexOf(type) + 1];
    }

    if (typeValue) {
      setSortBy({
        ...sortBy,
        [name]: typeValue,
      });
    } else {
      delete sortBy[name];
      setSortBy({ ...sortBy });
    }
  };

  useEffect(() => {
    if (Object.keys(columns).length) {
      Object.entries(columns).forEach((column) => {
        setSortBy({
          ...sortBy,
          [column.assessor]: undefined,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (getResponse) {
      getResponse(data);
    }
  }, [data]);

  useEffect(() => {
    if ((data || staticData) && setTotalData) {
      setTotalData(data?.totalCount || staticData.length);
    }
  }, [data, staticData]);

  return (
    <>
      <div className={styles.dataTable_Box}>
        <div className={styles.dataTable_Body}>
          <table className={styles.dataTable}>
            <thead className='bg-neutral20 text-neutral500 text-left text-xs font-semibold'>
              <tr className='uppercase'>
                {columns &&
                  columns.map((column, index) => (
                    <th key={index}>
                      <div>
                        <div className='flex items-center gap-4'>
                          <span>{column?.header}</span>
                        </div>
                        {defaultOptions.sorting && column.assessor && (
                          <span
                            className={`${styles.sort} ${styles[sortBy[column.assessor]]}`}
                            onClick={() =>
                              generateSort(
                                column.assessor,
                                sortBy[column.assessor],
                              )
                            }
                          ></span>
                        )}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {tableBody && tableBody.length > 0 ? (
                tableBody.map((row, iRow) => (
                  <tr key={iRow} className='border-neutral40 border-t'>
                    {columns.map((column, iCell) => (
                      <td
                        key={iCell}
                        style={column?.tdStyle}
                        className='align-top text-sm font-normal text-black'
                        onClick={
                          !column?.assessor
                            ? undefined
                            : () => onClickRow(row.id, row)
                        }
                      >
                        <div className='flex items-center'>
                          {column?.Cell
                            ? column.Cell(row, iRow)
                            : row?.[column?.assessor]}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className='text-center'>
                    <p>Empty Data...</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={`${styles.dataTable_Footer} border-neutral40 border-t`}>
          <div className={styles.showingInfo}>
            <div className='text-sm font-normal text-black'>{showingInfo}</div>
          </div>
          {options.pagination && (
            <div className={styles.pagination}>
              <button
                type='button'
                className={styles.btnQuick}
                onClick={() => {
                  setPage(page - 1);
                  setIsDataLoaded(false);
                  if (!tableIsTouched) {
                    setTableIsTouched(true);
                  }
                }}
                disabled={page === pagination[0] ?? false}
              >
                <img
                  style={{ height: '18px', margin: '0 auto' }}
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAL9JREFUSEtjZKAxYKSx+QyjFhAM4cEXRAkF/QIsLH/y5/SUNhJ0PgMDaZEMNXw/AwODAQMDQ+OcntIGQpYQHUTIhjMyMFz8/YfFYcGEwg9UsYBcw0GWE/QBJYYTtIBSw4mygJXlz4H/DAz6DAwMF/78YXEkJtyR44WoIKLEEoIWgFwDCipyLSHKAkosIdoCdEv+/2cMnNtbsoEq+QDZEFBwMTP/dSDGcIKpiJDriJEnKYiIMRBdzagFBEON5kEEACMtZRmcDwI5AAAAAElFTkSuQmCC'
                />
              </button>
              {pagination.map((value, index) => (
                <ButttonPagination key={index} value={value} />
              ))}
              <button
                type='button'
                className={styles.btnQuick}
                onClick={() => {
                  setPage(page + 1);
                  setIsDataLoaded(false);
                  if (!tableIsTouched) {
                    setTableIsTouched(true);
                  }
                }}
                disabled={page === pagination[pagination.length - 1] ?? false}
              >
                <img
                  style={{ height: '18px', margin: '0 auto' }}
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALlJREFUSEvt1LENwkAMBdBvYXo2gRFgA0ZAggFA0EMPEhmBDRiBjACb0OMoyB2i4L4tRaJI6st/53+6E3T8Scf56IFiw/9T0Wp3PJhpdak2z+K2PxZQE3g4gD2Au5nOIggFLNbn0VCtboFxFKEAnziL0EAWCQEZJAWo2g3ARIDHy3T669BDgJ9DJNwnpoFMOA1kw2lguT3NRdor0/n3LacrcqRpBnXkFtMTRN6e9ARZhK6oB7INFP97A04+axn4iq7hAAAAAElFTkSuQmCC'
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
