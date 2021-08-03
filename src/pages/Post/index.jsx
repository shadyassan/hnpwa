import { useParams } from 'react-router-dom';
import useDetails from '../../hooks/useDetails';
import Loader from '../../components/shared/Loader';

const Post = () => {
  const { id } = useParams();
  const { loading, comments } = useDetails(id);

  if (loading) {
    return <Loader />;
  }

  return <Details comments={comments} />;
};

const Item = ({ item: { user, content, comments_count } }) => (
  <li className={'commentItem'}>
    <h6 className={'commentContentAuthor'}>{user}</h6>
    <div
      className={'commentContentDetail'}
      contentEditable="true"
      dangerouslySetInnerHTML={{ __html: content }}></div>
    <div className={'actions'}>Count Comment - {comments_count}</div>
  </li>
);

const Details = ({ comments: { comments, comments_count } }) => {
  return (
    <>
      {comments_count > 0 && <h3>Comments {comments_count}</h3>}
      {comments && (
        <div>
          <ul className={'comments'}>
            {comments.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Post;
