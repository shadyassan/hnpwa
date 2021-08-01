import { useState, useEffect } from 'react';
import { fetchNewsById } from '../api/newsApi';

const useDetails = (id) => {
  const [comments, setComments] = useState({
    comments: '',
    comments_count: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsById(id).then(({ comments, comments_count }) => {
      setComments({ comments, comments_count });
      setLoading(false);
    });
  }, [id]);

  return { loading, comments };
};

export default useDetails;
