import React, { FC, useEffect } from 'react';
import { ICommentHoldreItemProps } from '../models/comments-holder.props';
import './comments-holder-item.scss';

const CommentsHolderItem: FC<ICommentHoldreItemProps> = ({
  name,
  body,
  propMessage,
  commponentName,
}) => {
  useEffect(() => {
    console.log(`${propMessage} ${commponentName}`);
  }, []);

  return (
    <div className="comment-item">
      <p className="comment-title">{`Title: ${name}`}</p>
      <p className="comment-text">{body}</p>
    </div>
  );
};

export default CommentsHolderItem;
