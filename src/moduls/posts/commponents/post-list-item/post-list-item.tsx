import React, {
  FC,
  useState,
  MouseEventHandler,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import CommentsHolder from 'src/shared/commponents/comments-holder/comments-holder';
import { IPostListItemProps } from './models/post-list-item.props';
import './post-list-item.scss';

const PostListItem: FC<IPostListItemProps> = ({
  title,
  name,
  id,
  propMessage,
  commponentName,
}) => {
  const [areCommentsShown, setAreCommentsShown] = useState<boolean>(false);

  const handleShowCommentsChange: MouseEventHandler<HTMLDivElement> = (e): void => {
    e.stopPropagation();
    setAreCommentsShown(!areCommentsShown as boolean);
  };

  useEffect(() => {
    console.log(`${propMessage} ${commponentName}`);
  }, []);

  return (
    <div className="post-item">
      <p className="post-title">{`Title: ${title}`}</p>
      <p className="post-user">{`User: ${name}`}</p>
      <div className="post-comments" onClick={handleShowCommentsChange}>
        {areCommentsShown ? 'Hide comments' : 'Show comments'}
      </div>
      {areCommentsShown && (
        <div>
          <CommentsHolder id={id} propMessage={propMessage} commponentName="CommentsHolder" />
        </div>
      )}
      <div className="link-holder">
        <Link to={`post/${id}`}>
          <p
            className="link-btn"
          >
            Full post
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
