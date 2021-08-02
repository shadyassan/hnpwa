import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link, useLocation } from 'react-router-dom';
import { normalizeString } from '../../../utils';
import {
  useAppDispatch,
  useAppState,
  useFetch,
} from '../../../contexts/AppProvider';
import Loader from '../Loader';
import { columns } from '../../../data';
import stl from './Table.module.scss';
import { initialState } from '../../../contexts/AppProvider';
import useSortableData from '../../../hooks/useSortableData';
import CaretDownIcon from '../../../assets/icons/CaretDownIcon';
import CaretUpIcon from '../../../assets/icons/CaretUpIcon';

const TableHead = ({ requestSort, sortConfig }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : '';
  };

  return (
    <thead>
      <tr>
        {columns.map(({ title, dataIndex }, i) => (
          <th
            key={`${dataIndex}-${i}`}
            className={stl.tableCell + ' ' + stl.tableColumnHasSorters}>
            <div
              className={
                stl.tableColumnSorters + ' ' + getClassNamesFor(dataIndex)
              }
              onClick={() => requestSort(dataIndex)}>
              <span className={stl.tableColumnTitle}>{title}</span>
              <span className={stl.tableColumnSorter}>
                <div className={stl.tableColumnSorterInner}>
                  <span className={stl.caretUp + ' ' + 'table-caret-up'}>
                    <CaretUpIcon />
                  </span>
                  <span className={stl.caretDown + ' ' + 'table-caret-down'}>
                    <CaretDownIcon />
                  </span>
                </div>
              </span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableCell = ({ item, title, dataIndex }) => {
  let maxDateFinal = '';
  if (dataIndex === 'time') {
    const maxDate = new Date(item[dataIndex]);
    maxDateFinal = maxDate.toLocaleTimeString();
  }

  return (
    <td data-title={title} className={stl.tableCell}>
      {dataIndex === 'title' ? (
        <Link to={`/post/${item.id}`}>{item[dataIndex]}</Link>
      ) : dataIndex === 'time' ? (
        maxDateFinal
      ) : (
        normalizeString(item[dataIndex])
      )}
    </td>
  );
};

const TableRow = ({ item }) => {
  return (
    <tr className={stl.tableRow}>
      {columns.map(({ title, dataIndex }, i) => (
        <TableCell
          key={`${dataIndex}-${i}`}
          item={item}
          title={title}
          dataIndex={dataIndex}
        />
      ))}
    </tr>
  );
};

const Table = ({ url }) => {
  const fetchNews = useFetch();
  const { lists } = useAppState();
  const dispatch = useAppDispatch();
  const { items, requestSort, sortConfig } = useSortableData(lists);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(initialState);
  }, [pathname]);

  useEffect(() => {
    if (page <= 10) {
      fetchNews(url, page);
    } else {
      setHasMoreItems(false);
    }
  }, [page, url]);

  return (
    <div className={stl.table}>
      <table>
        <TableHead requestSort={requestSort} sortConfig={sortConfig} />
        <InfiniteScroll
          initialLoad={false}
          element="tbody"
          pageStart={0}
          threshold={0}
          loadMore={() => {
            setPage((prev) => prev + 1);
          }}
          hasMore={hasMoreItems}
          loader={
            <tr key={0}>
              <td colSpan={3}>
                <Loader />
              </td>
            </tr>
          }>
          {lists.length > 0 &&
            lists.map((item) => <TableRow key={item.id} item={item} />)}
        </InfiniteScroll>
      </table>
    </div>
  );
};

export default Table;
