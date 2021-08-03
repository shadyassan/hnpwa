import { useState, useEffect } from 'react';
import { useAppState, useFetch } from '../../contexts/AppProvider';
import InfiniteTable from '../../components/shared/InfiniteTable';

const ListingPage = ({ url }) => {
  const fetchNews = useFetch();
  const { lists } = useAppState();
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    if (page <= 10) {
      fetchNews(url, page);
    } else {
      setHasMoreItems(false);
    }
  }, [url, page]);

  return (
    <InfiniteTable
      setPage={setPage}
      hasMoreItems={hasMoreItems}
      lists={lists}
    />
  );
};

export default ListingPage;
