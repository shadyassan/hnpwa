import { useParams } from 'react-router-dom';
import useDetails from '../../hooks/useDetails';
import Loader from '../../components/shared/Loader';
import stl from './Post.module.scss';

const Post = () => {
  const { id } = useParams();
  const { loading, comments } = useDetails(id);

  if (loading) {
    return <Loader />;
  }

  return <Details comments={comments} />;
};

const Item = ({ item: { user, content, comments_count } }) => (
  <li className={stl.commentItem}>
    <h6 className={stl.commentContentAuthor}>{user}</h6>
    <div
      className={stl.commentContentDetail}
      contentEditable="true"
      dangerouslySetInnerHTML={{ __html: content }}></div>
    <div className={stl.actions}>Count Comment - {comments_count}</div>
  </li>
);

const Details = ({ comments: { comments, comments_count } }) => {
  return (
    <>
      {comments_count > 0 && <h3>Comments {comments_count}</h3>}
      {comments && (
        <div>
          <ul className={stl.comments}>
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
