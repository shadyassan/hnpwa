import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { normalizeString } from '../../../utils';
import { columns } from '../../../data';

import Loader from '../Loader';
import useSortableData from '../../../hooks/useSortableData';
import CaretDownIcon from '../../../assets/icons/CaretDownIcon';
import CaretUpIcon from '../../../assets/icons/CaretUpIcon';

const InfiniteLoader = () => (
  <tr key={0}>
    <td colSpan={3}>
      <Loader />
    </td>
  </tr>
);

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
            className={'tableCell' + ' ' + 'tableColumnHasSorters'}>
            <div
              className={
                'tableColumnSorters' + ' ' + getClassNamesFor(dataIndex)
              }
              onClick={() => requestSort(dataIndex)}>
              <span className={'tableColumnTitle'}>{title}</span>
              <span className={'tableColumnSorter'}>
                <div className={'tableColumnSorterInner'}>
                  <span className={'caretUp' + ' ' + 'table-caret-up'}>
                    <CaretUpIcon />
                  </span>
                  <span className={'caretDown' + ' ' + 'table-caret-down'}>
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
  let timeFinal = '';
  if (dataIndex === 'time') {
    const indexTime = new Date(item[dataIndex]);
    timeFinal = indexTime.toLocaleTimeString();
  }

  return (
    <td data-title={title} className={'tableCell'}>
      {dataIndex === 'title' ? (
        <Link to={`/post/${item.id}`}>{item[dataIndex]}</Link>
      ) : dataIndex === 'time' ? (
        timeFinal
      ) : (
        normalizeString(item[dataIndex])
      )}
    </td>
  );
};

const TableRow = ({ item }) => {
  return (
    <tr className={'tableRow'}>
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

const InfiniteTable = ({ setPage, hasMoreItems, lists }) => {
  const { items, requestSort, sortConfig } = useSortableData(lists);

  return (
    <div className={'table'}>
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
          loader={<InfiniteLoader />}>
          {items.length > 0 &&
            items.map((item) => <TableRow key={item.id} item={item} />)}
        </InfiniteScroll>
      </table>
    </div>
  );
};

export default InfiniteTable;
