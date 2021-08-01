import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
import { Comment, List, Avatar } from 'antd';
// import { FullSpinner } from '../../../styles/app';
// import useDetails from '../../../hooks/useDetails';

const PostDetails = () => {
  // const { id } = useParams();
  // const { loading, post, comments } = useDetails(id);

  // if (loading) {
  //   return <FullSpinner />;
  // }

  // return <Details post={post} comments={comments} />;
  return null;
};

const Details = ({ post, comments }) => {
  return (
    <>
      {post && (
        <>
          <h1 style={{ textTransform: 'capitalize' }}>{post.title}</h1>
          <p>{post.body}</p>
        </>
      )}
      {comments && (
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
      )}
    </>
  );
};

export default memo(PostDetails);
