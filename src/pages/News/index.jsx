import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsById } from '../../api/newsApi';
import useDetails from '../../hooks/useDetails';
import Loader from '../../components/shared/Loader';

const News = () => {
  const { id } = useParams();
  const { loading, comments } = useDetails(id);

  console.log('comm: ', comments);

  if (loading) {
    return <Loader />;
  }

  return <Details comments={comments} />;
};

const Details = ({ post, comments: { comments, comments_count } }) => {
  return (
    <>
      {comments_count > 0 && <h3>Comments {comments_count}</h3>}
      {/* {comments && (
        <>
          <h3>Comments</h3>
          <List
            className="comment-list"
            header={`${comments.length} replies`}
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={`${item.name} - ${item.email}`}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt={item.name}
                    />
                  }
                  content={<p>{item.body}</p>}
                />
              </li>
            )}
          />
        </>
      )} */}
    </>
  );
};

export default News;
