import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { normalizeString } from '../../../../utils';
import {
  useAppState,
  useAppDispatch,
  useFetchNews,
} from '../../../../contexts/AppProvider';
import Loader from '../../../../components/shared/Loader';
import { columns } from '../../../../data';
import stl from './Table.module.scss';

const Thead = ({ columnSorter }) => {
  return (
    <thead>
      <tr>
        {columns.map(({ title, dataIndex }, i) => (
          <th
            key={i}
            className={stl.tableCell + ' ' + stl.tableColumnHasSorters}>
            <div
              className={stl.tableColumnSorters}
              onClick={() => columnSorter(dataIndex)}>
              <span className={stl.tableColumnTitle}>{title}</span>
              <span className={stl.tableColumnSorterFull}></span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const Row = ({ item }) => {
  return (
    <tr className={stl.tableRow}>
      {columns.map(({ dataIndex }, i) => {
        return (
          <td key={`${dataIndex}-${i}`} className={stl.tableCell}>
            {dataIndex === 'title' ? (
              <Link to={`/news/${item.id}`}>{item[dataIndex]}</Link>
            ) : (
              normalizeString(item[dataIndex])
            )}
          </td>
        );
      })}
    </tr>
  );
};

const Table = () => {
  const fetchNews = useFetchNews();
  const { lists } = useAppState();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (page <= 10) {
      fetchNews(page);
    } else {
      setHasMoreItems(false);
    }
  }, [page]);

  const loadMoreHandler = () => {
    setPage((prev) => prev + 1);
  };

  const columnSorterHandler = (name) => {
    switch (name) {
      case 'title':
        dispatch((prev) => {
          return {
            ...prev,
            lists: prev.lists.sort((a, b) => a.title.length - b.title.length),
          };
        });
        break;
      case 'domain':
        break;

      case 'time':
        break;
    }
  };

  return (
    <div className={stl.table}>
      <table>
        <Thead columnSorter={columnSorterHandler} />
        <InfiniteScroll
          initialLoad={false}
          element="tbody"
          pageStart={0}
          threshold={0}
          loadMore={loadMoreHandler}
          loader={
            <tr>
              <td colSpan={3}>
                <Loader />
              </td>
            </tr>
          }
          hasMore={hasMoreItems}>
          {lists.length > 0 &&
            lists.map((item) => <Row key={item.id} item={item} />)}
        </InfiniteScroll>
      </table>
    </div>
  );
};

export default Table;
